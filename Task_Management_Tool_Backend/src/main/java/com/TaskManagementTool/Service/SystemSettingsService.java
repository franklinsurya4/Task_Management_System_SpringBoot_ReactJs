package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.SystemSettingsDTO;
import org.springframework.web.multipart.MultipartFile;

public interface SystemSettingsService {

    SystemSettingsDTO getSettings();

    SystemSettingsDTO updateSettings(SystemSettingsDTO dto);

    String uploadFile(MultipartFile file);
}
