import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';

const Navbar = () => {
    return (
        <BootstrapNavbar bg="light" expand="lg" className="shadow-sm">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">
                    My Blog
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Главная
                        </Nav.Link>
                        <Nav.Link as={Link} to="/add">
                            Добавить статью
                        </Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;