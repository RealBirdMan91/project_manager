import React from "react";

type Input = React.InputHTMLAttributes<HTMLInputElement>;
interface Props extends Input {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, value, onChange, ...props }: Props) {
  return (
    <>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            value={value}
            onChange={onChange}
            type="text"
            name={props.name}
            autoComplete={props.name}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            {...props}
          />
        </div>
      </div>
    </>
  );
}

export default Input;
