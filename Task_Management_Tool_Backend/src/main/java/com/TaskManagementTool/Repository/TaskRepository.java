package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedUserId(Long userId);

    List<Task> findByTitleContainingIgnoreCase(String title);

    List<Task> findByDueDate(LocalDate dueDate);

    List<Task> findByStatus(String status);

     // exact match
    List<Task> findByDueDateBefore(LocalDate date);           // overdue tasks
    List<Task> findByDueDateAfter(LocalDate date);            // tasks due after a date
    List<Task> findByDueDateBetween(LocalDate start, LocalDate end); // range query, e.g., at-risk tasks

    // --- Combined queries ---
    List<Task> findByAssignedUserIdAndDueDateBefore(Long userId, LocalDate date);       // user overdue
    List<Task> findByAssignedUserIdAndDueDateBetween(Long userId, LocalDate start, LocalDate end); // user at-risk



}

