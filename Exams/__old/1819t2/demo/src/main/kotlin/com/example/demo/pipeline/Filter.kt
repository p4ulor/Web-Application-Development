package com.example.demo.pipeline

import org.springframework.stereotype.Component
import javax.servlet.Filter
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class AppFilter(val map: DataMap): Filter {
    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        //chain?.doFilter(request, response)
        //request as HttpServletRequest
        val httpResponse = response as HttpServletResponse
        //map.increment(response.status)
        httpResponse.status = 503
    }
}