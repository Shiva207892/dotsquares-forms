import React from 'react';
import './App.css';
import StepForm from './components/step_form';
import SummaryTable from './components/summary_table';

function App() {
  return (
    <div className="App">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            border: '1px solid',
            borderRadius: '5px',
            maxWidth: '100%',
            maxHeight: '100%',
          }}>
           <StepForm/>
          </div>
    </div>
  );
}

export default App;
