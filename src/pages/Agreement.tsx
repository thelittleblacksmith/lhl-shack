import React from 'react';
import moment from 'moment';
import { FormikProps, withFormik } from 'formik';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { EditorState } from 'draft-js';

import { FormValues } from '../interfaces';

import Title from '../components/AgreementForm/Title';
import Info from '../components/AgreementForm/Info';
import Landlord from '../components/AgreementForm/Landlord';
import Roommates from '../components/AgreementForm/Roommates';
import Housekeeping from '../components/AgreementForm/Housekeeping';
import Rent from '../components/AgreementForm/RentAndDeposit/Rent';
import SecurityDeposit from '../components/AgreementForm/RentAndDeposit/SecurityDeposit';
import BillsUtilities from '../components/AgreementForm/BillsUtilities';
import TestDraft from '../components/AgreementForm/TestDraft';
import Signatures from '../components/AgreementForm/Signatures';

import 'draft-js/dist/Draft.css';

// function to flatten array for field array: https://github.com/jaredpalmer/formik/issues/11

const billShape = {
  name: null,
  totalAmt: 0,
  dueDate: moment(),
  interval: [], // once, monthly, every 2 months, annually
};

const formikEnhancer = withFormik({
  mapPropsToValues: props => ({
    roommates: [
      {
        firstName: 'Roommate',
        lastName: 'One',
        email: 'roomie1@email.com',
        phone: '6041234567',
      },
      {
        firstName: 'Roommate',
        lastName: 'Twwwooooo',
        email: 'bestestroommate@email.com',
        phone: '7781234567',
      },
    ],
    rent: {
      ...billShape,
      portion: [
        { roommate: [], roommate_amt: 0, amt_type: [] }, // roommate -> react-select?
        // { roommate: [], roommate_amt: 0, amt_type: [] }
      ],
    },
    securityDeposit: {
      ...billShape,
      portion: [
        { roommate: [], roommate_amt: 0, amt_type: [] }, // roommate -> react-select?
        // { roommate: [], roommate_amt: 0, amt_type: [] }
      ],
    },
    bills: [{ ...billShape }],
    // test values for TestDraft.tsx
    textArea1: EditorState.createEmpty(),
    textArea2: EditorState.createEmpty(),

    //values for Housekeeping
    guestPolicy: EditorState.createEmpty(),
    spacesPolicy: EditorState.createEmpty(),
    roomsPolicy: EditorState.createEmpty(),
    choresPolicy: EditorState.createEmpty(),
    vacationPolicy: EditorState.createEmpty(),
    personalItemsPolicy: EditorState.createEmpty(),
    smokingPolicy: EditorState.createEmpty(),
    messagesPolicy: EditorState.createEmpty(),
    petsPolicy: EditorState.createEmpty(),


    status: [],
    leaseDates: {
      startDate: null,
      endDate: null,
    },
    billDate: moment(),
  }),
  handleSubmit: () => {},
  displayName: 'Roommate Agreement Generator',
});

const AgreementForm = ({
  values,
  setFieldValue,
  handleSubmit,
  handleBlur,
}: FormikProps<any>) => {
  return (
    <form onSubmit={handleSubmit}>
      <Switch>
        <Route path="/agreement/title" component={Title} />
        <Route path="/agreement/info" component={Info} />
        <Route path="/agreement/landlord" component={Landlord} />
        <Route path="/agreement/roommates" component={Roommates} />
        <Redirect from="/agreement/bills" to="/agreement/bills/rent" exact />
        <Route path="/agreement/bills/rent">
          <Rent
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
          />
        </Route>
        <Route path="/agreement/bills/deposit">
          <SecurityDeposit
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
          />
        </Route>
        <Route path="/agreement/bills/utilities">
          <BillsUtilities
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
          />
        </Route>
        <Route path="/agreement/housekeeping">
          <Housekeeping
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
          />
        </Route>
        <Route path="/agreement/testDraft">
          <TestDraft
            values={values}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
          />
        </Route>
      </Switch>
    </form>
  );
};

const EnhancedAgreement = formikEnhancer(AgreementForm);

const Agreement = () => {
  return (
    <ul>
      <h1>Roommate Agreement Generator</h1>
      <p>main component! something something something</p>​
      <ul>
        <li>
          <Link to="/agreement/title">About the Agreement</Link>
        </li>
        <li>
          <Link to="/agreement/info">Your Address</Link>
        </li>
        <li>
          <Link to="/agreement/landlord">Landlord Information</Link>
        </li>
        <li>
          <Link to="/agreement/roommates">Roommates</Link>
        </li>
        <li>
          Bills
          {/* <Link to="/agreement/bills">Bills</Link> */}
          <ul>
            <li>
              <Link to="/agreement/bills/rent">Bills: Rent</Link>
            </li>
            <li>
              <Link to="/agreement/bills/deposit">Bills: Security Deposit</Link>
            </li>
            <li>
              <Link to="/agreement/bills/utilities">Bills: Utilities</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/agreement/housekeeping">Housekeeping</Link>
        </li>
        <li>
          <Link to="/agreement/signatures">Signatures</Link>
        </li>
        <li>
          <Link to="/agreement/testDraft">Draft.js example</Link>
        </li>
      </ul>
      <EnhancedAgreement />
    </ul>
  );
};
export default Agreement;
