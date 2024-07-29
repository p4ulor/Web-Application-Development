# 1

Para criar um projeto Spring facilmente, podemos aceder a: start.spring.io

Project: Gradle Project
Language: Kotlin
Spring Boot: 2.4.3 (Latest Stable...)
Packaging: .jar
Dependências: Spring Web (Spring MVC)

Gradle usa Groovy, mas mais recentemente passou a suportar Kotlin (.kts = Kotlin Script)

---------------
@RestController
Anotação que se dá a classes para ser um contentor de handlers, que são handlers de pedidos HTTP.
Os retornos dos métodos são usados diretamente para a resposta.

@RequestMapping("route")
Define a rota de todas as rotas da classe

@GetMapping("my/route")
Anotação que se dá a funções para torna-las responsáveis por processar pedidos HTTP GET com o caminho dado

@Controller
Os retornos dos métodos são usados para uma view engine.

SpringContext é quem instancia os controllers.
O SpringContext necessita de informação para implementar/instanciar tipos. Por exemplo, o nosso @RestController poderá receber uma interface por parâmetro, mas SpringContext não sabe instanciar uma interface. Mesmo que criamos uma classe que a implemente, o contexto não a tem em conta. Para a adicionar ao contexto, anota-se com @Component.

O Contexto procura todas as classes que estão no class path (ClassPathScanning). Só se interessa por classes com dadas anotações, nomeadamente @Component.

Podemos criar um contexto através de AnnotationConfigApplicationContext, passando classes que queremos incluir no contexto no seu construtor. Podemos obter instâncias das classes através de context.getBean(Router::class.java), por exemplo.

@Configuration
Classe que serve para configurar um contexto. Pode ser utilizado em AnnotationConfigApplicationContext.

@ComponentScan
Deve ser feito um scan/procura de componentes. Utilizado em conjunção com @Configuration

@Component
Vai ser encontrado por classes anotadas com @ComponentScan

@Scope("prototype")
Criar uma nova instância cada vez que for preciso satisfazer uma dependência. Por defeito, é utilizada a mesma instância

Fazer uma função com anotação @Bean numa classe com anotação @Configuration, fará com que esta seja o construtor de uma instância de um dado objeto (o retorno). Ou seja, podemos definir aqui funções para criar DataSource, por exemplo.

# 2

RequestMappingHandlerMapping

Tem campos para ver, por exemplo, os handler methods existentes.
mapping.handlerMethods.keys => chaves dos métodos

Um filter permite colocar código que se executa antes do ínicio do processamento do pedido. Podemos inserir pré-processamento e pós-processamento. É uma espécie de um middleware do express. Os filtros são executados antes dos handlers.

doFilter(request, response, chain) => chain.doFilter(request, response)

Os filtros são encontrados automaticamente se estiverem anotados com @Component. O order de execução destes filtros pode ser definida.

# 3
Spring usa o Tomcat como HttpServlet.

Filtros são definidos pelo utilizador, que são executados antes da chamada à servlet.
O Handler não tem de seguir nenhuma convenção. O Spring tenta pegar no pedido e satisfazer a assinatura do handler.

Pipeline do Spring:
(HttpRequest Message)
Filters -> Servlet -> Handler Interceptor (preHandle)  -> Argument Binding -> Handlers -------|
                                                                                              |
Filters <- Servlet <- Handler Interceptor (postHandle) <- Message Conversion <----------------|
(HttpResponse Message)

-----
@GetMapping("my/{path}")
fun handler0(@PathVariable path: Type) {}

@PathVariable permite ir buscar parametros no caminho.
O Spring tenta fazer parse da variável para o tipo pedido na assinatura. Caso isso falhe, ocorre um erro, respondendo com Bad Request automaticamente.

@RequestParam serve para parametros da query string. Posto isto, pode vir a null
Também acontece o mesmo em termos de parsing. Se o parsing para o tipo pedido falhar, o handler não é chamado e o Spring responde com Bad Request.

@RequestParam prms: MultiValueMap<String, String>
Permite ir buscar todos os pares nome-valor na query string. É um MultiValueMap pois podem aparecer vários valores para o mesmo nome (?n=val&n=val2...)

Podemos também utilizar tipos definidos por nós como parametros de entrada. Para isto, é preciso um ArgumentResolver para resolver argumentos do nosso tipo, que é uma classe que deriva de HandlerMethodArgumentResolver. Tem os seguintes métodos:
• supportsParameter => serve para responder ao Spring. Ele passa um parametro, e nós respondemos se conseguimos lidar com esse parametro ou não.
• resolveArgument => serve para transformar o parametro na classe alvo.

