import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import ProductCard from '../components/ProductCard';
import {Container, Row} from 'react-bootstrap';

export default function Products(){
	const {categoryName} = useParams()
	const [products, setProducts] = useState([]);
	const [displayCategory, setDisplayCategory] = useState('')

	useEffect(() => {
		if(categoryName === "allproducts"){
			setDisplayCategory('All Products');
			displayProducts("allproducts")
		} else if(categoryName === "SmartHome" || categoryName ===  "smart home" ||  categoryName ===  "smart"){
			setDisplayCategory('Smart Home')
			displayProducts("SmartHome")
		} else if(categoryName === "laptop" || categoryName === "Laptop"){
			setDisplayCategory('Laptop')
			displayProducts("Laptop")
		} else if (categoryName === "phone" || categoryName === "Phone"){
			setDisplayCategory('Phone')
			displayProducts("Phone")
		} else if (categoryName === "desktop" || categoryName === "Desktop"){
			setDisplayCategory('Desktop')
			displayProducts("Desktop")
		} else if (categoryName === "mobile phone" || categoryName === "smart phone" || categoryName === "phone" || categoryName === "Phone"){
			setDisplayCategory('Phones')
			displayProducts("Phone")
		} else if (categoryName === "tablet" || categoryName === "Tablet" || categoryName === "tab" || categoryName === "Tab"){
			setDisplayCategory('Tablet')
			displayProducts("Tablet")
		} else if (categoryName === "accessories" || categoryName === "Accessories"){
			setDisplayCategory('Accessories')
			displayProducts("Accessories")
		} else {
			setDisplayCategory("Search Result:");
			displayProducts("allproducts")
		}
	},[categoryName])

	function displayProducts(key){
		fetch(`${process.env.REACT_APP_API_URL}/collection/category`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				category: key
			})
		})
		.then(res => res.json()).then(data => {
			setProducts(data.map(product => {
				return (
					<ProductCard key={product.id} product={product}/> 
				)
			}))
		})
	}

	return (
		<Container className="px-1 px-md-5 py-5">
			<h1>{displayCategory}</h1>
			<Row>
				{products}
			</Row>
		</Container>
	)
}