package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.AgingTaskDTO;
import com.TaskManagementTool.DTO.DashboardDTO;
import com.TaskManagementTool.Entity.Task;
import com.TaskManagementTool.Repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TaskRepository repo;

    public DashboardDTO getDashboardAnalytics() {

        List<Task> tasks = repo.findAll();
        LocalDate today = LocalDate.now();

        DashboardDTO dto = new DashboardDTO();

        // ================= TOTAL =================
        dto.setTotalTasks((long) tasks.size());

        // ================= COMPLETED =================
        dto.setCompletedTasks(
                tasks.stream()
                        .filter(t -> "DONE".equalsIgnoreCase(t.getStatus()))
                        .count()
        );

        // ================= OVERDUE =================
        dto.setOverdueTasks(
                tasks.stream()
                        .filter(t -> t.getDueDate() != null)
                        .filter(t -> t.getDueDate().isBefore(today))
                        .filter(t -> !"DONE".equalsIgnoreCase(t.getStatus()))
                        .count()
        );

        // ================= AT RISK =================
        dto.setAtRiskTasks(
                tasks.stream()
                        .filter(t -> t.getDueDate() != null)
                        .filter(t -> !"DONE".equalsIgnoreCase(t.getStatus()))
                        .filter(t -> {
                            long daysUntilDue = ChronoUnit.DAYS.between(today, t.getDueDate());
                            return daysUntilDue >= 0 && daysUntilDue <= 2;
                        })
                        .count()
        );

        // ================= PRIORITY DISTRIBUTION =================
        Map<String, Long> priorityMap = new HashMap<>();

        tasks.forEach(t -> {
            String priority;

            if (t.getPriority() != null) {
                priority = t.getPriority().name();
            } else if (t.getScore() == null) {
                priority = "MEDIUM";
            } else {
                priority = t.getScore() > 80 ? "HIGH" : "LOW";
            }

            priorityMap.merge(priority, 1L, Long::sum);
        });

        dto.setPriorityDistribution(priorityMap);

        // ================= AGING TASKS =================
        List<AgingTaskDTO> agingList = new ArrayList<>();

        tasks.stream()
                .filter(t -> t.getDueDate() != null)
                .filter(t -> !"DONE".equalsIgnoreCase(t.getStatus()))
                .forEach(t -> {
                    long daysOverdue = ChronoUnit.DAYS.between(t.getDueDate(), today);
                    agingList.add(
                            new AgingTaskDTO(
                                    t.getTitle(),
                                    daysOverdue > 0 ? daysOverdue : 0
                            )
                    );
                });

        dto.setAgingTasks(agingList);

        return dto;
    }
}