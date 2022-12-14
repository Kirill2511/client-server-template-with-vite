import React from 'react';
import classNames from 'classnames';
import './Input.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
}

export const Input = (props: Props) => {
  const { label, errorText, ...inputProps } = props;
  const { className, disabled, value, type, placeholder, onChange, onBlur, name, ...otherProps } = inputProps;
  return (
    <div className="input">
      <label className="input__label">
        <span className="input__title">{label}</span>
        <input
          {...otherProps}
          className={classNames('input__field', 'input__field_theme_light', className)}
          value={value}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />
        <span className="input__error">{errorText}</span>
      </label>
    </div>
  );
};
