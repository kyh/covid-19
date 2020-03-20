import React from 'react';

export const Input = ({ label, ...rest }) => {
  return (
    <div>
      <label htmlFor={label} className="sr-only">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          id={label}
          className="form-input block w-full sm:text-sm sm:leading-5"
          {...rest}
        />
      </div>
    </div>
  );
};
