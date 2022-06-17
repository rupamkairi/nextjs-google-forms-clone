import { useState, useReducer, useEffect } from "react";

const initialState = { valid: false, error: false };

function reducer(state, action) {
  switch (action.type) {
    case "empty":
      return { valid: false, error: "Field is Empty!" };
    case "valid":
      return { valid: true, error: false };
    default:
      return { valid: false, error: false };
  }
}

export default function TextBox({
  validationTrigger,
  setInvalids,
  setValue,
  ...field
}) {
  const [text, setText] = useState("");

  const [validationState, validationDispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (validationTrigger > 0) {
      validate(text);
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
        <div>
          <label className="text-sm" htmlFor={field.label}>
            {field.label}
          </label>
        </div>
        <input
          className="border border-gray-500 rounded focus:outline-none px-2"
          name={field.name}
          id={field.label}
          type={field.type}
          required={field.required}
          value={text}
          onChange={(e) => {
            validate(e.target.value);
            setText(e.target.value);
          }}
          onBlur={() => {
            validate(text);
          }}
        />
        {!validationState.valid && validationState.error && (
          <p className="text-pink-500 text-xs">{validationState.error}</p>
        )}
      </div>
    </div>
  );
}
