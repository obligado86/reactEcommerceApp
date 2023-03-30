import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate, NavLink, Route, Routes } from 'react-router-dom';

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
			<Container fluid className="p-0 min-vh-100">
				<Sliders/>
				<Row className="p-5 justify-content-between">
					<h2 className="header-text">Shop By Category:</h2>
					<Col className="col-4 px-2">
						<img className="img-fluid" src={Banner1}/>
						<h2 className="header-text text-light banner py-2">Computers</h2>
						<h3 as={NavLink} to="/collection" className="admin-nav body-text banner">See more ></h3>
					</Col>
					<Col className="col-4 px-2">
						<img className="img-fluid" src={Banner3}/>
						<h2 className="header-text text-light banner py-2">Accessories</h2>
						<h3 as={NavLink} to="/collection" className="admin-nav body-text banner">See more ></h3>
					</Col>
					<Col className="col-4 px-2">
						<img className="img-fluid" src={Banner2}/>
						<h2 className="header-text text-light banner py-2">Smart Home</h2>
						<h3 as={NavLink} to="/collection" className="admin-nav body-text banner">See more ></h3>
					</Col>
				</Row>
			</Container>
			<Container className="">
				<Row>{products}</Row>
			</Container>
		</>
		:
		<>
		</>
		)
}