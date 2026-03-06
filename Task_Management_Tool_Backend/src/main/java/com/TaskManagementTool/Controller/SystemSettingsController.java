package com.TaskManagementTool.Controller;

import com.TaskManagementTool.DTO.SystemSettingsDTO;
import com.TaskManagementTool.Service.SystemSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/system-settings")
@CrossOrigin(origins = "http://localhost:3000")
public class SystemSettingsController {

    @Autowired
    private SystemSettingsService service;

    @GetMapping
    public SystemSettingsDTO getSettings() {
        return service.getSettings();
    }

    @PutMapping
    public SystemSettingsDTO updateSettings(@RequestBody SystemSettingsDTO dto) {
        return service.updateSettings(dto);
    }

    @PostMapping("/upload")
    public Map<String, String> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = service.uploadFile(file);
        return Map.of("fileName", fileName);
    }
}
