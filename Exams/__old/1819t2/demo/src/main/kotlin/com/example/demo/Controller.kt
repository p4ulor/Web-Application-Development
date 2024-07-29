package com.example.demo

import com.example.demo.pipeline.DataMap
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
class Controller(val map: DataMap) {

    @GetMapping("/status/{code}")
    fun handler(
        @PathVariable code: Int
    ): ResponseEntity<Any> {
        return ResponseEntity
            .status(200)
            .body(map.getCount(code))
    }
}