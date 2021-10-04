
import React from 'react';
import './App.css';
import Quiz from './components/Quiz/Quiz';
import Layout from './hoc/Layout/Layout';

const App = () => {
  return (
    <Layout>
       <Quiz/>
    </Layout>
  );
};

export default App;
