# Validação e Feedback para o usuário

É nosso dever garantir que nossos usuários tenham uma ótima experiência com nossas aplicações e no caso dos formulários, é muito importante informar para o usuário que está acontecendo.

Nós precisamos identificar, por exemplo, os campos que estão inválidos, as interações assíncronas o campo atual e por aí vai.

É sobre isso que trataremos nessa branch.

## Validações

Para validar formulários usando o `formik` é preciso passar uma função de validação para o hook do formulário.

Vamos criar nossa função `validade`:

```
const validate = (values) => {
    const errors = {};

    if (!values.pickUpAgency) {
        errors.pickUpAgency = 'É preciso preencher o local de retirada';
    }

    if (!values.pickUpDate) {
        errors.pickUpDate = 'É preciso preencher a data de retirada';
    }

    if (!values.pickUpHour) {
        errors.pickUpHour = 'É preciso preencher a hora de retirada';
    }

    return errors;
}
```

Vejam que não tá ficando muito interessante com esse tanto de ifs, mas primeiro queremos mostrar o conceito, depois vamos melhorar.

Agora basta inserir nossa função `validade` no hook `useFormik`.

```
const {
        values: formValues,
        handleChange: handleFieldChange,
        errors,
        handleSubmit,
} = useFormik({
    initialValues: {
        pickUpAgency: '',
        pickUpDate: '',
        pickUpHour: '',
        specialRequest: ''
    },
    validate,
    onSubmit: (values) => {
        console.log(values);
    }
});
```

Com isso já não conseguimos chamar nosso `onSubmit`, caso algum `input` seja inválido.

Legal, agora não deixamos nosso usuário enviar dados inválidos, mas ele não faz ideia do que está acontecendo, nós só resolvemos o nosso problema, agora precisamos resolver a questão da experiência do nosso usuário.

Para sinalizar isso para nosso usuário, precisamos atualizar nosso template.

```
<input
    className={!!(errors.pickUpAgency) ? 'form-control is-invalid' : 'form-control'}
    id="pickUpAgency"
    name="pickUpAgency"
    aria-describedby="pickUpAgencyHelp"
    value={formValues.pickUpAgency}
    onChange={handleFieldChange}
/>

<div
    id="pickUpAgencyHelp"
    className="form-text"
>
    Selecione o local onde deseja retirar o carro.
</div>

<div className="invalid-feedback">
    {errors.pickUpAgency}
</div>
```

Fizemos a alteração apenas no input de data de retirada, pois como isso vai se repetir nos outros inputs, é uma boa oportunidade de evitar repetição e criar um componente que abstraia isso.

### Criando componentes de input customizados

Antes de começar a estruturar nos campos customizados, vamos instalar uma dependência que nos ajuda com escrita de css condicional.

```
yarn add classnames
``` 

ou

```
npm install classnames
```

Criaremos 3 componentes para abstrair a lógica de validação e feedback dos campos:

#### InputField em `src/components/Form/InputField.js`:

```
import React from 'react';
import classnames from 'classnames';

function InputField({id, error, hint, label, touched, ...inputProps}) {
    return (
        <>
            <label
                className="form-label"
                htmlFor={id}
            >
                {label}
            </label>

            <input
                className={classnames('form-control', {
                    'is-invalid': !!(error) && touched
                })}
                id={id}
                name={id}
                aria-describedby={`${id}Help`}
                {...inputProps}
            />

            {
                error && touched
                    ? <div className="invalid-feedback">
                        {error}
                    </div>
                    : <div
                        id={`${id}Help`}
                        className="form-text"
                    >
                        {hint}
                    </div>
            }

        </>
    );
}

export default InputField;
```

#### SelectField em `src/components/Form/SelectField.js`:

```
import React from 'react';
import classnames from "classnames";

const SelectField = ({id, error, hint, label, options, touched, ...selectProps}) => {
    return (
        <>
            <label
                className="form-label"
                htmlFor={id}
            >
                {label}
            </label>

            <select
                className={classnames('form-control', {
                    'is-invalid': !!(error) && touched
                })}
                id={id}
                name={id}
                aria-describedby={`${id}Help`}
                {...selectProps}
            >
                <option
                    value={''}
                >
                    Selecione
                </option>
                {options.map((value) => (
                    <option
                        key={value}
                        value={value}
                    >
                        {value}
                    </option>
                ))}
            </select>

            {
                error && touched
                    ? <div className="invalid-feedback">
                        {error}
                    </div>
                    : <div
                        id={`${id}Help`}
                        className="form-text"
                    >
                        {hint}
                    </div>
            }
        </>
    );
};

export default SelectField;
```

#### Textarea em `src/components/Form/Textarea.js`:

```
import React from 'react';
import classnames from 'classnames';

function TextareaField({id, error, hint, label, touched, ...textareaProps}) {
    return (
        <>
            <label
                className="form-label"
                htmlFor={id}
            >
                {label}
            </label>

            <textarea
                className={classnames('form-control', {
                    'is-invalid': !!(error)
                })}
                id={id}
                name={id}
                aria-describedby={`${id}Help`}
                {...textareaProps}
            />

            {
                error
                    ? <div className="invalid-feedback">
                        {error}
                    </div>
                    : <div
                        id={`${id}Help`}
                        className="form-text"
                    >
                        {hint}
                    </div>
            }


        </>
    );
}

export default TextareaField;
```

Pronto, agora é só atualizar nosso formulário:

