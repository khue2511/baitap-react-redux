import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-20 h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 underline hover:text-sky-700">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
