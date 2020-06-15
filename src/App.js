import React from 'react';
import css from './App.css'

import { withRouter, Switch, BrowserRouter, Route, useHistory, Redirect} from 'react-router-dom';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import PasswordReset from './components/Auth/reset-password';
import Sidebar from './Sidebar/sidebar';
import Encounter from './components/Content/encounter';
import Prescription from './components/Content/prescription';
import Verify from './components/Content/verify';
import AuthGuard from './components/Auth/AuthGuard';
import EncounterHistory from './components/Content/history';
import Home from './components/Home/Home';
import LaboratoryRequest from './components/Content/Laboratory/LaboratoryRequest';
import LaboratoryResult from './components/Content/Laboratory/LaboratoryResult';
import RadiologyRequest from './components/Content/Radiology/RadiologyRequest';
import RadiologyResult from './components/Content/Radiology/RadiologyResult';
import Outlets from './components/Content/outlets';
import { AppProvider } from './components/AppContext/AppContext';
import LaboratoryResultView from './components/Content/Laboratory/LaboratoryResultView';
import PrintModal from './components/Content/reusables/print-modal';


  const Main = withRouter(({ location }) => {
  
    return (
      <>  
       {(location.pathname != '/login' && location.pathname != '/signup' && location.pathname != '/' && location.pathname != '/reset-password') && (	
        <>	
          <Sidebar/>	
        </>	
      )}
      <Switch>       
          <Route path="/" exact component={Home} />    
          <AuthGuard path="/encounter"  component={Encounter} />    
          <AuthGuard exact path="/history"  component={EncounterHistory} /> 
         
          <AuthGuard exact path="/prescription"  component={Prescription} />    
          <AuthGuard exact path="/lab-requests"  component={LaboratoryRequest} />    
          <AuthGuard exact path="/lab-results"  component={LaboratoryResult} />    
          <AuthGuard exact path="/lab-result-feedback"  component={LaboratoryResultView} />    
          <AuthGuard exact path="/radiology-results"  component={RadiologyResult} />    
          <AuthGuard exact path="/radiology-requests"  component={RadiologyRequest} />    
          <AuthGuard exact path="/outlets"  component={Outlets} />    
          <AuthGuard path="/verify-code" component={Verify} />    
          <Route path="/login" component={Login} />    
          <Route path="/signup" component={Signup} />
          <Route path="/reset-password" component={PasswordReset} />
         
       
      </Switch>
      <PrintModal />
      </>
    )
      
     
   
})
function App() {
  
  return (  
    <AppProvider>
      <BrowserRouter >
      <Main />
    </BrowserRouter>
  </AppProvider>

  );
}

export default App;
