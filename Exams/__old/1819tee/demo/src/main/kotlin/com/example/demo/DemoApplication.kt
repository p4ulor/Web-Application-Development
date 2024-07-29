package com.example.demo

import com.example.demo.pipeline.interceptors.Interceptor
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.stereotype.Component
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@SpringBootApplication
class DemoApplication

@Component
class Config(val data: Data): WebMvcConfigurer {
	override fun addInterceptors(registry: InterceptorRegistry) {
		registry.addInterceptor(Interceptor(data))
	}
}

fun main(args: Array<String>) {
	runApplication<DemoApplication>(*args)
}
