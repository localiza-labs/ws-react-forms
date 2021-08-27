import React from 'react';

const initialLabel ='Vamos visualizar aqui os valores do formulário.';

function FormValues({values}) {
    return (
        <div className="alert alert-primary" role="alert">
            {
                values
                    ? Object.keys(values)
                        .map(valueName => (
                            <div
                                className="mb-2"
                                key={valueName}
                            >
                                <strong>{valueName}:</strong> {values[valueName]}
                            </div>
                        ))
                    : initialLabel}
        </div>
    );
}

export default FormValues;
