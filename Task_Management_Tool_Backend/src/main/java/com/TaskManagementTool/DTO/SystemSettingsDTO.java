package com.TaskManagementTool.DTO;

import lombok.Data;

@Data
public class SystemSettingsDTO {

    private String appName;
    private boolean maintenanceMode;
    private String defaultTaskPriority;
    private int maxFileUploadSize;
    private boolean allowUserRegistration;
    private boolean enableEmailNotifications;
    private int autoArchiveDays;
    private String uploadedFileName;

    // Getters & Setters
}