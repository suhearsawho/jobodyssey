import React, { Component } from 'react';
import TopBar from './components/TopBar';
import ErrorMessage from './components/ErrorMessage';

export default function ErrorPage() {
  return (
    <React.Fragment>
      <TopBar />
      <ErrorMessage />
    </React.Fragment>
  )
};
    
