package com.TaskManagementTool.Service;

import java.util.List;

import com.TaskManagementTool.Entity.Note;
import com.TaskManagementTool.Repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

    @Autowired
    private NoteRepository repo;

    public List<Note> getAllNotes(){
        return repo.findAll();
    }

    public Note saveNote(Note note){
        return repo.save(note);
    }

    public void deleteNote(int id){
        repo.deleteById(id);
    }
}