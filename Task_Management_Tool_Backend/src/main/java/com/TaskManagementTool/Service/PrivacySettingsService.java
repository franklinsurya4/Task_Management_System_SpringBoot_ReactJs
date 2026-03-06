package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.PrivacySettingsDTO;
import com.TaskManagementTool.Entity.PrivacySettings;
import com.TaskManagementTool.Repository.PrivacySettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrivacySettingsService {

    private final PrivacySettingsRepository repository;

    // Get settings by userId
    public PrivacySettingsDTO getSettings(Long userId) {
        return repository.findByUserId(userId)
                .map(this::toDTO)
                .orElse(new PrivacySettingsDTO("private", false, true, true, false, true, true));
    }

    // Save or update settings
    public PrivacySettingsDTO saveSettings(Long userId, PrivacySettingsDTO dto) {
        PrivacySettings settings = repository.findByUserId(userId)
                .orElse(PrivacySettings.builder().userId(userId).build());

        settings.setTaskVisibility(dto.getTaskVisibility());
        settings.setActivityHidden(dto.isActivityHidden());
        settings.setNotifyTaskChanges(dto.isNotifyTaskChanges());
        settings.setNotifyComments(dto.isNotifyComments());
        settings.setAllowGuests(dto.isAllowGuests());
        settings.setAllowMembers(dto.isAllowMembers());
        settings.setAllowAdmins(dto.isAllowAdmins());

        repository.save(settings);
        return toDTO(settings);
    }

    private PrivacySettingsDTO toDTO(PrivacySettings settings) {
        return new PrivacySettingsDTO(
                settings.getTaskVisibility(),
                settings.isActivityHidden(),
                settings.isNotifyTaskChanges(),
                settings.isNotifyComments(),
                settings.isAllowGuests(),
                settings.isAllowMembers(),
                settings.isAllowAdmins()
        );
    }
}
