import React from 'react';
import AppState from './context/background/AppState';
import MainPage from './components/pages/MainPage';

const App = () => {
  return (
    <AppState>
      <MainPage />
    </AppState >

  );
};

export default App;
