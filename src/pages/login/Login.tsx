import React from 'react';

function Login() {
  return (
    <div className="login-container flex flex-col items-center h-screen">
      <form className="login-box flex flex-col items-center gap-y-2 mt-24 p-8 w-96 border border-neutral-400">
        <h1 className="text-3xl font-bold ">Log in to TechShop</h1>
        <p>Enter your details below</p>
        <input
          className="w-full h-12 mt-6 p-4 border border-neutral-400"
          placeholder="Email or Phone Number"
        />
        <input
          className="w-full h-12 p-4 border border-neutral-400"
          placeholder="Password"
        />
        <button className='bg-black text-white mt-4 py-2 px-4'>LOG IN</button>
      </form>
    </div>
  );
}

export default Login;
