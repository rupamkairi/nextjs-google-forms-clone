import { useState } from "react";
import CheckBoxGroup from "./FormComponents/CheckBoxGroup";
import RadioGroup from "./FormComponents/RadioGroup";
import SelectOption from "./FormComponents/SelectOption";
import TextBox from "./FormComponents/TextBox";

export default function FormManager({ id, formData }) {
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [invalids, setInvalids] = useState(null);
  const [fieldValues, setFieldValues] = useState({});

  return (
    <div className="container mx-auto">
      <h1 className="font-black text-2xl mb-8">{formData.header}</h1>
      <form>
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

            if (invalids === 0) {
              fetch(`/api/form/${id}`, {
                method: "POST",
                body: JSON.stringify(fieldValues),
              })
                .then((res) => res.json())
                .then((data) => console.log(data));
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
