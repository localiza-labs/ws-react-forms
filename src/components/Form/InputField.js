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
