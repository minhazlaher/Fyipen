import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/Store';
import AppNavigation from './src/navigation/AppNavigation';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
