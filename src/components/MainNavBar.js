import { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown, ListGroup, Button, Col, Row, Form } from "react-bootstrap";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cart from './Cart'
import Swal from 'sweetalert2'
import axios from 'axios';
import {useQuery} from '@tanstack/react-query'
import UserContext from '../UserContext';
import OrderContext from '../OrderContext';
import logo from '../assets/media/icons/banner-logo.jpg'

import AdminAddProduct from './AdminAddProduct'
import AdminProductList from './AdminProductList'
import AdminViewOrders from './AdminViewOrders'
import UserViewOrders from '../components/UserViewOrders'

export default function MainNavbar(){
	const { user } = useContext(UserContext);
	const {order} = useContext(OrderContext)
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('')

	const [archive, setArchive] = useState([]);
	const [isActive, setIsActive] = useState(false)
	const [isArchive, setIsArchive] = useState(false)
	const [viewOrders, setViewOrders] = useState(false)
	const [orders, setOrders] = useState([])

	const [items, setItems] = useState('');
	const [itemCount, setItemCount] = useState('')

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
  	const showArchive = () => setIsArchive(true);
  	const showList = () => setIsArchive(false);

  	useEffect(() => {
  		if(user.id !== null && !user.isAdmin){
  			fetch(`${process.env.REACT_APP_API_URL}/${user.id}/mycart`)
  			.then(res => res.json()).then(data => {
  				//console.log(data)
  				setItemCount(data.length)
  				setItems(data.map(item => {
  					return (
  						<Cart key={item.id} item={item} />
  					)
  				}))
  			})
  		}
  	},)


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
		fetch(`${process.env.REACT_APP_API_URL}/archived`)
		.then(res => res.json()).then(data => {
			setArchive(data.map(product => {
				return(
					<AdminProductList key={product.id} product={product}/>
				)
			}))
		})
	}, [])

	const getOrders = (status) => {
		fetch(`${process.env.REACT_APP_API_URL}/admin/order/${status}`)
		.then(res => res.json()).then(data => {
			setOrders(data.map(order => {
				return (
					<AdminViewOrders key={order} order={order}/>
				)
			}))
		}).catch(err => {
			console.log(err)
		})
	};

	function sreachItem(e){
		e.preventDefault();
		navigate(`/collection/${search}`)
	}

	function addProduct(){
		setIsActive(true)
	}

	function viewOrder(){
		setViewOrders(true)
	}

	function viewProduct(){
		setIsActive(false)
		setViewOrders(false)
		fetch(`${process.env.REACT_APP_API_URL}/collection`)
	}

	return (	
		(user.isAdmin !== true) ?
		<>
		<Navbar className="bg-color1 justify-content-between" expand="md" variant="dark">
			<Container fluid>
				<Navbar.Brand as={ Link } to="/" className="d-none"><h1>Caccah Shopping</h1></Navbar.Brand>
				<img src={logo} id="logo"/>
				<Form className="d-flex form-inline" onSubmit={(e) => sreachItem(e)}>
					<Form.Control
						type="search"
						placeholder="Search"
						className="input-group col-5 bg-warning text-light"
						aria-label="Search"
						value={ search }
						onChange={e => setSearch(e.target.value)}
						/>
					<Button type="submit" variant="outline-light" className="input-group fa fa-search py-2"></Button>
				</Form>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<Nav.Link as={ NavLink } to="/" className="body-text menu-nav text-light">Home</Nav.Link>
						<NavDropdown title="Shop By Category" id="navbarScrollingDropdown" className="body-text menu-nav">
						    <NavDropdown.Item as={NavLink} to="/collection/allproducts" className="mega-menu">All Products</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection/Laptop">Laptop</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection/Desktop">Desktop</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection/Phone">Mobile Phones</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection/Tablet">Tablet</NavDropdown.Item>
						    <NavDropdown.Item as={NavLink} to="/collection/Accessories">Accessories</NavDropdown.Item>
						    <NavDropdown.Divider />
						</NavDropdown>
					</Nav>
					<Nav className="ml-auto mt-4 mt-md-0">
						{ (user.id !== null) ?
							<>
								<NavLink data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" className="body-text menu-nav text-light mx-2">
									<span class="position-relative top-0 start-100 translate-middle badge rounded-pill bg-danger">
									    {itemCount}
									    <span class="visually-hidden">Cart items</span>
									</span>
									<h1 className="text-light fa fa-shopping-cart hover-trigger nav-icon"></h1>
									<p id="show-hover"> My Cart</p>
								</NavLink>
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
				<Col className="col-12 col-md-4 d-none d-md-block bg-dark p-2 card-height min-vh-100" id="admin-menu">
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
						<Button onClick={() => getOrders("pending")} className="w-25 btn btn-light inlarge-hover" active>Pending</Button>
						<Button onClick={() => getOrders("processsing")} className="w-25 btn btn-light inlarge-hover">For Shipping</Button>
						<Button onClick={() => getOrders("delivered")} className="w-25 btn btn-light inlarge-hover">Delivered</Button>
						<Button onClick={() => getOrders("forcancelation")} className="w-25 btn btn-light inlarge-hover">Cancel request</Button>
						<div className="mt-3">
							{orders}
						</div>
					</Col>
					:
					<Col className="col-12 col-md-8 p-2 p-md-5" id="admin-base">
				
						{ isActive ?
							<Container className="py-5">
								<AdminAddProduct/>
							</Container>
						:

							<Container className="py-5">
								<Button onClick={showList} className="btn btn-success w-50">Active List</Button>
								<Button onClick={showArchive} className="btn btn-danger w-50">Archived List</Button>
								{ isArchive ?
								<>
									{archive}
								</>
								:
								<>
									{products}
								</>
								}
							</Container>
				
						}
					</Col>
				}
			</Row>
		</Container>
		</>
	)
}