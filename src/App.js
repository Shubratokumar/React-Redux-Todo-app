import React from 'react';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
      position="top-right"
        toastOptions={{
          style: {
            fontSize:"1.5rem"
          }
        }}
      />
    <div className="container">
      <PageTitle>Daily Tasks</PageTitle>
      <div className={styles.app__wrapper}>
        <AppHeader></AppHeader>
        <AppContent></AppContent>
      </div>
    </div>
    </>
  );
}

export default App;
