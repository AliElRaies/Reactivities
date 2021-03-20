import React, { Fragment, useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectActivity(undefined);
  }

  function handleOpenForm(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleCloseForm(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
     : setActivities([...activities, {...activity, id: uuid()}]);
     setEditMode(false);
     setSelectActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <Fragment> {/* an empty <> is equals to Fragment */}
      <NavBar openForm={handleOpenForm} />
      <Container style={{marginTop: '5em'}}>
        <ActivityDashboard
         activities={activities}
         selectedActivity={selectedActivity}
         selectActivity={handleSelectActivity}
         cancelSelectActivity={handleCancelSelectActivity}
         editMode={editMode}
         openForm={handleOpenForm}
         closeForm={handleCloseForm}
         createOrEdit={handleCreateOrEditActivity}
         deleteActivity={handleDeleteActivity}
       />
      </Container>
    </Fragment>
  );
}

export default App;
