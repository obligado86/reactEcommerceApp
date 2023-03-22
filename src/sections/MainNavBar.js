import { useContext } from 'react';

import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';
import logo from '../assets/media/icons/banner-logo.jpg'

export default function MainNavbar(){
	const { user } = useContext(UserContext);

	return (
		<Navbar className="bg-color1" expand="lg" variant="dark">
			<Container fluid>
				<Navbar.Brand as={ Link } to="/" className="d-none"><h1>Caccah Shopping</h1></Navbar.Brand>
				<img src={logo} id="logo"/>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link as={ NavLink } to="/" className="text-light">Home</Nav.Link>
						<NavDropdown title="Shop By Category" id="navbarScrollingDropdown">
						    <NavDropdown.Item href={"/collection"}>All Products</NavDropdown.Item>
						    <NavDropdown.Divider />
						</NavDropdown>
						{ (user.id !== null) ?
							<Nav.Link as={ Nav.Link } to="/logout" className="text-light">Logout</Nav.Link>
							:
							<>
								<Nav.Link as={ NavLink } to="/login" className="text-light">Login</Nav.Link>
								<Nav.Link as={ NavLink } to="/signup" className="text-light">Register</Nav.Link>
							</>
						}					
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}