import {useState, useEffect, useContext} from 'react';
import {Form, Button, ListGroup, Container} from 'react-bootstrap';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

import UserContext from '../UserContext'
import ProductContext from '../ProductContext';

export default function AdminAddProduct(){
	const {product, setProduct} = useContext(ProductContext)
	const {user} = useContext(UserContext)
	const [isActive, setIsActive] = useState(false);
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');
	const [brand, setBrand] = useState('');
	const [stock, setStock] = useState('');
	const [price, setPrice] = useState('');

	function addNewProduct(e){
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/admin/newproduct`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: name,
				description: description,
				image: image,
				category: category,
				brand: brand,
				stock: stock,
				price: price
			})
		}).then(res => res.json()).then(data => {
			if(data){
				setName('');
				setDescription('');
				setImage('');
				setCategory('');
				setBrand('');
				setStock('');
				setPrice('');
				Swal.fire({
					title: "Success!",
					icon: "success",
					text: "Successfully add product"
				})
			} else {
				Swal.fire({
					title: "fail request",
					icon: "error",
					text: "err input"
				})
			}
		}).catch(err => console.log(err))
	}

	useEffect(() => {
		if(name !== '' && description !== '' && image !== '' && brand !== '' && price !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	})

	return(
		<Form onSubmit={(e) => addNewProduct(e)} className="p-2 p-md-4">
			<Form.Group className="mb-3" controlId="firstName">
	        	<Form.Label>Product Name</Form.Label>
	        	<Form.Control 
	        		type="text" 
	        		placeholder="Product Name"
	        		value={ name }
	        		onChange={e => setName(e.target.value)} 
	        		required/>
	      	</Form.Group>

	      	<Form.Group className="mb-3" controlId="firstName">
	        	<Form.Label>Product Description</Form.Label>
	        	<Form.Control 
	        		type="text" 
	        		placeholder="Product Description"
	        		value={ description }
	        		onChange={e => setDescription(e.target.value)} 
	        		required/>
	      	</Form.Group>

	      	<Form.Group className="mb-3" controlId="firstName">
	        	<Form.Label>Image</Form.Label>
	        	<Form.Control 
	        		type="text" 
	        		placeholder="image url"
	        		value={ image }
	        		onChange={e => setImage(e.target.value)} 
	        		required/>
	      	</Form.Group>

	      	<Form.Group className="mb-3" controlId="firstName">
	        	<Form.Label>Product Category</Form.Label>
	        	<select value={ category } onChange={e => setCategory(e.target.value)} className="form-control ml-2 w-100" required>
	        		<option value="" selected disabled>--Select Category--</option>
	        	  	<option value="Laptop">Laptop</option>
	        	  	<option value="Destop">Destop</option>
	        	  	<option value="Tablet">Tablet</option>
	        	  	<option value="Phone">Mobile Phone</option>
	        	  	<option value="Accessories">Accessories</option>
	        	</select>
	      	</Form.Group>

	      	<Form.Group className="mb-3" controlId="firstName">
	        	<Form.Label>Product Brand</Form.Label>
	        	<Form.Control 
	        		type="text" 
	        		value={ brand }
	        		onChange={e => setBrand(e.target.value)} 
	        		required/>
	      	</Form.Group>

	      	<Form.Group className="mb-3" controlId="firstName">
	        	<Form.Label>Stocks</Form.Label>
	        	<Form.Control 
	        		type="number" 
	        		value={ stock }
	        		onChange={e => setStock(e.target.value)} 
	        		required/>
	      	</Form.Group>

	      	<Form.Group className="mb-3" controlId="firstName">
	        	<Form.Label>Price</Form.Label>
	        	<Form.Control 
	        		type="number" 
	        		value={ price }
	        		onChange={e => setPrice(e.target.value)} 
	        		required/>
	      	</Form.Group>
	      	{ isActive ?
	      		<Button variant="success" type="submit" id="submitBtn">
	  			  Submit
	  			</Button>
	      		:
	      		<Button variant="secondary" type="submit" id="submitBtn" disabled>
	  			  Submit
	  			</Button>
	      	}
		</Form>
	)
}

