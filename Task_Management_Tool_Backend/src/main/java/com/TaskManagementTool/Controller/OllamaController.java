package com.TaskManagementTool.Controller;

import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;

import java.util.Map;

@RestController
@RequestMapping("/api/ollama")
@CrossOrigin(origins = "http://localhost:3000")
public class OllamaController {

    private final ChatClient chatClient;

    public OllamaController(OllamaChatModel chatModel) {
        this.chatClient = ChatClient.create(chatModel);
    }

    @PostMapping
    public ResponseEntity<String> getAnswer(@RequestBody Map<String, String> request) {

        String message = request.get("prompt");

        ChatResponse chatResponse = chatClient
                .prompt(message)
                .call()
                .chatResponse();

        String response = chatResponse.getResult().getOutput().getText();

        return ResponseEntity.ok(response);
    }
}