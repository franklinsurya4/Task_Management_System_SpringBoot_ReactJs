package com.TaskManagementTool.Controller;

import com.TaskManagementTool.Entity.GoogleFormTask;
import com.TaskManagementTool.Entity.Task;
import com.TaskManagementTool.Repository.TaskRepository;
import com.TaskManagementTool.Service.EmailService;
import com.TaskManagementTool.Service.PdfServices;
import com.TaskManagementTool.Service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private final TaskService service;

    @Autowired
    private final TaskRepository taskRepository;

    @Autowired
    private final EmailService emailService;

    @Autowired
    private PdfServices pdfService;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return service.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return service.getAllTasks();
    }

    @GetMapping("/pending")
    public List<Task> getPendingTasks() {
        return taskRepository.findByStatus("PENDING");
    }

    @PostMapping("/send-email/{taskId}")
    public String sendReminder(@PathVariable Long taskId) {

        Task task = taskRepository.findById(taskId).orElseThrow();

        emailService.sendEmail(
                task.getAssignedUser().getEmail(),
                "Task Reminder",
                "Your task '" + task.getTitle() + "' is still pending."
        );

        return "Email Sent";
    }

    @GetMapping("/user/{userId}")
    public List<Task> getUserTasks(@PathVariable Long userId) {
        return service.getUserTasks(userId);
    }

    @GetMapping("/search")
    public List<Task> search(@RequestParam String keyword) {
        return service.searchTasks(keyword);
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<Task>> getTasksByDate(
            @RequestParam("date") String date) {

        LocalDate selectedDate = LocalDate.parse(date);
        List<Task> tasks = taskRepository.findByDueDate(selectedDate);

        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/{id}/check")
    public Task checkTaskScore(@PathVariable Long id) {
        return service.checkTaskScore(id);
    }

    @PatchMapping("/{id}/status")
    public Task updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return service.updateTaskStatus(id, status);
    }

    @GetMapping("/download/pdf")
    public ResponseEntity<byte[]> downloadPdf() {

        List<Task> tasks = taskRepository.findAll();

        ByteArrayInputStream pdfStream = pdfService.generateTaskPdf(tasks);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=Task_Report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfStream.readAllBytes());
    }

}
