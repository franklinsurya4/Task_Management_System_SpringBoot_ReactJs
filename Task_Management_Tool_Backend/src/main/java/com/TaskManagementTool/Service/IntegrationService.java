package com.TaskManagementTool.Service;

import com.TaskManagementTool.Entity.Integration;
import com.TaskManagementTool.Repository.IntegrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@Service
@RequiredArgsConstructor
public class IntegrationService {

    private final IntegrationRepository repository;
    private final OAuthService oAuthService;

    public List<Integration> getUserIntegrations(Long userId) {
        return repository.findByUserId(userId);
    }

    public String connect(Long userId, String provider) {
        return oAuthService.buildAuthUrl(provider, userId);
    }

    public void disconnect(Long userId, String provider) {

        Integration integration = repository
                .findByUserIdAndProviderIgnoreCase(userId, provider)
                .orElseThrow(() -> new RuntimeException("Integration not found"));

        integration.setConnected(false);
        repository.save(integration);
    }
}
