import React, {useState} from 'react';
import FormValues from "../FormValues";

const defineLeftZero = (number) => number < 10 ? '0' : '';

const hours = [...new Array(24)].map((value, index) => `${defineLeftZero(index)}${index}:00`);

function QuotationForm() {
    const [formValues, setFormValues] = useState({
        pickUpAgency: '',
        pickUpDate: '',
        pickUpHour: '',
        specialRequest: ''
    });

    const submit = (event) => {
        event.preventDefault();

        console.log(formValues);
    }

    const handleFieldChange = (event) => {
        const {name, value} = event.target;

        setFormValues((prevValues) =>
            ({
                ...prevValues,
                [name]: value
            })
        );
    }

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
