import {useEffect, useState} from 'react';
import ProductCard from '../sections/ProductCard';


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
		<>
			{products}
		</>
	)
}