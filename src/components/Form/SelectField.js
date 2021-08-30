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
