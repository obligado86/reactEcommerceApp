import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import Sliders from '../components/Slider';
import UserContext from '../UserContext';
import ProductCard from '../components/ProductCard';
import Banner1 from '../assets/media/Sliders/Untitled_design_6.png'
import Banner2 from '../assets/media/Sliders/Untitled_design_7.png'
import Banner3 from '../assets/media/Sliders/Untitled_design_8.png'

export default function Home() {
	const {user} = useContext(UserContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/collection`)
		.then(res => res.json()).then(data => {
			setProducts(data.map(product => {
				return (
					<ProductCard key={product.id} product={product}/> 
				)
			}))
		})
	}, []);

	return (
		(user.isAdmin !== true) ?
		<>
			<Container fluid className="p-0 min-vh-100 mb-5">
				<Sliders/>
				<Row className="px-4 justify-content-center justify-content-md-between">
					<h2 className="header-text">Shop By Category:</h2>
					<Col className="col-12 col-md-4 px-md-2">
						<img className="img-fluid" src={Banner1}/>
						<h2 className="header-text text-light banner py-2">Computers</h2>
						<Link as={NavLink} to="/collection/Laptop" className="admin-nav body-text banner">See more ></Link>
					</Col>
					<Col className="col-12 col-md-4 px-md-2">
						<img className="img-fluid" src={Banner3}/>
						<h2 className="header-text text-light banner py-2">Accessories</h2>
						<Link as={NavLink} to="/collection/Accessories" className="admin-nav body-text banner">See more ></Link>
					</Col>
					<Col className="col-12 col-md-4 px-md-2">
						<img className="img-fluid" src={Banner2}/>
						<h2 className="header-text text-light banner py-2">Smart Home</h2>
						<Link as={NavLink} to="/collection/SmartHome" className="admin-nav body-text banner">See more ></Link>
					</Col>
				</Row>
				<h1 className="mx-4">All Products:</h1>
				<Row className="col-12 col-md-10 mx-auto">{products}</Row>
			</Container>
		</>
		:
		<>

		</>
		)
}