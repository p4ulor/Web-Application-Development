# 1

## 1.1 - 2

## 1.2 - 2

## 1.3 - 4?

## 1.4 - 4? Só há intercepters se se definir intercepters

## 1.5 - 2. Porque o webpack é que vai interpretar o CommonJS e fazer bundle de tudo num só ficheiro

## 1.6 - 4. Qualquer elemento HTML ou um componente. "The type argument can be either a tag name string (such as 'div' or 'span'),
### a React component type (a class or a function), or a React fragment type." https://reactjs.org/docs/react-api.html#createelement

# 2
- A "vantagem" é um cliente pode fazer vários pedidos a um recurso e não vai haver alteração de estado
- A complexidade da implementação/processamento da resposta pode ser inferior ?

# 3
- O preventDefault(), usado no contexto de um <form> por exemplo, vai evitar o recarregamento da página, que é o comporamento por default
de um HTML <form> quando o <input> ou <button> de type="submit" é usado (quando o <form> faz o pedido HTTP)
- https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

# 4 (igual a 2022_T2_Res)
- Porque os hooks definem operações que o React deve chamar, não somos nós que chamamos os hooks explicitamente
- O react é que deve gerir o estado
