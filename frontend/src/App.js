import React from 'react';
import ScheduleList from './components/ScheduleList';

function App() {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
            <ScheduleList />
        </div>
      </div>
    </div>
  );
}

export default App;
