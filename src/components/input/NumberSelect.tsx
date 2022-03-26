import React from "react";
import Select from "react-select";

const selectOptionValues = Array.from(Array(15).keys()).map((index) => ({
  value: index,
  label: index,
}));

const NumberSelect: React.FC<{
  defaultValue?: number;
  startIndex?: number;
  value?: number;
  onChange?: (value: number) => void;
}> = ({ defaultValue, startIndex, value, onChange }) => {
  const optionsValues = selectOptionValues.filter((optionValue) => {
    if (startIndex) {
      return optionValue.label >= startIndex;
    } else {
      return true;
    }
  });

  const defaultOptionValue = optionsValues.find(
    (option) => option.value === defaultValue ?? 0
  );
  const optionValue = value
    ? optionsValues.find((option) => option.value === value)
    : undefined;

  return (
    <Select
      defaultValue={defaultOptionValue}
      value={optionValue}
      onChange={(newValue) => {
        if (typeof newValue?.value !== "undefined") {
          onChange?.(newValue.value);
        }
      }}
      options={optionsValues}
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
