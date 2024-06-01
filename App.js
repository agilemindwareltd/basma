import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import MainNavigation from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store, {persistor} from './src/redux/store';

// ignore warnings
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
