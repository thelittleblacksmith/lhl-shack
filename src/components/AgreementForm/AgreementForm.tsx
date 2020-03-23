import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";
import NavigationPrompt from "react-router-navigation-prompt";
import { FormikProps, Formik, FormikValues } from "formik";

import { AppContext } from "../../Store";
import initialValues, { formatDBInitialValues } from "./initialValues";
import validationSchema from "./validationSchema";
import submitAgreement from "./submitAgreement";

import FormLeavePrompt from "./FormLeavePrompt";
import AppLoading from "../AppLoading";

import Title from "./Title";
import Household from "./Household";
import Landlord from "./Landlord";
import Roommates from "./Roommates";
import Housekeeping from "./Housekeeping";
import Rent from "./RentAndDeposit/Rent";
import SecurityDeposit from "./RentAndDeposit/SecurityDeposit";
import BillsUtilities from "./BillsUtilities";
import Signatures from "./Signatures";
import Preview from "./AgreementPreview";

const AgreementForm = () => {
  const { state }: { state: any } = useContext(AppContext);
  const [initialVals, setInitialVals] = useState(initialValues);
  const [agreementID, setAgreementID] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const getHouseholdDetails = (currUser: any) => {
      axios.get(`/api/agreements/${currUser.household}`).then(agreement => {
        // use agreement values as initial values if they exist
        const formValues =
          agreement.data && agreement.data.form_values ? agreement.data.form_values : null;
        if (formValues) {
          setAgreementID(agreement.data.id);
          setInitialVals(() => formatDBInitialValues(formValues));
        }
      });
    };

    if (state && state.currUser && !agreementID) {
      const { currUser } = state;
      const { first_name: firstName, last_name: lastName, phone_number: phone, email } = currUser;
      setInitialVals((prev: any) => ({
        ...prev,
        roommates: [{ firstName, lastName, phone, email }, { firstName: "", lastName: "", phone: "", email: ""}]
      }));

      getHouseholdDetails(state.currUser);
    }
  }, [state, agreementID]);

  const submitForm = (values: FormikValues, actions: any) => {
    const { currUser: { household } } = state;
    console.log('hello are you submittttiiiiing', values);
    submitAgreement({ formVals: values, householdID: household, agreementID  }).then(() => {
      actions.setSubmitting(false);
      setSubmitSuccess(true);
    });
  };

  if (!state) {
    return <AppLoading />;
  }

  return (
    <Formik
      initialValues={initialVals}
      enableReinitialize={true}
      onSubmit={(values, actions) => submitForm(values, actions)}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        handleBlur,
        initialValues,
      }: FormikProps<any>) => (
        <form onSubmit={handleSubmit}>
          {/* <p>{JSON.stringify(errors)}</p> */}
          <NavigationPrompt
            when={(_, next) => {
              // if initialValues === values --> you can navigate away cause nothing changed
              return (
                !submitSuccess && JSON.stringify(values) !== JSON.stringify(initialValues) &&
                (!next || !next.pathname.startsWith("/agreement"))
              );
            }}
          >
            {({ onConfirm, onCancel }) => (
              <FormLeavePrompt
                when={true}
                onCancel={onCancel}
                onConfirm={onConfirm}
                currUser={state.currUser}
                formVals={values}
                agreementID={agreementID}
              />
            )}
          </NavigationPrompt>
          <Switch>
            <Route path="/agreement/title" component={Title} />
            <Redirect from="/agreement" to="/agreement/title" exact />
            <Route path="/agreement/household" component={Household} />
            <Route path="/agreement/landlord" component={Landlord} />
            <Route path="/agreement/roommates" component={Roommates} />
            <Redirect from="/agreement/bills" to="/agreement/bills/rent" exact />
            <Route path="/agreement/bills/rent">
              <Rent
                values={values}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Route>
            <Route path="/agreement/bills/deposit">
              <SecurityDeposit
                values={values}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Route>
            <Route path="/agreement/bills/utilities">
              <BillsUtilities
                values={values}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Route>
            <Route path="/agreement/housekeeping">
              <Housekeeping
                values={values}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Route>
            <Route path="/agreement/signatures">
              <Signatures
                values={values}
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Route>
            <Route path="/agreement/preview" component={Preview}/>
          </Switch>
        </form>
      )}
    </Formik>
  );
};

export default AgreementForm;
