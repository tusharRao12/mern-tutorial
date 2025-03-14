import React from 'react'

const ErrorMessage = ({ items }) => {
  return items.length === 0 ? <h1>No Food Items</h1> : null;
};

export default ErrorMessage;