# Controlled Components

Alguns elementos de formulário, no HTML, como inputs, textarea e select, tem seu próprio estado(`state`) e são capazes de atualizá-lo conforme a interação do usuário.

Quando falamos de React o estado interno de um componente só deveria ser modificado pelo `setState`, no caso de class componentes, ou pelo uso do `useState`, no caso de componente de função.

Ou seja, o React deveria ter o `controle` do estado do componente e os inputs de formulário que são controlados pelo estado do componente React são chamados de `controlled components`.

Nesse tópico nosso objetivo é demonstrar como fazer isso sem alguma lib que abstraia isso para nós.

Na [documentação oficial](https://reactjs.org/docs/forms.html) do React você pode aprofundar um pouco mais nesse assunto.

## Controlando os inputs do nosso formulário
