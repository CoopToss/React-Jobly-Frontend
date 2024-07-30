import React from 'react';
const Home = ({ currentUser }) => {
    return (
      <div>
        {currentUser ? (
          <h1> Welcome back, {currentUser.username}! </h1>
        ) : (
          <h1> Welcome to Jobly! </h1>
        )}
      </div>
    );
};

export default Home;