import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import {
  ThemeProvider,
  CSSReset,
  theme,
  Grid,
  Box,
  Divider,
} from '@chakra-ui/core';

import { displayFullName } from './helpers/functions';
import { AppContext, AppProvider } from './Store';

import AppLoading from './components/AppLoading';
import AppHeader from './components/AppHeader';
import MainMenu from './components/MainMenu';

import Home from './pages/Home';
import Test from './pages/Test';
import Agreement from './pages/Agreement';
import Account from './pages/Account';
import AgreementMenu from './components/AgreementForm/AgreementMenu';
import Household from './pages/Household';
import Resources from './pages/Resources';
import Housekeeping from './pages/Housekeeping';
import Bills from './pages/Bills';

// test data
// const currUser = {
//   id: '1',
//   first_name: 'Tracy',
//   last_name: 'Barrows',
//   phone_number: '448-504-4347',
//   email: 'test@test.com',
//   password: 'testing',
//   household: '951bfa7e-d0e1-414d-9327-5e8c4bc8c56b',
// };

const AppContent = () => {
  const {
    state,
    updateState,
  }: { state: any; updateState: Function } = useContext(AppContext);
  const { pathname: currentPath } = useLocation();
  const isAgreementForm = currentPath.startsWith('/agreement');
  useEffect(() => {
    const getUserData = () => {
      axios.get('/api/users/1').then(user => {
        updateState({
          currUser: user.data,
          fullName: displayFullName(user.data.first_name, user.data.last_name),
        });
      });
    };
    getUserData();
  }, [updateState]);

  if (state && state.currUser) {
    return (
      <Box className="App" w="100%">
        <AppHeader {...state} />

        <Grid templateColumns="1fr 4fr" gap={1} p={5} className="container">
          {isAgreementForm ? <AgreementMenu /> : <MainMenu />}

          <Box as="main" bg="gray.50" pr={10} pl={10} rounded={10}>
            {isAgreementForm ? (
              // Agreement Form
              <Switch>
                <Route path="/agreement" component={Agreement} />
              </Switch>
            ) : (
              // Main App Contents
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/test" component={Test} />
                <Route path="/household" component={Household} />
                <Route path="/bills" component={Bills} />
                <Route path="/account" component={Housekeeping} />
                <Route path="/resources" component={Resources} />
                <Route path="/account" component={Account} />
              </Switch>
            )}
          </Box>
        </Grid>
      </Box>
    );
  } else {
    return <AppLoading />;
  }
};

// what renders on index
const App = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
