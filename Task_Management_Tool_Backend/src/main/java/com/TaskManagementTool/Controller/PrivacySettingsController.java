package com.TaskManagementTool.Controller;

import com.TaskManagementTool.DTO.PrivacySettingsDTO;
import com.TaskManagementTool.Service.PrivacySettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/privacy")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // React frontend URL
public class PrivacySettingsController {

    private final PrivacySettingsService service;

    // GET settings for a user
    @GetMapping("/{userId}")
    public PrivacySettingsDTO getSettings(@PathVariable Long userId) {
        return service.getSettings(userId);
    }

    // POST/PUT to save settings
    @PostMapping("/{userId}")
    public PrivacySettingsDTO saveSettings(@PathVariable Long userId,
                                           @RequestBody PrivacySettingsDTO dto) {
        return service.saveSettings(userId, dto);
    }
}
