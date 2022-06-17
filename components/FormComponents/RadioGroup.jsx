import { useEffect, useState, useReducer } from "react";

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

export default function RadioGroup({
  validationTrigger,
  setInvalids,
  setValue,
  ...field
}) {
  const [selection, setSelection] = useState("");

  const [validationState, validationDispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (validationTrigger > 0) {
      validate(selection);
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
        {field.options.map((option, key) => (
          <div key={key}>
            <input
              name={field.name}
              id={option.label}
              type={field.type}
              onChange={(e) => {
                if (e.target.checked) {
                  validate(option.label);
                  setSelection(option.label);
                }
              }}
            />
            <label className="ml-2 text-sm" htmlFor={option.label}>
              {option.label}
            </label>
          </div>
        ))}
        {!validationState.valid && validationState.error && (
          <p className="text-pink-500 text-xs">{validationState.error}</p>
        )}
      </div>
    </div>
  );
}
