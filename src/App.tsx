import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { fetchAccessToken, refreshAccessToken } from './RedirectUri';

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    /*
      currently clearing tokens when app opens so that user is always redirected to login.
      this is for the purpose of take home exercise only
      see related TODOs below
    */
    // TODO: add logout functionality
    // TODO: refactor credential storage and refresh to persist login sessions
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchAccessToken(code)
      .then((accessToken) => {
        if (accessToken) {
          setToken(accessToken);
          localStorage.setItem('access_token', accessToken);  // Save access token to local storage
          //window.history.pushState({}, '', window.location.pathname);
        }
        setLoading(false);
      })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh_token');
  
    if (!token && refreshToken) {
      refreshAccessToken(refreshToken)
        .then(setToken)
        .catch(console.error);
    }
  }, [token]);

  if (loading) {
    //TODO: update loading UI
    return <div>Loading...</div>
  } else {
    return (
      <div className="App">
        {token ? <MainPage token={token}/> : <LoginPage /> }
      </div>
    )
  }
}

export default App
