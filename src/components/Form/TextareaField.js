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
