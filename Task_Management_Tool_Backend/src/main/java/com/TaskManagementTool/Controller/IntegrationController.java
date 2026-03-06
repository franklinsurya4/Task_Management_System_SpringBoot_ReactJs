package com.TaskManagementTool.Controller;

import com.TaskManagementTool.DTO.OAuthTokenResponse;
import com.TaskManagementTool.Entity.Integration;
import com.TaskManagementTool.Service.IntegrationService;
import com.TaskManagementTool.Service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/integrations")
@RequiredArgsConstructor
public class IntegrationController {

    private final IntegrationService service;
    private final OAuthService oAuthService;

    @GetMapping
    public List<Integration> getIntegrations(@RequestParam Long userId) {
        return service.getUserIntegrations(userId);
    }

    @PostMapping("/connect/{provider}")
    public Map<String, String> connect(
            @PathVariable String provider,
            @RequestParam Long userId) {

        String url = service.connect(userId, provider);
        return Map.of("redirectUrl", url);
    }

    @GetMapping("/oauth/{provider}/callback")
    public ResponseEntity<String> oauthCallback(
            @PathVariable String provider,
            @RequestParam String code,
            @RequestParam String state) throws Exception {

        Long userId = Long.parseLong(state.split(":")[1]);

        OAuthTokenResponse tokenResponse =
                oAuthService.exchangeCodeForToken(provider, code);

        oAuthService.saveIntegration(
                userId,
                provider,
                tokenResponse.getAccessToken(),
                tokenResponse.getRefreshToken()
        );

        return ResponseEntity.ok(provider + " connected successfully");
    }

    @DeleteMapping("/disconnect/{provider}")
    public ResponseEntity<String> disconnect(
            @PathVariable String provider,
            @RequestParam Long userId) {

        service.disconnect(userId, provider);
        return ResponseEntity.ok(provider + " disconnected successfully");
    }
}