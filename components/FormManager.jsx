import { useState } from "react";
import formData from "../data/form1.json";
import CheckBoxGroup from "./FormComponents/CheckBoxGroup";
import RadioGroup from "./FormComponents/RadioGroup";
import SelectOption from "./FormComponents/SelectOption";
import TextBox from "./FormComponents/TextBox";

export default function FormManager() {
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [invalids, setInvalids] = useState(null);
  const [fieldValues, setFieldValues] = useState({});

  return (
    <div className="container mx-auto">
      <h1 className="font-black text-2xl mb-8">{formData.header}</h1>
      <form
        onSubmit={(e) => {
          setInvalids(0);
          e.preventDefault();
          setValidationTrigger(validationTrigger + 1);

          if (!invalids) {
            console.log("submit");
          }
        }}
      >
        {formData.fields.map((field, key) => (
          <div key={key}>
            {
              {
                text: (
                  <TextBox
                    {...field}
                    validationTrigger={validationTrigger}
                    setInvalids={setInvalids}
                    setValue={setFieldValues}
                  />
                ),
                radio: (
                  <RadioGroup
                    {...field}
                    validationTrigger={validationTrigger}
                    setInvalids={setInvalids}
                    setValue={setFieldValues}
                  />
                ),
                select: (
                  <SelectOption
                    {...field}
                    validationTrigger={validationTrigger}
                    setInvalids={setInvalids}
                    setValue={setFieldValues}
                  />
                ),
                checkbox: (
                  <CheckBoxGroup
                    {...field}
                    validationTrigger={validationTrigger}
                    setInvalids={setInvalids}
                    setValue={setFieldValues}
                  />
                ),
              }[field.type]
            }
          </div>
        ))}
        {/* <pre>{invalids}</pre> */}
        <button
          className="border border-black py-2 px-4 rounded-md hover:bg-black hover:text-white transition-all"
          type="button"
          onClick={() => {
            setValidationTrigger(validationTrigger + 1);
            setInvalids(0);

            if (!invalids) {
              console.log("submit");
              console.log(fieldValues);
            }
          }}
        >
          Submit
        </button>
      </form>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  );
}
