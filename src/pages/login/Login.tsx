import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';

interface UserInfo {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const url = 'https://dummyjson.com/auth/login';

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: AxiosResponse<UserInfo> = await axios.post(url, {
        username,
        password,
        expiresInMins: 60,
      });
      const data = response.data;
      console.log('User info:', data);
      console.log(data.accessToken);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="login-container flex flex-col items-center h-screen">
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
        <button className="bg-black text-white mt-4 py-2 px-4">LOG IN</button>
      </form>
    </div>
  );
}

export default Login;