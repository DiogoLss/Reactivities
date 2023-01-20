import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetail from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
  <>
    {location.pathname === '/' ? <HomePage/> : (
      <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <Route path='/' exact component={HomePage} />
        <Route path='/activities' component={ActivityDashboard} />
        <Route path='/activity/:id' component={ActivityDetail} />
        <Route path='/createActivities' component={ActivityForm} key='create' />
        <Route path='/manageActivity/:id' component={ActivityForm} key='manage'/>
      </Container>
    </>
    )}
  </>
  ); 
}

export default observer(App);