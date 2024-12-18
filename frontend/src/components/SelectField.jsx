import React from "react";

const SelectField = ({ label, name, value, options, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
