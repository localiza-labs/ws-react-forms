# Controlled Components

Alguns elementos de formulário, no HTML, como inputs, textarea e select, tem seu próprio estado(`state`) e são capazes de atualizá-lo conforme a interação do usuário.

Quando falamos de React o estado interno de um componente só deveria ser modificado pelo `setState`, no caso de class componentes, ou pelo uso do `useState`, no caso de componente de função.

Ou seja, o React deveria ter o `controle` do estado do componente e os inputs de formulário que são controlados pelo estado do componente React são chamados de `controlled components`.

Nesse tópico nosso objetivo é demonstrar como fazer isso sem alguma lib que abstraia isso para nós.

Na [documentação oficial](https://reactjs.org/docs/forms.html) do React você pode aprofundar um pouco mais nesse assunto.

## Controlando os inputs do nosso formulário

A primeira coisa que precisamos fazer é atualizar nosso componente para que o React passe a gerenciar o estado dos nossos inputs.

Para fazer isso vamos adicionar o hook `useState` com os valores iniciais do nosso formulário.

```
const [formValues, setFormValues] = useState({
    pickUpAgency: '',
    pickUpDate: '',
    pickUpHour: '',
    specialRequest: ''
});
```

Nós também precisamos de um método para atualizar o estado de `formValues` caso o valor dos campos seja modificado.

Vamos criar o método `handleFieldChange` para isso:

```
const handleFieldChange = (event) => {
    const {name, value} = event.target;

    setFormValues((prevValues) =>
        ({
            ...prevValues,
            [name]: value
        })
    );
}
```

Agora basta atualizar os campos do formulário para receber o valor do estado do nosso componente e registrar nosso método de atualização de estado no evento `onChange` dos inputs.

```
return (
    <>
        <form onSubmit={submit}>

            <div className="row mb-3">

                <div className="col-md-5">

                    <label
                        className="form-label"
                        htmlFor="pickUpAgency"
                    >
                        Local de retirada
                    </label>

                    <input
                        className="form-control"
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

                </div>

                <div className="col-md-4">

                    <label
                        className="form-label"
                        htmlFor="pickUpDate"
                    >
                        Data de retirada
                    </label>

                    <input
                        className="form-control"
                        id="pickUpDate"
                        name="pickUpDate"
                        aria-describedby="pickUpDateHelp"
                        value={formValues.pickUpDate}
                        onChange={handleFieldChange}
                    />

                    <div
                        id="pickUpDateHelp"
                        className="form-text"
                    >
                        Selecione a data de retirada.
                    </div>

                </div>

                <div className="col-md-3">

                    <label
                        className="form-label"
                        htmlFor="pickUpHour"
                    >
                        Horário de retirada
                    </label>

                    <select
                        className="form-select"
                        id="pickUpHour"
                        name="pickUpHour"
                        aria-describedby="pickUpHourHelp"
                        value={formValues.pickUpHour}
                        onChange={handleFieldChange}
                    >
                        {hours.map((value) => (
                            <option
                                key={value}
                                value={value}
                            >
                                {value}
                            </option>
                        ))}
                    </select>

                    <div
                        id="pickUpHourHelp"
                        className="form-text"
                    >
                        Selecione a hora de retirada.
                    </div>

                </div>

            </div>

            <div className="row mb-3">

                <div className="col-md-12">

                    <label
                        className="form-label"
                        htmlFor="specialRequest"
                    >
                        Pedido especial
                    </label>

                    <textarea
                        className="form-control"
                        id="specialRequest"
                        name="specialRequest"
                        aria-describedby="specialRequestHelp"
                        value={formValues.specialRequest}
                        onChange={handleFieldChange}
                    />

                    <div
                        id="specialRequestHelp"
                        className="form-text"
                    >
                        Esse é um espaço destinado especialmente para você nos contar como podemos lhe atender
                        melhor
                    </div>

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
```
