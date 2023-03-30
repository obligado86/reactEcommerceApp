import {useEffect, useState} from 'react';
import ProductCard from '../components/ProductCard';
import {Container, Row} from 'react-bootstrap';

export default function Products(){
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
		<Container className="px-1 px-md-5 py-5">
			<Row>
				{products}
			</Row>
		</Container>
	)
}