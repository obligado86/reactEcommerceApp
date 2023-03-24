import { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown, ListGroup, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cart from './Cart'
import Swal from 'sweetalert2'
import UserContext from '../UserContext';
import logo from '../assets/media/icons/banner-logo.jpg'

export default function MainNavbar(){
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const [items, setItems] = useState('');

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

  	/*useEffect(() => {
  		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/mycart`)
  		.then(res => res.json()).then(data => {
  			setItems(data.map(item => {
  				return (

  				)
  			}))
  		})
  	})*/

  	

	return (	
	(user.isAdmin !== true) ?
		<>
		<Navbar className="bg-color1 justify-content-between" expand="lg" variant="dark">
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
								<NavLink data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" className="body-text menu-nav text-light mx-2">My Cart</NavLink>

								<NavLink as={NavLink} to="/logout" className="body-text menu-nav text-light mx-2">Logout</NavLink>
							</>
							:
							<>
								<NavLink as={NavLink} to="/login" className="body-text menu-nav text-light mx-2">Cart</NavLink>

								<NavLink as={ NavLink } to="/login" className="body-text menu-nav text-light mx-2">Login</NavLink>
								<NavLink as={ NavLink } to="/signup" className="body-text menu-nav text-light mx-2">Register</NavLink>
							</>
						}					
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
		  	<div class="offcanvas-header">
		   		<h5 id="offcanvasRightLabel">My Cart</h5>
		    	<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		  	</div>
		  	<div class="offcanvas-body" id='cart'>
		   		
		  	</div>
		</div>
		</>
		:
		<Navbar className="bg-color1 justify-content-between" expand="lg" variant="dark">
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