```
import React from 'react';
import {useFormik} from 'formik';
import FormValues from '../FormValues';
import {InputField, TextareaField} from "../Form";
import SelectField from "../Form/SelectField";

const defineLeftZero = (number) => number < 10 ? '0' : '';
const hours = [...new Array(24)].map((value, index) => `${defineLeftZero(index)}${index}:00`);

const validate = (values) => {
    const errors = {};

    if (!values.pickUpAgency) {
        errors.pickUpAgency = 'É preciso preencher o local de retirada';
    }

    if (!values.pickUpDate) {
        errors.pickUpDate = 'É preciso preencher a data de retirada';
    }

    if (!values.pickUpHour) {
        errors.pickUpHour = 'É preciso preencher a hora de retirada';
    }

    return errors;
}

function QuotationForm() {
    const {
        values: formValues,
        handleChange: handleFieldChange,
        handleBlur,
        touched,
        errors,
        handleSubmit,
    } = useFormik({
        initialValues: {
            pickUpAgency: '',
            pickUpDate: '',
            pickUpHour: '',
            specialRequest: ''
        },
        validate,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <>
            <form
                onSubmit={handleSubmit}
            >

                <div className="row mb-3">

                    <div className="col-md-5">

                        <InputField
                            id="pickUpAgency"
                            label="Local de retirada"
                            hint="Selecione o local onde deseja retirar o carro."
                            error={errors.pickUpAgency}
                            touched={touched.pickUpAgency}
                            value={formValues.pickUpAgency}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                        />

                    </div>

                    <div className="col-md-4">

                        <InputField
                            id="pickUpDate"
                            label="Data de retirada"
                            hint="Selecione a data de retirada."
                            touched={touched.pickUpDate}
                            error={errors.pickUpDate}
                            value={formValues.pickUpDate}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                        />

                    </div>

                    <div className="col-md-3">

                        <SelectField
                            id="pickUpHour"
                            label="Horário de retirada"
                            hint="Selecione a hora de retirada."
                            touched={touched.pickUpHour}
                            error={errors.pickUpHour}
                            options={hours}
                            value={formValues.pickUpHour}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                        />

                    </div>

                </div>

                <div className="row mb-3">

                    <div className="col-md-12">

                        <TextareaField
                            id="specialRequest"
                            label="Pedido especial"
                            hint="Esse é um espaço destinado especialmente para você nos contar como podemos lhe atender
                            melhor."
                            touched={touched.specialRequest}
                            error={errors.specialRequest}
                            value={formValues.specialRequest}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}
                        />

                    </div>

                </div>

                <div className="row">
                    <div className="col-md-12">
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Enviar
                        </button>
                    </div>
                </div>

            </form>

            <div className="mt-3">
                <FormValues values={formValues}/>
            </div>

        </>
    );
}

export default QuotationForm;
```

### Melhorando as nossas validações com [Yup](https://www.npmjs.com/package/yup)

Até agora nós temos uma função cheia de ifs, muito repetitiva e pode virar um monstro no futuro.

Vamos usar uma solução de mercado para resolver essa questão, a lib [Yup](https://www.npmjs.com/package/yup). 

Primeiro vamos instalá-la:

```
yarn add yup
```

ou

```
npm install yup
```

Agora precisamos criar um esquema de validação:

```
import {object as schema, string} from 'yup';

const validationSchema = schema({
    pickUpAgency: string()
        .required('É preciso preencher o local de retirada'),
    pickUpDate: string()
        .required('É preciso preencher a data de retirada')
        .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, 'A data precisa estar no formato dd/mm/yyyy'),
    pickUpHour: string()
        .required('É preciso preencher a hora de retirada'),
});
```

E substituir nossa função de validate pelo `validationSchema`.

```
const {
    values: formValues,
    handleChange: handleFieldChange,
    errors,
    handleSubmit,
} = useFormik({
    initialValues: {
        pickUpAgency: '',
        pickUpDate: '',
        pickUpHour: '',
        specialRequest: ''
    },
    validationSchema,
    onSubmit: (values) => {
        console.log(values);
    }
});
```

### Tratando interações assíncronas

É provável que boa parte dos nossos formulários tenham alguma interação com API ou façam algum request, seja para validar ou salvar algum dado.

Enquanto essa requisição está sendo feita é importante informar para o usuário que ele precisa esperar o recebimento da resposta, antes de concluir o que ele deseja.

Para isso nós podemos ter ao menos duas ações:

* Apresentar um Loading
* Bloquear novas interações

O formik torna bem simples nossa vida quanto a esse assunto. Basta usarmos o valor `isSubmitting`.

Primeiro vamos criar uma função para nossa requisição fake.

```
const sleep = (time = 1000) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(false);
    },time)
})
```

Depois atualizar nosso hook para retornar o `isSubmitting` e para que o `onSubmit` seja async.

```
const {
    values: formValues,
    handleChange: handleFieldChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    isSubmitting
} = useFormik({
    initialValues: {
        pickUpAgency: '',
        pickUpDate: '',
        pickUpHour: '',
        specialRequest: ''
    },
    validationSchema,
    onSubmit: async (values) => {
        await sleep();
        console.log(values);
    }
});
```

E por último e não menos importante, o nosso template:

```
import Loading from "../Loading";

...
<button
    className="btn btn-primary"
    type="submit"
    disabled={isSubmitting}
>
    Enviar {!!(isSubmitting) && <span className="mx-2"><Loading/></span>}
</button>
...
```

Pronto, dessa forma indicamos operações assíncronas para os nossos usuários.

Espero que tenham gostado.

Até a próxima.
