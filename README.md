# Formik

Lidar com formulários vai bem além da questão de criar `controlled components`, temos que cuidar de validações,
tratamentos antes de submeter os valores, feedback para os usuários e por aí vai.

Para isso existem algumas soluções de mercado que abstraem esse mundo de formulários e
o [formik](https://formik.org/docs/overview) é uma delas. Inclusive é citada na documentação oficial do React.

## Instalação

```
npm install formik --save
```

ou

```
yarn add formik
```

## Atualizando nosso componente

Vamos importar a lib no nosso component:

```
import { useFormik } from 'formik';
```

Utilizaremos a estratégia do formik com hooks, mas poderíamos utilizar o component `Formik` e usa estratégia
de [render props](https://reactjs.org/docs/render-props.html).

```
const {
    values: formValues,
    handleChange: handleFieldChange,
    handleSubmit
} = useFormik({
    initialValues: {
        pickUpAgency: '',
        pickUpDate: '',
        pickUpHour: '',
        specialRequest: ''
    },
    onSubmit: (values) => {
        console.log(values);
    }
});
```

Removemos toda a implementação do nosso componente e resumimos tudo no hook `useFormik` que retorna tanto os valores
quanto o método de gerenciamento de estado `handleChange`, além do método para gerenciar a submissão, `handleSubmit`, do
nosso formulário.

Note que estamos usando um `alias` no `values` e no `handleChange` para modificar o mínimo possível no nosso layout.

Agora só falta atualizar o `onSubmit` do nosso form:

```
<form onSubmit={handleSubmit}>
```
