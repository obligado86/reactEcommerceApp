import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Nav, NavDropdown, ListGroup } from 'react-bootstrap';
import { Navigate, useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2'

import AdminProductList from '../sections/AdminProductList'
import AdminAddProduct from '../sections/AdminAddProduct'

import UserContext from '../UserContext';

export default function Admin(){
	const {user} = useContext(UserContext);
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [isActive, setIsActive] = useState(false)

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


	function addProduct(){
		setIsActive(true)
	}

	function viewProduct(){
		setIsActive(false)
	}

	return(
		(user.isAdmin === true && user.id !== null) ?
			<Container fluid>
				<Row>
					<Col className="col-4 bg-dark p-2 card-height" id="admin-menu">
						<ListGroup>
							<ListGroup.Item className="bg-dark text-light"><h3 className="header-text">Admin Dashboard</h3></ListGroup.Item>
							<hr/>
							<ListGroup.Item className="bg-dark text-light admin-nav"><h4 className="body-text">Orders</h4></ListGroup.Item>
							<ListGroup.Item className="bg-dark text-light d-inline-flex justify-content-between">
								<h4 onClick={viewProduct} className="admin-nav body-text">Products</h4>
								<Button onClick={addProduct} className="btn btn-success ml-auto py-0 px-4 body-text">add new product
								</Button>
							</ListGroup.Item>
							<ListGroup.Item className="bg-dark text-light admin-nav"><h4 className="body-text">Analytics</h4></ListGroup.Item>			
							<hr/>
							<ListGroup.Item className="bg-dark text-light admin-nav"><h4 className="body-text">Banners</h4></ListGroup.Item>
							<ListGroup.Item className="bg-dark text-light admin-nav"><h4 className="body-text">HighLights</h4></ListGroup.Item>
						</ListGroup>
					</Col>
					<Col className="col-8 p-2 p-md-5" id="admin-base">
						{ isActive ?
							<AdminAddProduct/>
							:
							<>
							{products}
							</>
						}
					</Col>
				</Row>
			</Container>
		:
			<Navigate to="/error"/>
	)
}