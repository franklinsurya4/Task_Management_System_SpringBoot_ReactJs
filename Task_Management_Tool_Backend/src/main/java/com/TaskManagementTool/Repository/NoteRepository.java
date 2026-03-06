package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note,Integer> {
}
