package com.TaskManagementTool.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot be empty")
    @Size(max = 255, message = "Title too long")
    private String title;

    @Size(max = 1000, message = "Description too long")
    private String description;

    @NotBlank(message = "Status is required")
    @Column(length = 20)
    private String status; // e.g., "Pending", "InProgress", "Completed"

    @Column(length = 500)
    private String googleFormUrl;

    @Min(value = 0, message = "Score cannot be negative")
    @Max(value = 100, message = "Score cannot exceed 100")
    private Integer score;

    private LocalDate dueDate;

    private LocalDate completedDate; // new field to track actual completion

    @Column(length = 500)
    private String imageUrl;

    // --- Priority enum stored as String ---
    @Enumerated(EnumType.STRING)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id", referencedColumnName = "user_id")
    private User assignedUser;

    // --- Enum for Priority ---
    public enum Priority {
        LOW, MEDIUM, HIGH
    }
}