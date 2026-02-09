import React from 'react';
import './UI.css';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled,
    type = 'button',
    'data-test': dataTest
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            data-test={dataTest}
        >
            {children}
        </button>
    );
};

export const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    id,
    disabled,
    required,
    'data-test': dataTest
}) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={id} className="form-label">{label}{required && ' *'}</label>}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`form-input ${error ? 'is-invalid' : ''}`}
                data-test={dataTest}
            />
            {error && <span className="form-error" data-test={`${dataTest}-error`}>{error}</span>}
        </div>
    );
};

export const Select = ({
    label,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    error,
    id,
    disabled,
    'data-test': dataTest
}) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={id} className="form-label">{label}</label>}
            <select
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`form-select ${error ? 'is-invalid' : ''}`}
                data-test={dataTest}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="form-error" data-test={`${dataTest}-error`}>{error}</span>}
        </div>
    );
};

export const Checkbox = ({
    label,
    checked,
    onChange,
    id,
    disabled,
    'data-test': dataTest
}) => {
    return (
        <div className="form-check">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="form-check-input"
                data-test={dataTest}
            />
            <label htmlFor={id} className="form-check-label">{label}</label>
        </div>
    );
};

export const Radio = ({
    label,
    name,
    checked,
    onChange,
    value,
    id,
    disabled,
    'data-test': dataTest
}) => {
    return (
        <div className="form-check">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="form-check-input form-radio"
                data-test={dataTest}
            />
            <label htmlFor={id} className="form-check-label">{label}</label>
        </div>
    );
};
