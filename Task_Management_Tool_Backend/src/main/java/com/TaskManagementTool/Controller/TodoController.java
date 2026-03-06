package com.TaskManagementTool.Controller;

import java.util.List;

import com.TaskManagementTool.Entity.Todo;
import com.TaskManagementTool.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping
    public List<Todo> getTodos(){
        return service.getAllTodos();
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo){
        return service.saveTodo(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id){
        service.deleteTodo(id);
    }

    @PutMapping("/{id}")
    public Todo toggleTodo(@PathVariable Long id){
        return service.updateTodo(id);
    }
}