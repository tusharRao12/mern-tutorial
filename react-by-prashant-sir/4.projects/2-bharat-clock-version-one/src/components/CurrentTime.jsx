import React from 'react';

let time = new Date();

const CurrentTime = () => {
  return (
    <p className="lead">
      This is the current time: {time.toLocaleDateString()} - {time.toLocaleTimeString()}
    </p>
  );
}

export default CurrentTime;
