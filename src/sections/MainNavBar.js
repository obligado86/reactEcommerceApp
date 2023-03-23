import { useContext } from 'react';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate, navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from '../UserContext';
import logo from '../assets/media/icons/banner-logo.jpg'

export default function MainNavbar(){
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	return (
		(!user.isAdmin) ?
		<Navbar className="bg-color1 relative" expand="lg" variant="dark">
			<Container fluid>
				<Navbar.Brand as={ Link } to="/" className="d-none"><h1>Caccah Shopping</h1></Navbar.Brand>
				<img src={logo} id="logo"/>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<Nav.Link as={ NavLink } to="/" className="text-light">Home</Nav.Link>
						<NavDropdown title="Shop By Category" id="navbarScrollingDropdown">
						    <NavDropdown.Item as={NavLink} to="/collection">All Products</NavDropdown.Item>
						    <NavDropdown.Divider />
						</NavDropdown>
					</Nav>
					<Nav className="ml-auto">
						{ (user.id !== null) ?
							<>
								<Nav.Link as={NavLink} to={`${user.id}/mycart`} className="text-light">Cart</Nav.Link>

								<Nav.Link as={NavLink} to="/logout" className="text-light">Logout</Nav.Link>
							</>
							:
							<>
								<Nav.Link as={NavLink} to="/login" className="text-light">Cart</Nav.Link>

								<Nav.Link as={ NavLink } to="/login" className="text-light">Login</Nav.Link>
								<Nav.Link as={ NavLink } to="/signup" className="text-light">Register</Nav.Link>
							</>
						}					
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		:
		<Navbar className="bg-color1 relative" expand="lg" variant="dark">
			<Container fluid>
				<Navbar.Brand as={ Link } to="/" className="d-none"><h1>Caccah Shopping</h1></Navbar.Brand>
				<img src={logo} id="logo"/>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link as={NavLink} to="/admin" className="text-light">Dashboard</Nav.Link>
						<Nav.Link as={NavLink} to="/logout" className="text-light">Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}