package com.TaskManagementTool.DTO;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class DashboardDTO {

    private Long totalTasks;
    private Long completedTasks;
    private Long overdueTasks;
    private Long atRiskTasks;

    private Map<String, Long> priorityDistribution;
    private List<AgingTaskDTO> agingTasks;

}
