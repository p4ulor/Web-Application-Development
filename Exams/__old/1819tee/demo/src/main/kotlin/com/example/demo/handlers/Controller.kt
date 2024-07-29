package com.example.demo.handlers

import com.example.demo.Data
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Controller(val data: Data) {

    @GetMapping("/stats")
    fun handler(): ResponseEntity<Any> {
        return ResponseEntity
            .status(200)
            .body(data.getMap())
    }
}