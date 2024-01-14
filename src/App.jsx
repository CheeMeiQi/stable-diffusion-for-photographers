import React, { Component } from 'react';
import { useState, useEffect } from "react";
import NavigationBar from './components/NavigationBar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";


const App = () => {

  return (
    <ChakraProvider>
      <Router>
        <NavigationBar/>
      </Router>  
    </ChakraProvider>
  );

}

export default App;