De maneira a tornar este parser conhecido ao Spring, definimos um WebMvcConfigurer (com anotação @Component), e nesta classe temos métodos. Concretamente:
• addArgumentResolvers(resolverList: ...) resolverList.add(OurResolverClass())
Esta classe também permite configurar MessageConverters e HandlerInterceptors

Um ServletRequest representa um pedido HTTP e o contexto em que este foi recebido. Desta forma, é possível obter o endereço IP do pedido.

@RequestBody para ir buscar o corpo do pedido. O Spring vai tentar converter o corpo para a classe alvo. Suporta JSON.

Se tivermos um parâmetro do tipo HttpServletRequest, o nosso handler irá receber o ServletRequest.

O output de um handler é o payload da resposta HTTP. Ao responder com objetos, acontece a serialização em JSON do mesmo.
A classe que utilizamos para saída de dados pode ser anotada com várias anotações específicas do Spring para alterar a representação dos dados. Por exemplo, @JsonNaming altera os nomes das propriedades.

@JsonNaming(PropertyNamingStrategy.UpperCamelCaseStrategy::class) -> Os campos no JSON ficam com letra grande.
@JsonNaming(PropertyNamingStrategy.KebabCaseStrategy::class) -> Os campos no JSON ficam separados por hífen (daí kebab).

@JsonProperty("name")
val myProp: String
^^^^^^^^ myProp vai passar a chamar-se "name" no JSON, independentemente do nome da propriedade no código

Também podemos especificar a mensagem de resposta com:

RespondeEntity
	.status(200)
	.contentType("application/something")
	.body(MyBodyModel("Hello"))

Também podemos criar classes para converter mensagens. Classes essas que estendem AbstractGenericHttpMessageConverter<FromType>(ToType)
E está anotada com @Component

O método supports permite saber se a classe suporta a conversão de um dado tipo.
O método writeInternal destas classes vai escrever a mensagem convertida

----------------------
HandlerInterceptor é uma classe que corre depois e antes de um handler. Tem os métodos preHandler e postHandle que recebem o Request, Response e Handler.

O processamento de um pedido é feito todo na mesma thread. Um pedido obtém uma thread de um thread pool.

Em preHandle, podemos querer inserir campos para depois os ir buscar no postHandle. Podemos utilizar o request para isto.
request.setAttribute("myAttr", obj)
request.getAttribute("myAttr")

# 4
ControllerAdvice -> Classe que complementa o que os controllers fazem.

Um ControllerAdvice pode ter métodos anotados com @ExceptionHandler(ExceptionType::class), que recebem uma exceção nos argumentos. Estes métodos são chamados quando uma exceção é lançada.

Para tratar de exceções lançadas pelo Spring, podemos utilizar o ResponseEntityExceptionHandler, que tem métodos específicos para tratar cada tipo de exceção interna do Spring. Para isto, criamos uma classe @ControllerAdvice que estende disto, e depois implementamos os métodos que queremos. Os tipos de retorno destes método é ResponseEntity, o que permite alterar a resposta do Spring (status, body, etc...).


Problem+Json:
JSON de resposta:
Header -> application/problem+json

{
	"type": "uri/to/problem/type", (isto pode até nem existir, serve só para identificar)
	"title": "Problem Title",
	"other_field": "value",
}

# 5
Links tem relações com um recurso. Um recurso por ter relações com outros recursos.
Por exemplo:
Issue tem um autor, portanto, tem um link para um user que é o autor. A relação "rel" é "author"

HTML tem elementos "link", e neles existe a propriedade "rel", que define qual a relação do link.
por exemplo:
rel="stylesheet" -> define a stylesheet
rel="search" -> para definir o motor de busca do website

# 6
Uma API tem tendência a crescer. Quando existe uma atualização, muitas vezes a versão antiga tem de permanecer operacional durante algum tempo, pois existem clientes que têm de ser atualizados.

As regras de negócio têm maior chance de serem cumpridas se estiverem implementadas na API. Uma regra de negócio também pode ser mudada muito facilmente, ou seja, se estiver na API é só mudar a API, mas se estiver nos clientes, então é necessário mudar em todos.

Com 201 Created, devemos ter um header "Location" com a localização do conteúdo criado

Usar filtros ou interceptors para fazer autenticação

Usar sempre identificadores estáveis. Um identificador estável é um que não se altera.

