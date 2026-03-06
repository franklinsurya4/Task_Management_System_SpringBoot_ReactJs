package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.OAuthTokenResponse;
import com.TaskManagementTool.Entity.Integration;
import com.TaskManagementTool.Repository.IntegrationRepository;
import com.TaskManagementTool.util.EncryptionUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final IntegrationRepository repository;
    private final EncryptionUtil encryptionUtil;
    private final RestTemplate restTemplate;

    @Value("${google.client.id}") private String googleClientId;
    @Value("${google.client.secret}") private String googleClientSecret;
    @Value("${google.redirect.uri}") private String googleRedirectUri;

    @Value("${github.client.id}") private String githubClientId;
    @Value("${github.client.secret}") private String githubClientSecret;
    @Value("${github.redirect.uri}") private String githubRedirectUri;

    @Value("${slack.client.id}") private String slackClientId;
    @Value("${slack.client.secret}") private String slackClientSecret;
    @Value("${slack.redirect.uri}") private String slackRedirectUri;

    // ======================
    // BUILD AUTH URL
    // ======================
    public String buildAuthUrl(String provider, Long userId) {
        String state = UUID.randomUUID() + ":" + userId;

        switch (provider.toLowerCase()) {
            case "google":
                return UriComponentsBuilder
                        .fromUriString("https://accounts.google.com/o/oauth2/v2/auth")
                        .queryParam("client_id", googleClientId.trim())
                        .queryParam("redirect_uri", googleRedirectUri.trim())
                        .queryParam("response_type", "code")
                        .queryParam("scope", "openid email profile")
                        .queryParam("access_type", "offline")
                        .queryParam("prompt", "consent")
                        .queryParam("state", state)
                        .build()
                        .encode()
                        .toUriString();

            case "github":
                return UriComponentsBuilder
                        .fromUriString("https://github.com/login/oauth/authorize")
                        .queryParam("client_id", githubClientId.trim())
                        .queryParam("redirect_uri", githubRedirectUri.trim())
                        .queryParam("scope", "repo,user")
                        .queryParam("state", state)
                        .build()
                        .encode()
                        .toUriString();

            case "slack":
                return UriComponentsBuilder
                        .fromUriString("https://slack.com/oauth/v2/authorize")
                        .queryParam("client_id", slackClientId.trim())
                        .queryParam("scope", "chat:write,channels:read")
                        .queryParam("redirect_uri", slackRedirectUri.trim())
                        .queryParam("state", state)
                        .build()
                        .encode()
                        .toUriString();

            default:
                throw new IllegalArgumentException("Unsupported provider: " + provider);
        }
    }

    // ======================
    // EXCHANGE CODE FOR TOKEN
    // ======================
    public OAuthTokenResponse exchangeCodeForToken(String provider, String code) {
        switch (provider.toLowerCase()) {
            case "google":
                return requestToken("https://oauth2.googleapis.com/token",
                        googleClientId, googleClientSecret, googleRedirectUri, code);

            case "github":
                return requestToken("https://github.com/login/oauth/access_token",
                        githubClientId, githubClientSecret, githubRedirectUri, code);

            case "slack":
                return requestToken("https://slack.com/api/oauth.v2.access",
                        slackClientId, slackClientSecret, slackRedirectUri, code);

            default:
                throw new IllegalArgumentException("Unsupported provider: " + provider);
        }
    }

    // ======================
    // TOKEN REQUEST CORE LOGIC
    // ======================
    private OAuthTokenResponse requestToken(String url,
                                            String clientId,
                                            String clientSecret,
                                            String redirectUri,
                                            String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Accept", "application/json");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", clientId.trim());
        body.add("client_secret", clientSecret.trim());
        body.add("code", code.trim());
        body.add("redirect_uri", redirectUri.trim());

        // Google requires grant_type
        if (url.contains("googleapis")) {
            body.add("grant_type", "authorization_code");
        }

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> rawResponse = restTemplate.postForEntity(url, request, String.class);
            String responseBody = rawResponse.getBody();

            if (responseBody == null || responseBody.isBlank()) {
                throw new RuntimeException("Empty token response from provider.");
            }

            ObjectMapper mapper = new ObjectMapper();
            JsonNode json = mapper.readTree(responseBody);

            if (json.has("error")) {
                throw new RuntimeException("OAuth error: " + json.toString());
            }

            // Slack-specific error check
            if (url.contains("slack") && json.has("ok") && !json.get("ok").asBoolean()) {
                throw new RuntimeException("Slack OAuth error: " + json.toString());
            }

            if (!json.has("access_token")) {
                throw new RuntimeException("Provider did not return access_token. Full response: " + json.toString());
            }

            OAuthTokenResponse tokenResponse = new OAuthTokenResponse();
            tokenResponse.setAccessToken(json.get("access_token").asText());
            if (json.has("refresh_token")) tokenResponse.setRefreshToken(json.get("refresh_token").asText());
            if (json.has("expires_in")) tokenResponse.setExpiresIn(json.get("expires_in").asLong());

            return tokenResponse;

        } catch (Exception ex) {
            throw new RuntimeException("OAuth token exchange failed: " + ex.getMessage(), ex);
        }
    }

    // ======================
    // SAVE INTEGRATION
    // ======================
    public void saveIntegration(Long userId,
                                String provider,
                                String accessToken,
                                String refreshToken) throws Exception {
        if (accessToken == null || accessToken.isBlank()) {
            throw new IllegalArgumentException("Access token cannot be null or blank");
        }

        Optional<Integration> existing = repository.findByUserIdAndProviderIgnoreCase(userId, provider);
        Integration integration = existing.orElse(new Integration());

        integration.setUserId(userId);
        integration.setProvider(provider.toLowerCase());
        integration.setAccessToken(encryptionUtil.encrypt(accessToken));

        if (refreshToken != null && !refreshToken.isBlank()) {
            integration.setRefreshToken(encryptionUtil.encrypt(refreshToken));
        }

        integration.setConnected(true);
        integration.setUpdatedAt(LocalDateTime.now());

        repository.save(integration);
    }
}