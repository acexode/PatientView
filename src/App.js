import React from 'react';
import css from './App.css'

import { withRouter, Switch, BrowserRouter, Route} from 'react-router-dom';
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

const Main = withRouter(({ location }) => {
    return (
      <>  
       {(location.pathname != '/login' && location.pathname != '/signup' && location.pathname != '/') && (	
        <>	
          <Sidebar/>	
        </>	
      )}
      <Switch>       
          <AuthGuard path="/" exact component={Home} />    
          <AuthGuard path="/encounter"  component={Encounter} />    
          <AuthGuard exact path="/history"  component={EncounterHistory} />    
          <AuthGuard exact path="/prescription"  component={Prescription} />    
          <AuthGuard path="/verify-code" component={Verify} />    
          <Route path="/login" component={Login} />    
          <Route path="/signup" component={Signup} />
          <Route path="/reset-password" component={PasswordReset} />
         
       
      </Switch>
      </>
    )
      
     
   
})
function App() {
  
  return (  
    <div>
      <BrowserRouter>
      <Main />
    </BrowserRouter>
  </div>

  );
}

export default App;
