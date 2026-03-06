package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.SystemSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemSettingsRepository
        extends JpaRepository<SystemSettings, Long> {
}
