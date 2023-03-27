import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate, NavLink, Route, Routes } from 'react-router-dom';

import Sliders from '../sections/Slider';
import UserContext from '../UserContext';
import ProductCard from '../sections/ProductCard';

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
			<Container fluid className="p-0">
				<Sliders/>
			</Container>
			<Container className="p-3 p-md-5">
				<Row className="p-0 p-md-5">
					{products}
				</Row>
			</Container>
		</>
		:
		<>
		</>
		)
}