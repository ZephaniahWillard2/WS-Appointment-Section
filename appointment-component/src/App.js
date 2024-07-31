import React, { useState } from 'react';
import ApptItem from './Components/ApptItem';
import CopyText from './Components/CopyText';
import './App.css';

const App =()=> {
  const [sessions, setSessions] = useState([]);

  const saveNewSession = (projectName) => {
    if (!projectName.trim()) {
      console.error('Project name cannot be empty');
      return;
    }

    // Create new session object
    const newSession = {
      id: sessions.length + 1, 
      name: projectName,
      hidePublic: false,
      order: sessions.length,
    };

    // Update state with the new session
    setSessions([...sessions, newSession]);
    console.log('New session added:', newSession);
  };

  return (
    <div className='newApptItemCode'>   
    <ApptItem.Appointments
      id="1"
      data={sessions}
      saveNewSession={saveNewSession}
      togglePopup={() => {}}
      saveOrdering={() => {}}
      tenantNameAsUrl="example"
      title="Appointments"
      refreshTenantData={() => {}}
      tenantData={{}}
      setTenantData={() => {}}
      isGroupClass={false}
    />
    </div>
  );
};

export default App;
