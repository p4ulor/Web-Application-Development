package com.example.demo

import org.springframework.stereotype.Component
import java.util.concurrent.locks.ReentrantLock
import kotlin.concurrent.withLock

@Component
class Data {
    private val map: HashMap<String, Int> = HashMap()
    private val lock: ReentrantLock = ReentrantLock()

    fun increment(key: String) {
        lock.withLock {
            val value = map[key]
            map[key] = if (value == null) 1 else value + 1
        }
    }

    fun get(key: String) = map[key]

    fun getMap() = map
}