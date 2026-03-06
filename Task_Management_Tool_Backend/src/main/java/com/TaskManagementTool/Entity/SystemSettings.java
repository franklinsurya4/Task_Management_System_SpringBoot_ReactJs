package com.TaskManagementTool.Entity;

import lombok.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "system_settings")
@Data
public class SystemSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
