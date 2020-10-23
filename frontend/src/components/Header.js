import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Pro Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Link as={Link} to='/cart'><i className="fas fa-shopping-cart"></i>Carrinho</Nav.Link>
                        <Nav.Link as={Link} to="/login"><i className="fas fa-user"></i>Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

