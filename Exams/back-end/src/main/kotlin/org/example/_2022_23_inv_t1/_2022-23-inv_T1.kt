package org.example._2022_23_inv_t1

import org.example.HandlersService
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Configuration
import org.springframework.web.method.HandlerMethod
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.util.UriTemplate
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
open class Application2

fun main(args: Array<String>) {
    runApplication<Application2>(*args)
}

@Configuration //open because -> https://stackoverflow.com/a/56410163/9375488
open class WebMvcConfig (private val service: Services) : WebMvcConfigurer {
    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(MyCustomInterceptor(service))
    }
}

class MyCustomInterceptor (val service: Services) : HandlerInterceptor {
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        println("prehandle")
        if (handler is HandlerMethod){ //https://stackoverflow.com/a/68326759/9375488
            var id = handler.shortLogMessage.replace("#", "-") //pq tudo depois do # nunca é passado ao servidor pelo menos só quando se usa o browser... //https://stackoverflow.com/q/3664257/9375488
            id = id.substring(0, id.indexOf("[")) //the [] of the log message causes 400... https://stackoverflow.com/q/65883124/9375488
            service.setHandler(id)
            println(id)
        }
        return true
    }
}
