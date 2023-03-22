import { useState, useEffect } from 'react';
import { usePostLoginMutation, usePostSignUpMutation } from '@/state/api';

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      // resultLogin.data?.response もし Login データがあれば
      // setUsername(username);
      // setPassword(password);
      setUser(username); // this is from App.jsx <Login setUser={setUser} /> props // same as Login = ({ setUser, setSecret }) props
      setSecret(password); // this is from App.jsx <Login setSecret={setSecret} /> props // same as Login = ({ setUser, setSecret }) props
    }
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">
          CHATGPT APP
          {isRegister ? ' SIGN UP' : ' LOGIN'}
        </h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already a user?' : 'Are you a new user?'}
        </p>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {isRegister ? (
            <button
              className="ce-default-button ce-chat-form-button"
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
          ) : (
            <button
              className="ce-default-button ce-chat-form-button"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
