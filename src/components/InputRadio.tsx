import React from "react";

export interface IInputRadioProps {
  className?: string;
  id: string;
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

export const InputRadio = ({ className = "", ...props }) => {
  return (
    <div className={`form-check form-check-inline ${className}`}>
      <input
        className="form-check-input"
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
};

export default InputRadio;
