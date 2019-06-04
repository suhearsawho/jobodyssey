import React, { Component } from 'react';
import TopBar from './components/TopBar';
import ErrorMessage from './components/ErrorMessage';

function Error() {
  return (
    <div>
      <TopBar color={ true } />
      <ErrorMessage />
    </div>
  )
};

export default Error;
    
