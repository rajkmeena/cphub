import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./login.css";

  
function Main() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
    setLoggedIn(true);
  };

  const handleLoginFailure = (error) => {
    if (error.error === 'popup_closed_by_user') {
      // Handle popup closed by user
      console.log('Login canceled by user');
    } else {
      // Handle other login failures
      console.log('Login failed:', error);
    }
  };

  const handleLogoutSuccess = () => {
    console.log('Logged out');
    setLoggedIn(false);
  };

  return (
    <div className='login'>
      <h1>Login Page</h1>
      {!isLoggedIn ? (
        <GoogleLogin
          clientId="193142643696-fbn7ej91ian8qkfktjeet078mis1uecn.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      ) : (
        <div>
          <p>You are logged in!</p>
          <GoogleLogout
            clientId="193142643696-fbn7ej91ian8qkfktjeet078mis1uecn.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={handleLogoutSuccess}
          />
        </div>
      )}
    </div>
  );
}
export default Main;