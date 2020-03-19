import React from "react";
import { FieldArray, useFormikContext, Field, getIn } from "formik";

import { FormValues } from "../../interfaces";

import FieldSet from "../FieldSet";

import { Button } from "@chakra-ui/core";

import { useHistory } from "react-router-dom";

const ErrorMessage = ({ name }: { name: any }) => (
  <Field
    name={name}
    render={({ form }: { form: any }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? error : null;
    }}
  />
);

const Roommates = () => {
  const history = useHistory();
  const { values }: { values: FormValues } = useFormikContext();
  return (
    <div>
      <h2>Roommates</h2>
      <FieldArray name="roommates">
        {arrayHelpers => (
          <div>
            <ol>
              {values.roommates.map((roomie, index) => (
                <li key={index}>
                  <FieldSet type="text" name={`roommates.${index}.firstName`} label="First Name" />
                  <FieldSet type="text" name={`roommates.${index}.lastName`} label="Last Name" />
                  <FieldSet type="text" name={`roommates.${index}.email`} label="Email" />
                  <FieldSet type="text" name={`roommates.${index}.phone`} label="Phone" />
                  <p>======== temporary line break ============</p>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() =>
                arrayHelpers.push({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: ""
                })
              }
            >
              Add Roommate
            </button>
          </div>
        )}
      </FieldArray>
      <div>
        <Button
          variantColor="orange"
          onClick={() => {
            history.push("/agreement/landlord");
          }}
        >
          Previous Section
        </Button>
        <Button
          variantColor="pink"
          onClick={() => {
            history.push("/agreement/bills/rent");
          }}
        >
          Next Section
        </Button>
      </div>
    </div>
  );
};

export default Roommates;
