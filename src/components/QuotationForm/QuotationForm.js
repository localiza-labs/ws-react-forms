import React from 'react';

function QuotationForm() {
    const submit = (event) => {
        event.preventDefault();
        // console.log(event.target.elements, event.target.form);
        [...event.target.elements].forEach(e => console.log(e.value));
    }

    return (
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

                    <input
                        className="form-control"
                        id="pickUpHour"
                        name="pickUpHour"
                        aria-describedby="pickUpHourHelp"
                    />

                    <div
                        id="pickUpHourHelp"
                        className="form-text"
                    >
                       Selecione a hora de retirada.
                    </div>

                </div>

            </div>

            <div className="row mb-3">

                <div className="col-md-5">

                    <label
                        className="form-label"
                        htmlFor="deliveryAgency"
                    >
                        Local de devolução
                    </label>

                    <input
                        className="form-control"
                        id="deliveryAgency"
                        name="deliveryAgency"
                        aria-describedby="deliveryAgencyHelp"
                    />

                    <div
                        id="deliveryAgencyHelp"
                        className="form-text"
                    >
                        Selecione o local onde deseja devolver o carro.
                    </div>

                </div>

                <div className="col-md-4">

                    <label
                        className="form-label"
                        htmlFor="deliveryDate"
                    >
                        Data de devolução
                    </label>

                    <input
                        className="form-control"
                        id="deliveryDate"
                        name="deliveryDate"
                        aria-describedby="deliveryDateHelp"
                    />

                    <div
                        id="deliveryDateHelp"
                        className="form-text"
                    >
                        Selecione a data de devolução.
                    </div>

                </div>

                <div className="col-md-3">

                    <label
                        className="form-label"
                        htmlFor="deliveryHour"
                    >
                        Horário de devolução
                    </label>

                    <input
                        className="form-control"
                        id="deliveryHour"
                        name="deliveryHour"
                        aria-describedby="deliveryHourHelp"
                    />

                    <div
                        id="deliveryHourHelp"
                        className="form-text"
                    >
                        Selecione a hora de devolução.
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
    );
};

export default QuotationForm;