Vary -> Header utilizado em respostas do servidor. Serve para especificar os headers que importam para produzir a resposta. No final, serve para definir quando efetuar caching das respostas.

# 7
localStorage => chave-valor, e sobrevive a refresh da página, assim como tabs diferentes. É contido apenas na mesma domain.

colocar type="module" dentro de uma tag script, define um script como um módulo. Ou seja, tudo o que é definido no módulo é privado ao módulo.

Existem vários sistemas de módulos, nomeadamente:
- CommonJS (usado pelo node.js com algumas adições) -> função 'require', objeto 'exports' de module.
- ES (EcmaScript) Module (usado pelos browsers "modernos")

Como funciona ES Module:
Um módulo utiliza a keyword "export" atrás de uma função, por exemplo, para a tornar visível fora do módulo.

ex.
export function add(x,y) { return x + y; }

para importar:
import { add } from './lib1.js'

ES Module suporta dependencias ciclicas.

webpack -> utilizado para fazer bundle do javascript, ou seja, colocar o código javascript num só ficheiro com algumas otimizações.

# 8
Loaders do webpack -> Algo que serve para transformar algo que não é JavaScript em JS. Isto é usado quando utilizamos, por exemplo, TypeScript.

npm install --save-dev typescript ts-loader

JSX -> permite, juntamento com javascript, usar uma sintaxe semelhante ao HTML ao construir objetos.
TSX é TypeScript com JSX.

# 9
Uma árvore DOM do React (árvore virtual) é imutável. Ou seja, se quisermos adicionar algo à árvore, então criamos uma nova árvore.

React.createELement('div', {})
ou usar JSX

depois: React.render(tree, document.getElementById('containerId')) -> O Container vai ser o elemento pai para o render

Ao fazer re-render, devemos ter uma propriedade "key" por elemento, com valor único em cada um, para o React otimizar quais os elementos e rescrever e saber qual é o elemento.

JSX -> tipos com letras maiúsculas são funções. Com letras minúsculas são tipos diretos.
<ToDo model={todo}/> = React.createElement(ToDo, {model: todo})
<toDo model={todo}/> = React.createElement("toDo", {model: todo})


A função tem de suportar children para funcionar devidamente com JSX (children do tipo Reach.ReactNode):

<ToDo model={todo}>
    <p>Hello</p>
</ToDo>
-> Reach.createElement(ToDo, {model: todo}, React.createElement("p", null, "Hello")))


ToDoProps(model: ToDoModel, children: React.ReactNode)
ToDo({model, children}: ToDoProps) {
// JSX e meter o children no da árvore retornada, assim:
{children}
}

# 10
useEffect(() => {}) -> Executa a função após o retorno do elemento da função mãe.

Se o useEffect mudar o estado da página, é feito re-render, logo a função é chamada novamente. Para evitar este ciclo eterno, podemos passar uma lista de dependencias (um array). Esta lista diz "executa este efeito se algum elemento desta lista mudar".

# 11
const [status, setStatus] = useState(initialState)

setStatus -> função para passar o próximo estado, vai resultar num novo render
status -> estado observado neste momento

o useEffect pode retornar uma função. Essa função será a "cleanup function" do useEffect. Um useEffect pode precisar de ser cancelado porque, por exemplo, o elemento ao qual ele está ligado deixou de existir. Dentro do useEffect, podemos ter operações que necessitam de ser canceladas. Para isto, utilizamos a função de retorno.

// State é o anterior, action é o próximo
reducer(state: State, action: Action): State {
switch(action.type)
...
return nextState
}

const [{value, valid}, dispatch] = useReducer(reducer, {value: '', valid: true})
// initial state and function to dispatch "actions"

dispatch({type: 'action-type', value: myActionValue, result: res})

O reducer permite-nos alterar o estado num sítio comum.

## 12
history.pushState({}, '', '/new/path') -> enviar outro caminho para o histórico do browser
window.addEventListener('popState', () => alert(1)) -> event listener para quando se altera o caminho do browser (aka state através de um pushState ou se anda para trás)

Deeplinking => carregar uma aplicação e ir para um sítio interno da aplicação com base no URL que foi fornecido

React Router => Router do lado do browser

## 13
TheComponent -> componente - função
<TheComponent> -> elemento - objeto que referencia o TheComponent
<TheComponent a=b c=d> -> elemento - objeto que referencia o TheComponent e um objeto de propriedades {a:b, c:d}

React.createElement(TheComponent, {a:b, c:d}, ...)