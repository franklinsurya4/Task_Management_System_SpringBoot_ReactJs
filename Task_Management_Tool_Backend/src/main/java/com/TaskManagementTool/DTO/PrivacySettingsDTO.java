package com.TaskManagementTool.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrivacySettingsDTO {
    private String taskVisibility; // private, team, public
    private boolean activityHidden;
    private boolean notifyTaskChanges;
    private boolean notifyComments;
    private boolean allowGuests;
    private boolean allowMembers;
    private boolean allowAdmins;
}
