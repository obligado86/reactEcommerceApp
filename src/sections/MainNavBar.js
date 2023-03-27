import { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown, ListGroup, Button, Col, Row } from "react-bootstrap";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cart from './Cart'
import Swal from 'sweetalert2'
import UserContext from '../UserContext';
import OrderContext from '../OrderContext';
import logo from '../assets/media/icons/banner-logo.jpg'

import AdminAddProduct from './AdminAddProduct'
import AdminProductList from './AdminProductList'
import AdminViewOrders from './AdminViewOrders'

export default function MainNavbar(){
	const { user } = useContext(UserContext);
	const {order} = useContext(OrderContext)
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [products, setProducts] = useState([]);
	const [isActive, setIsActive] = useState(false)
	const [viewOrders, setViewOrders] = useState(false)
	const [orders, setOrders] = useState([])

	const [items, setItems] = useState('');

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

  	useEffect(() => {
  		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/mycart`)
  		.then(res => res.json()).then(data => {
  			setItems(data.map(item => {
  				return (
  					<Cart key={item} item={item} />
  				)
  			}))
  		})
  	}, [])

  	

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/collection`)
		.then(res => res.json()).then(data => {
			setProducts(data.map(product => {
				return(
					<AdminProductList key={product.id} product={product}/>
				)
			}))
		})
	}, [])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/admin/orders`)
		.then(res => res.json()).then(data => {
			console.log(data)
			setOrders([data].map(order => {
				return (
					<AdminViewOrders key={order.id} order={order} />
				)
			}))
		})
	}, [])


	function addProduct(){
		setIsActive(true)
	}

	function viewOrder(){
		setViewOrders(true)
	}

	function viewProduct(){
		setIsActive(false)
		setViewOrders(false)
	}

	return (	
		(user.isAdmin !== true) ?
		<>
		<Navbar className="bg-color1 justify-content-between" expand="md" variant="dark">
			<Container fluid>
				<Navbar.Brand as={ Link } to="/" className="d-none"><h1>Caccah Shopping</h1></Navbar.Brand>
				<img src={logo} id="logo"/>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<Nav.Link as={ NavLink } to="/" className="body-text menu-nav text-light">Home</Nav.Link>
						<NavDropdown title="Shop By Category" id="navbarScrollingDropdown" className="body-text menu-nav">
						    <NavDropdown.Item as={NavLink} to="/collection" className="mega-menu">All Products</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection">Laptop</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection">Destop</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection">Mobile Phones</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection">Tablet</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection">Accessories</NavDropdown.Item>
						    <NavDropdown.Divider />
						</NavDropdown>
					</Nav>
					<Nav className="ml-auto mt-4 mt-md-0">
						{ (user.id !== null) ?
							<>
								<NavLink data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" className="body-text menu-nav text-light mx-2"><h1 className="text-light fa fa-shopping-cart hover-trigger nav-icon"></h1><p id="show-hover"> My Cart</p></NavLink>
								<NavLink  as={NavLink} to={`/${user.id}/profile`} className="body-text menu-nav text-light mx-2"><h1 className="text-light fa fa-user-circle hover-trigger nav-icon"></h1><p id="show-hover"> Profile</p></NavLink>
								<NavLink as={NavLink} to="/" className="body-text menu-nav text-light mx-2"><h1 className="text-light fa fa-bell hover-trigger nav-icon"></h1><p id="show-hover"> Notification</p></NavLink>

								<NavLink as={NavLink} to="/logout" className="body-text menu-nav text-light mx-5">Logout</NavLink>
							</>
							:
							<>
								<NavLink as={NavLink} to="/login" className="header-text menu-nav text-light mx-2"><h1 className="text-light fa fa-shopping-cart hover-trigger nav-icon"></h1><p id="show-hover"> My Cart</p></NavLink>
								<NavLink as={NavLink} to="/login" className="header-text menu-nav text-light mx-2"><h1 className="text-light fa fa-user-circle hover-trigger nav-icon"></h1><p id="show-hover"> Profile</p></NavLink>
								<NavLink as={NavLink} to="/" className="header-text menu-nav text-light mx-2"><h1 className="text-light fa fa fa-bell hover-trigger nav-icon"></h1><p id="show-hover"> Notification</p></NavLink>
								<Nav className="mx-5">
									<NavLink as={ NavLink } to="/login" className="body-text menu-nav text-light mr-1 mx-2">Login</NavLink>
									<NavLink as={ NavLink } to="/signup" className="body-text menu-nav text-light mx-2">Register</NavLink>
								</Nav>
							</>
						}					
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
		  	<div class="offcanvas-header">
		   		<h5 id="offcanvasRightLabel">My Cart</h5>
		    	<button type="button" class="btn-close text-reset del-btn" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		  	</div>
		  	<div class="offcanvas-body" id='cart'>
		   		{items}
		  	</div>
		  	<Button as={NavLink} to={`/${user.id}/checkout`} className="btn btn-warning w-100 logout-admin mx-2 mb-2">Proceed Checkout</Button>
		</div>
		</>
	:
		<>
		<Navbar className="bg-color1" expand="md" variant="dark">
			<Container fluid>
				<Navbar.Brand as={ Link } to="/" className="d-none"><h1>Caccah Shopping</h1></Navbar.Brand>
				<img src={logo} id="logo"/>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto d-md-none">
						<Nav.Link onClick={viewOrders} className="text-light">Orders</Nav.Link>
						<NavDropdown title="Manage Products" id="navbarScrollingDropdown">
						    <NavDropdown.Item onClick={viewProduct}>Products</NavDropdown.Item>
						    <NavDropdown.Item onClick={addProduct}>Add Products</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link as={ NavLink } to="/" className="text-light">Analytics</Nav.Link>
						<Nav.Link as={ NavLink } to="/" className="text-light mt-2">Banners</Nav.Link>
						<Nav.Link as={ NavLink } to="/" className="text-light">HighLights</Nav.Link>
						<Nav.Link as={ NavLink } to="/logout" className="text-light mt-2">Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<Container fluid>
			<Row>
				<Col className="col-12 col-md-4 d-none d-md-block bg-dark p-2 card-height" id="admin-menu">
					<ListGroup className="card-height py-3">
						<ListGroup.Item className="bg-dark text-light"><h3 className="header-text">Admin Dashboard</h3></ListGroup.Item>
						<hr/>
						<ListGroup.Item onClick={viewOrder} className="bg-dark text-light"><h4 className="body-text admin-nav">Orders</h4></ListGroup.Item>
						<ListGroup.Item className="bg-dark text-light d-sm-inline-flex justify-content-between">
							<h4 onClick={viewProduct} className="admin-nav body-text">Products</h4>
							<h4 onClick={addProduct} className="ml-auto admin-nav hover-trigger">+ <span id="show-hover" className="body-text">Add New</span>
							</h4>
						</ListGroup.Item>
						<ListGroup.Item className="bg-dark text-light"><h4 className="body-text admin-nav">Analytics</h4></ListGroup.Item>			
						<hr/>
						<ListGroup.Item className="bg-dark text-light"><h4 className="body-text admin-nav">View Site</h4></ListGroup.Item>
						<ListGroup.Item className="bg-dark text-light"><h4 className="admin-nav body-text">Banners</h4></ListGroup.Item>
						<ListGroup.Item className="bg-dark text-light"><h4 className="admin-nav body-text">HighLights</h4></ListGroup.Item>
						<Link to="/logout" className="btn btn-light mt-auto mb-1 mx-2">Logout</Link>
					</ListGroup>
					</Col>
				{ viewOrders ?
					<Col className="col-12 col-md-8 p-2 p-md-5" id="admin-base">
						<AdminViewOrders/>
					</Col>
					:
					<Col className="col-12 col-md-8 p-2 p-md-5" id="admin-base">
				
						{ isActive ?
							<Container className="py-5">
								<AdminAddProduct/>
							</Container>
						:
							<Container className="py-5">
								{products}
							</Container>
				
						}
					</Col>
				}
			</Row>
		</Container>
		</>
	)
}