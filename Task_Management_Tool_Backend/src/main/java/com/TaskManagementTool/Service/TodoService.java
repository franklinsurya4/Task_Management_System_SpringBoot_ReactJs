package com.TaskManagementTool.Service;

import java.util.List;

import com.TaskManagementTool.Entity.Todo;
import com.TaskManagementTool.Repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TodoService {

    @Autowired
    private TodoRepository repo;

    public List<Todo> getAllTodos() {
        return repo.findAll();
    }

    public Todo saveTodo(Todo todo) {
        return repo.save(todo);
    }

    public void deleteTodo(Long id) {
        repo.deleteById(id);
    }

    public Todo updateTodo(Long id) {
        Todo todo = repo.findById(id).orElseThrow();
        todo.setCompleted(!todo.isCompleted());
        return repo.save(todo);
    }
}