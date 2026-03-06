package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
