import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  resetError,
} from '../../redux/authSlice';
import { User } from '../../types/userTypes';
import LoginIcon from '@mui/icons-material/Login';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const {
    userInfo,
    isAuthenticated,
    loading,
    error,
    //  userToken
  } = useSelector((state: RootState) => state.auth);
  const url = 'https://dummyjson.com/auth/login';

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(resetError());
    }
  }, [dispatch, isAuthenticated]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response: AxiosResponse<User> = await axios.post(url, {
        username,
        password,
        expiresInMins: 60,
      });
      const data = response.data;
      dispatch(loginSuccess(data));
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'An error occurred';
        dispatch(loginFailure(errorMessage));
      } else if (error.request) {
        dispatch(loginFailure('Network error, please try again.'));
      } else {
        dispatch(loginFailure('An unknown error occurred.'));
      }
    }
  };

  return (
    <div className="login-container flex flex-col items-center h-screen">
      {!isAuthenticated ? (
        <form
          onSubmit={login}
          className="login-box flex flex-col items-center gap-y-2 mt-24 p-8 w-96 border border-neutral-400"
        >
          <h1 className="text-3xl font-bold ">Log in to TechShop</h1>
          <p>Enter your details below</p>
          <input
            className="w-full h-12 mt-6 p-4 border border-neutral-400"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full h-12 p-4 border border-neutral-400"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-2 text-rose-600">{error}</p>
          <button
            className={`mt-4 py-2 px-4 text-white ${loading ? 'bg-gray-500' : 'bg-black'}`}
          >
            {loading ? (
              'LOGGING IN...'
            ) : (
              <>
                LOGIN <LoginIcon />
              </>
            )}
          </button>
        </form>
      ) : (
        <h1 className="text-3xl mt-8">
          You are currently logged in as <b>{userInfo?.username}!</b>
        </h1>
      )}
    </div>
  );
}

export default Login;
