import React from 'react';
import {useFormik} from "formik";
import FormValues from "../FormValues";

const defineLeftZero = (number) => number < 10 ? '0' : '';
const hours = [...new Array(24)].map((value, index) => `${defineLeftZero(index)}${index}:00`);

function QuotationForm() {
    const {

        values: formValues,
        handleChange: handleFieldChange,
        handleSubmit

    } = useFormik( {validateOnChange, validateOnBlur, validateOnMount, isInitialValid, enableReinitialize, onSubmit, ...rest}: {

        initialValues: {

            pickUpAgency: '',
            pickUpDate: '',
            pickUpHour: '',
            specialRequest: ''
    
        },
        
        onSubmit: (values: Values) => {

            console.log(values);

        }

    }); 

    return (
        <>
            <form onSubmit={handleSubmit}>

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
}

export default QuotationForm;
