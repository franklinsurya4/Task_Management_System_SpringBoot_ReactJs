package com.TaskManagementTool.Controller;

import java.util.List;

import com.TaskManagementTool.Entity.Note;
import com.TaskManagementTool.Service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/api/notes")
public class NotesController {

    @Autowired
    private NoteService service;

    @GetMapping
    public List<Note> getNotes(){
        return service.getAllNotes();
    }

    @PostMapping
    public Note addNote(@RequestBody Note note){
        return service.saveNote(note);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable int id){
        service.deleteNote(id);
    }
}