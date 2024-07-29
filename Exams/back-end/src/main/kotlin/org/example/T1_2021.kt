package org.example

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.locks.ReentrantLock
import kotlin.concurrent.withLock
import kotlin.math.roundToInt

fun calculateCurrentAverage(list: MutableList<Int> ) : Int {
    if(list.size==0) return 0
    var sum = 0
    list.forEach {
        sum += it
    }
    return sum/list.size
}

@RestController
@RequestMapping("")
class T1_2021(private val service: HandlersService) {
    @GetMapping("handlers")
    fun handler() : Response {
        println("called /handlers")
        val callsToThisHandler = service.getRequests()
        val nanoAverage = calculateCurrentAverage(callsToThisHandler)
        val nanoDurationOfThis = if(callsToThisHandler.isEmpty()) 0 else callsToThisHandler.last()
        return Response(
            callsToThisHandler.size, nanoAverage, nanoDurationOfThis,
            (nanoAverage * Math.pow(10.0, -8.0).toFloat()), (nanoDurationOfThis * Math.pow(10.0, -8.0).toFloat()),
        )
    }

    data class Response (
        val useCount: Int,
        val averageTimeNano: Int,
        val currentTimeNanoTaken: Int,
        val averageTimeS: Float,
        val currentTimeSTaken: Float
    )
}

@Service
class HandlersService{
    private val requestsDurationNano = mutableListOf<Int>()
    private val lock = ReentrantLock()
    fun addHandlersCall(p: Int){
        lock.withLock {
            requestsDurationNano.add(p)
        }
    }

    fun getRequests() : MutableList<Int> {
        return requestsDurationNano
    }
}
