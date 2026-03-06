package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.SystemSettingsDTO;
import com.TaskManagementTool.Entity.SystemSettings;
import com.TaskManagementTool.Repository.SystemSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
public class SystemSettingsServiceImpl implements SystemSettingsService {

    @Autowired
    private SystemSettingsRepository repository;

    private final String UPLOAD_DIR = "uploads/";

    @Override
    public SystemSettingsDTO getSettings() {
        Optional<SystemSettings> optional = repository.findAll().stream().findFirst();

        SystemSettings settings = optional.orElseGet(() -> {
            SystemSettings newSettings = new SystemSettings();
            return repository.save(newSettings);
        });

        return mapToDTO(settings);
    }

    @Override
    public SystemSettingsDTO updateSettings(SystemSettingsDTO dto) {
        SystemSettings settings = repository.findAll().stream().findFirst()
                .orElse(new SystemSettings());

        settings.setAppName(dto.getAppName());
        settings.setMaintenanceMode(dto.isMaintenanceMode());
        settings.setDefaultTaskPriority(dto.getDefaultTaskPriority());
        settings.setMaxFileUploadSize(dto.getMaxFileUploadSize());
        settings.setAllowUserRegistration(dto.isAllowUserRegistration());
        settings.setEnableEmailNotifications(dto.isEnableEmailNotifications());
        settings.setAutoArchiveDays(dto.getAutoArchiveDays());
        settings.setUploadedFileName(dto.getUploadedFileName());

        repository.save(settings);

        return mapToDTO(settings);
    }

    @Override
    public String uploadFile(MultipartFile file) {

        try {

            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File directory = new File(uploadDir);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            String filePath = uploadDir + file.getOriginalFilename();
            File destination = new File(filePath);

            file.transferTo(destination);

            return file.getOriginalFilename();

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("File upload failed: " + e.getMessage());
        }
    }

    private SystemSettingsDTO mapToDTO(SystemSettings settings) {
        SystemSettingsDTO dto = new SystemSettingsDTO();
        dto.setAppName(settings.getAppName());
        dto.setMaintenanceMode(settings.isMaintenanceMode());
        dto.setDefaultTaskPriority(settings.getDefaultTaskPriority());
        dto.setMaxFileUploadSize(settings.getMaxFileUploadSize());
        dto.setAllowUserRegistration(settings.isAllowUserRegistration());
        dto.setEnableEmailNotifications(settings.isEnableEmailNotifications());
        dto.setAutoArchiveDays(settings.getAutoArchiveDays());
        dto.setUploadedFileName(settings.getUploadedFileName());
        return dto;
    }
}
