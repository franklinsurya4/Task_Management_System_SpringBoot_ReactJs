package com.TaskManagementTool.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "privacy_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrivacySettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // associate settings with a specific user

    private String taskVisibility;
    private boolean activityHidden;
    private boolean notifyTaskChanges;
    private boolean notifyComments;
    private boolean allowGuests;
    private boolean allowMembers;
    private boolean allowAdmins;
}