# 1

## 1.1 - 1 https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

## 1.2 - 3

## 1.3 - 3 "In the simplest case, a link relation type identifies the semantics of a link" -> "que expressa a semantica" https://www.rfc-editor.org/rfc/rfc8288.html#section-2.1

## 1.4 - 4 O useEffect vai ser chamado sempre que o componente for renderizado

## 1.5 - 4 vai dar undefined, porque retorna Promise<Response>

## 1.6 - 2

# 2
- Hypermedia vai disponibilizar ao cliente informações extra (meta-dados) sobre a resposta obtida, de modo a que o cliente possa usar melhor a informação da 
resposta (os dados em si, que se queriam obter, não o hypermedia) ao saber como usá-la. Em suma, o hypermedia descreve ao cliente como navegar e usar a API
- O hypermedia também vai evitar o hardcoding de URI's no lado do front-end, visto que o front-end vai usar o hypermedia para obter os URI's e nomes de
entidades do hypermedia retornado pela API

# 3
- Um servlet filter faz parte de javax.servlet.Filter (é aplicado antes de chegar ao ambiente do Spring MVC, 
e vai permitir a manipulação de objetos tanto dos pedidos como os da resposta antes de chegar ao spring MVC
- Os handler interceptors já fazem parte da applicação Spring, e definem operações ou checks que devem ser feitos antes do pedido
chegar aos controladores. Costuma ser aqui que se fazem verificações de autorização mais especificas relativas ao domínio da aplicação

Logo o que se deve ter em conta é se os checks que queremos fazer devem ser feitos fora do contexto spring,
usamos servlet filter.
Se queremos que os checks sejam feitos no contexto da aplicação spring, usamos handler interceptor

- https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/servlet/HandlerInterceptor.html
- https://www.baeldung.com/spring-mvc-handlerinterceptor-vs-filter

# 4 
### Propósito:
- O webpack vai fazer build, comprimir e transpile do nosso código de forma a que possa ser executado no browser (um ambiente de execuçao)
### O webpack vai:
- Usar o tsconfig.json para transpilar o typescript and javascript
- Incluir o CSS, e incluir referencias para mp3's, imagens, etc
- Vai comprimir o código todo numa só linha

### Forma de utilizac˜ao
- Em modo de desenvolvimento, usa-se o webpack serve para podermos simular e testar o códígo bundled
- Ao se ter o produto final, deve-se fazer um build de produção, cujo servidor deve disponibilizar, normalmente no root path "/"

# 5
Ta no Exames/. Nao sei se esta bem

# 6
Ta no front-end/. Nao sei se esta bem


