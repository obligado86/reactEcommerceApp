import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Nav, NavDropdown, ListGroup } from 'react-bootstrap';
import { Navigate, useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import AdminProductList from '../sections/AdminProductList'

import UserContext from '../UserContext';

export default function Admin(){
	const {user} = useContext(UserContext);
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);

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



	return(
		/*(!user.isAdmin) ?
			<Navigate to="/error"/>
		:*/
			<Container fluid>
				<Row>
					<Col className="col-4 bg-dark p-2 vh-100" id="admin-menu">
						<ListGroup>
							<ListGroup.Item className="bg-dark text-light"><h3>Admin Dashboard</h3></ListGroup.Item>
							<hr/>
							<ListGroup.Item className="bg-dark text-light">Orders</ListGroup.Item>
							<ListGroup.Item className="bg-dark text-light d-inline-flex">Products<Button className="btn btn-success ml-auto py-1 px-4">add new product</Button></ListGroup.Item>
							<ListGroup.Item className="bg-dark text-light">Analytics</ListGroup.Item>			
							<hr/>
							<ListGroup.Item className="bg-dark text-light">Banners</ListGroup.Item>
							<ListGroup.Item className="bg-dark text-light">HighLights</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col className="col-8 p-2 p-md-5" id="admin-base">
						{products}
					</Col>
				</Row>
			</Container>
	)
}