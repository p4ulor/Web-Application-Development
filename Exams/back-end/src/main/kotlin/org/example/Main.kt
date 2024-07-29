package org.example

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component
import org.springframework.web.method.HandlerMethod
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.io.ByteArrayOutputStream
import java.io.PrintWriter
import java.time.LocalDateTime
import javax.servlet.FilterChain
import javax.servlet.ServletOutputStream
import javax.servlet.WriteListener
import javax.servlet.http.HttpFilter
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpServletResponseWrapper

@SpringBootApplication (exclude = [SecurityAutoConfiguration::class])
open class BattleshipServerApplication{

    /*@Bean //interceptor versao 1
    fun mrBean(): WebMvcConfigurer? {
        return object : WebMvcConfigurer {
            override fun addInterceptors(registry: InterceptorRegistry) { //https://www.baeldung.com/spring-mvc-handlerinterceptor
                registry.addInterceptor(object: HandlerInterceptor {
                    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {

                        return true
                    }
                })
            }
        }
    }*/
}

fun main(args: Array<String>) {
    runApplication<BattleshipServerApplication>(*args)
}

//Valorizam-se solucoes em que o calculo do tempo de processamento
//inclua nao so o tempo de execucao do handler mas tambem o da maioria dos intermediarios envolvidos
//(e.g. filtros e interceptores).
@Configuration //open because -> https://stackoverflow.com/a/56410163/9375488
open class WebMvcConfig (private val service: HandlersService) : WebMvcConfigurer {  //interceptor versao 2
    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(MyCustomInterceptor(service))
    }
}

@Component
class PendingFilter(private val service: HandlersService): HttpFilter() {
    override fun doFilter(request: HttpServletRequest?, response: HttpServletResponse?, chain: FilterChain?) {
        //val start = System.nanoTime()
        val start = LocalDateTime.now()
        val registerCall = request?.requestURI=="/handlers"
        try { chain?.doFilter(request, response) //now the req goes through the interceptor and controllers
        } finally { //after execution
            println("filter finally")
            if(registerCall){
                //val end = System.nanoTime() - start
                val end = LocalDateTime.now().minusNanos(start.nano.toLong()).nano
                service.addHandlersCall(end)
            }
        }
    }
}

//ignore this postHandle
class MyCustomInterceptor (val service: HandlersService) : HandlerInterceptor {

    override fun postHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any, modelAndView: ModelAndView?) {
        println("posthandle")

        /*val newContent = "{ \"name\" : \"************r\" }"
        response.setContentLength(newContent.length)
        response.outputStream.write(newContent.toByteArray())
        response.setHeader("lol", "postHandled says hi")
        response.flushBuffer()*/

        //we can alter response only using response wrapper says the teacher? but whats above works afterall???
        //val wrappedResponse = ResponseWrapper(response)
        //wrappedResponse.flushToWrappedResponse()
    }

    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        println("prehandle")
        if (handler is HandlerMethod){ //https://stackoverflow.com/a/68326759/9375488
            if(handler.method.name=="handler" && request.requestURI=="/handlers") { //simple check of the METHOD name & request URI
                //service.addHandlersCall(request.requestURI)
                //request.setAttribute(key, "Called handler")
            }

            //para obter o nome anotado no @GetMapping seria preciso uma reflexao e consulta absurda de fields, no way que o prof queria isto
            //val invocationHandler = handler.method.declaredAnnotations.get(0) as GetMapping
            //(invocationHandler.value.h as AnnotationInvocationHandler).memberValues as LinkedHashMap).entrySet().toArray()[5] as LinkedHashMap.Entry).getValue()
            handler.shortLogMessage
        }
        return true
    }
}

private class StreamWrapper : ServletOutputStream() {
    val outStream = ByteArrayOutputStream()
    init {
        outStream.write("oi bruh ola".toByteArray())
    }
    override fun write(b: Int) { outStream.write(b) }
    override fun isReady(): Boolean = true
    override fun setWriteListener(listener: WriteListener?) = throw IllegalStateException()
    fun reset() { outStream.reset() }
}

private class ResponseWrapper(private val response: HttpServletResponse) : HttpServletResponseWrapper(response) {
    private val outStream = StreamWrapper()
    private val writer = PrintWriter(outStream)
    private var error: Int? = null

    override fun getOutputStream(): ServletOutputStream { return outStream }
    override fun getWriter(): PrintWriter { return writer }
    override fun flushBuffer() {}
    override fun sendError(sc: Int) { error = sc }

    fun flushToWrappedResponse() {
        writer.flush()
        outStream.flush()
        val bytes = outStream.outStream.toByteArray()
        val ay = "oi bruh ola".toByteArray()
        response.outputStream.write(ay, 0, ay.size)
        val observedError = error
        if (observedError != null) {
            super.sendError(observedError)
        }
        response.flushBuffer()
    }
}
