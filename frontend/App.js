import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import JoblyApi from './api';
import Home from './components/Home';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import JobList from './components/JobList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage('jobly-token', '');

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        JoblyApi.token = token;
        try {
          let currentUser = await JoblyApi.getCurrentUser();
          setCurrentUser(currentUser);
        } catch (error) {
          console.error('Error getting user:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    getUser();
  }, [token]);

  const login = async (data) => {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const signup = async (data) => {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const logout = () => {
    setToken('');
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route 
      {...rest} 
      render={props => (
        currentUser 
          ? <Component {...props} /> 
          : <Redirect to="/login" />
      )} 
    />
  );

  return (
    <Router>
      <div>
        <NavBar currentUser={currentUser} logout={logout} />
        <Switch>
          <Route exact path="/" render={() => <Home currentUser={currentUser} />} />
          <Route exact path="/login" render={() => <LoginForm login={login} />} />
          <Route exact path="/signup" render={() => <SignupForm signup={signup} />} />
          <ProtectedRoute exact path="/companies" component={CompanyList} />
          <ProtectedRoute path="/companies/:handle" component={CompanyDetail} />
          <ProtectedRoute path="/jobs" component={JobList} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
