import React from 'react';
import {useFormik} from 'formik';
import {object as schema, string} from 'yup';

import FormValues from '../FormValues';
import {InputField, TextareaField} from "../Form";
import SelectField from "../Form/SelectField";
import Loading from "../Loading";

const defineLeftZero = (number) => number < 10 ? '0' : '';

const hours = [...new Array(24)].map((value, index) => `${defineLeftZero(index)}${index}:00`);

const sleep = (time = 1000) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(false);
    },time)
})

const validationSchema = schema({
    pickUpAgency: string()
        .required('É preciso preencher o local de retirada'),
    pickUpDate: string()
        .required('É preciso preencher a data de retirada')
        .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, 'A data precisa estar no formato dd/mm/yyyy'),
    pickUpHour: string()
        .required('É preciso preencher a hora de retirada'),
});

function QuotationForm() {
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
                            disabled={isSubmitting}
                        >
                            Enviar {!!(isSubmitting) && <span className="mx-2"><Loading/></span>}
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
