package org.example._2022_23_inv_t1

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.locks.ReentrantLock
import kotlin.concurrent.withLock

@RestController
@RequestMapping("")
class Controller (private val service: Services) {

    @GetMapping("/handlers")
    fun handlers() : Handlers {
        val data = service.getAllHandlers()
        return Handlers(data)
    }

    @GetMapping("/handlers/{handler-id}")
    fun handler(@PathVariable(name = "handler-id") handlerID: String) : HandlerCount {
        val data = service.getHandlerWithID(handlerID)
        return HandlerCount(data)
    }

    @GetMapping("")
    fun emptyHandler(){}

    @GetMapping("bruh")
    fun bruhHandler(){}
}

data class HandlerCount(
    val callCount: Int
)

data class Handlers(
    val linksToAllHandlers: Array<String>
)

@Service
class Services {
    private val handlers = mutableMapOf<String, Int>()
    private val lock = ReentrantLock()

    fun getAllHandlers() : Array<String> {
        lock.withLock {
            val list = handlers.map {
                "/handlers/${it.key}"
            }
            return list.toTypedArray()
        }
    }

    fun getHandlerWithID(id: String) : Int {
        lock.withLock {
            return handlers.get(id) ?: return -1
        }
    }

    fun setHandler(id: String){
        lock.withLock {
            val count = handlers.get(id)
            if(count==null) handlers.put(id, 1)
            else handlers.put(id, count+1)
        }
    }
}