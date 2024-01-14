import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes, NavLink } from 'react-router-dom';
import Txt2Img from './Txt2Img';
import ModelTraining from './ModelTraining';
import Home from './Home';
import { ChakraProvider } from "@chakra-ui/react";
import './NavigationBar.css'

class NavigationBar extends Component {
    render() {
        return (
            <ChakraProvider>
                    <Navbar bg="dark" data-bs-theme="dark">
                            <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
                            Stable Diffusion for Photographers</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} to="/txt2img" className="navbar-route">Text-to-Image Generation</Nav.Link>
                                <Nav.Link as={NavLink} to="/modelTraining" className='navbar-route'>Train a Model</Nav.Link>
                            </Nav>
                    </Navbar>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/txt2img" element={<Txt2Img />} />
                        <Route path="/modelTraining" element={<ModelTraining />} />
                    </Routes>
            </ChakraProvider>
        );
    }
}

export default NavigationBar;