import React from 'react';
import {useFormik} from "formik";
import * as yup from 'yup';
import FormValues from "../FormValues";
import InputField from '../Form/InputField';
import * as TSESLint from '@typescript-eslint/utils/ts-eslint';

const defineLeftZero = (number) => number < 10 ? '0' : '';
const hours = [...new Array(24)].map((value, index) => `${defineLeftZero(index)}${index}:00`);


const validate = (values) => {


    const error = {};

    if(!values.pickUpAgency) {

        error.pickUpAgency = 'é preciso preencher o local de retirada';

    }

    if(!values.pickUpDate) {

        error.pickUpDate = 'é preciso preencher a data de retirada';

    }

    if(!values.pickUpHour) {

        error.pickUpHour = 'é preciso preencher selecionar o horario de retirada';

    }

    return error;

}

function QuotationForm() {
    const {

        values: formValues,
        handleChange: handleFieldChange,
        handleSubmit,
        handleBlur,
        touched, 
        errors

    } = useFormik( {validateOnChange, validateOnBlur, validateOnMount, isInitialValid, enableReinitialize, onSubmit, ...rest}: {

        initialValues: {

            pickUpAgency: '',
            pickUpDate: '',
            pickUpHour: '',
            specialRequest: ''
    
        }
        //validate,
        onSubmit: (values: Values) => {

            console.log(values);

        };

    }); 

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="row mb-3">

                    <div className="col-md-5">

                       <InputField 
                       
                            id="pickUpAgency"
                            label="local de retirada"
                            hint="Selecione o local onde deseja retirar o carro."
                            error={errors.pickUpAgency}
                            touched={touched.pickUpAgency}
                            value={formValues.pickUpAgency}
                            onChange={handleFieldChange}
                            onBlur={handleBlur}


                       />

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
