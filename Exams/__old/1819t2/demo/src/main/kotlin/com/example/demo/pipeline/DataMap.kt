package com.example.demo.pipeline

import org.springframework.stereotype.Component
import java.util.concurrent.locks.ReentrantLock
import kotlin.concurrent.withLock

@Component
class DataMap {
    private val map: HashMap<Int, Int> = HashMap()
    private val lock: ReentrantLock = ReentrantLock()

    fun increment(status: Int) {
        lock.withLock {
            val value = map[status]
            map[status] = if (value == null) 1 else value + 1
        }
    }

    fun getCount(status: Int) = map[status] ?: 0
}