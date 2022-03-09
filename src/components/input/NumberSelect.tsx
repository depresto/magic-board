import React from "react";
import Select from "react-select";

const selectOptionValues = Array.from(Array(15).keys()).map((index) => ({
  value: index,
  label: index,
}));

const NumberSelect: React.FC<{
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
}> = ({ defaultValue, value, onChange }) => {
  return (
    <Select
      defaultValue={selectOptionValues[defaultValue ?? 0]}
      value={value ? selectOptionValues[value] : undefined}
      onChange={(newValue) => {
        if (newValue?.value) {
          onChange?.(newValue.value);
        }
      }}
      options={selectOptionValues}
      styles={{
        dropdownIndicator: (provided) => {
          return {
            ...provided,
            padding: "0px 2px",
            color: "hsl(0, 0%, 40%)",
            ":hover": {
              color: "hsl(0, 0%, 60%)",
            },
          };
        },
        indicatorSeparator: (provided) => {
          return {
            ...provided,
            backgroundColor: "transparent",
          };
        },
        valueContainer: (provided) => {
          return { ...provided, padding: "0px 8px" };
        },
        control: (provided) => {
          return { ...provided, minHeight: 28, borderRadius: 6 };
        },
        indicatorsContainer: (provided, state) => {
          return {
            ...provided,
            backgroundColor: "#E5E5E5",
            borderRadius: "0 6px 6px 0",
          };
        },
      }}
    />
  );
};

export default NumberSelect;
