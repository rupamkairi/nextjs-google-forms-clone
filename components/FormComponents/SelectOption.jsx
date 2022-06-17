import { useReducer, useState, useEffect } from "react";

const initialState = { valid: false, error: false };

function reducer(state, action) {
  switch (action.type) {
    case "empty":
      return { valid: false, error: "Not Selected!" };
    case "valid":
      return { valid: true, error: false };
    default:
      return { valid: false, error: false };
  }
}

export default function SelectOption({
  validationTrigger,
  setInvalids,
  setValue,
  ...field
}) {
  const [option, setOption] = useState("");

  const [validationState, validationDispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (validationTrigger > 0) {
      validate(option);
    }
  }, [validationTrigger]);

  function validate(value) {
    console.log("validate", value);

    if (field.required) {
      if (value === "") {
        validationDispatch({ type: "empty" });
        setInvalids((prev) => prev + 1);
        return false;
      }
    }

    validationDispatch({ type: "valid" });
    setValue((prev) => ({ ...prev, [field.title]: value }));

    return true;
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">
        {field.title}
        {field.required && <sup>*</sup>}
      </h3>
      <div>
        <select
          className="border border-gray-500 rounded focus:outline-none px-1 text-sm"
          name={field.name}
          id={field.label}
          required={field.required}
          onChange={(e) => {
            validate(e.target.value);
            setOption(e.target.value);
          }}
          onBlur={() => {
            validate(option);
          }}
        >
          <option key={-1} value="">
            Select an option
          </option>
          {field.options.map((option, key) => (
            <option key={key} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        {/* <pre>{JSON.stringify(validationState)}</pre> */}
        {!validationState.valid && validationState.error && (
          <p className="text-pink-500 text-xs">{validationState.error}</p>
        )}
      </div>
    </div>
  );
}
