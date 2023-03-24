import {useEffect, useState, useContext} from 'react';
import {Button, ListGroup, Container, Form} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import ProductContext from '../ProductContext';
import Swal from 'sweetalert2'

export default function AdminProductList({product}){
	const {_id, name, description, image, category, brand, stock, price} = product
	const {setProduct} = useContext(ProductContext)
	const [isActive, setIsActive] = useState(false);

	const [inputName, setName] = useState('');
	const [inputDescription, setDescription] = useState('');
	const [inputImage, setImage] = useState('');
	const [inputCategory, setCategory] = useState('');
	const [inputBrand, setBrand] = useState('');
	const [inputStock, setStock] = useState('');
	const [inputPrice, setPrice] = useState('');


	function deleteProduct(){
		fetch(`${process.env.REACT_APP_API_URL}/admin/product/${_id}/archive`, {
			method: 'PATCH'
		}).then(data => {
			if(data){
				Swal.fire({
        			title: "Archive Product",
        			icon: "success",
        			text: "move product to archive"
        		});
			} else {
				Swal.fire({
        			title: "failed",
        			icon: "error",
        		});
			}
		}).catch(err => console.log(err))
	}

	function editForm(){
		setIsActive(true)
		setName(name);
		setDescription(description);
		setImage(image);
		setCategory(category);
		setBrand(brand);
		setStock(stock);
		setPrice(price);
	}

	function cancelForm(){
		setIsActive(false)
	}

	function editProduct(e){
	e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/admin/${_id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: inputName,
				description: inputDescription,
				image: inputImage,
				category: inputCategory,
				brand: inputBrand,
				stock: inputStock,
				price: inputPrice
			})
		}).then(res => res.json()).then(data => {
			if(data){
				Swal.fire({
					title: "Success!",
					icon: "success",
					text: "Successfully Updated"
				})
				setIsActive(false)
			} else {
				Swal.fire({
					title: "fail request",
					icon: "error",
					text: "err input"
				})
			}
		}).catch(err => console.log(err))
	}

	return(
		<>
		{ isActive ?
			<Form onSubmit={(e) => editProduct(e)} className="p-2 p-md-4">
					<Form.Group className="mb-3" controlId="firstName">
			        	<Form.Label>Product Name</Form.Label>
			        	<Form.Control 
			        		type="text" 
			        		placeholder={name}
			        		value={ inputName }
			        		onChange={e => setName(e.target.value)} 
			        		required/>
			      	</Form.Group>

			      	<Form.Group className="mb-3" controlId="firstName">
			        	<Form.Label>Product Description</Form.Label>
			        	<textarea 
			        		type="text" 
			        		placeholder={description}
			        		value={ inputDescription }
			        		onChange={e => setDescription(e.target.value)}
			        		className="form-control w-100 pb-5" 
			        		required/>
			      	</Form.Group>

			      	<Form.Group className="mb-3" controlId="firstName">
			        	<Form.Label>Image</Form.Label>
			        	<Form.Control 
			        		type="text" 
			        		placeholder={image}
			        		value={ inputImage }
			        		onChange={e => setImage(e.target.value)} 
			        		required/>
			      	</Form.Group>

			      	<Form.Group className="mb-3" controlId="firstName">
			        	<Form.Label>Product Category</Form.Label>
			        	<select value={ inputCategory } onChange={e => setCategory(e.target.value)} className="form-control ml-2 w-100" required>
			        		<option value={category} selected>{category}</option>
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
			        		placeholder={brand} 
			        		value={ inputBrand }
			        		onChange={e => setBrand(e.target.value)} 
			        		required/>
			      	</Form.Group>

			      	<Form.Group className="mb-3" controlId="firstName">
			        	<Form.Label>Stocks</Form.Label>
			        	<Form.Control 
			        		type="number"
			        		placeholder={stock}
			        		value={ inputStock }
			        		onChange={e => setStock(e.target.value)} 
			        		required/>
			      	</Form.Group>

			      	<Form.Group className="mb-3" controlId="firstName">
			        	<Form.Label>Price</Form.Label>
			        	<Form.Control 
			        		type="number" 
			        		placeholder={price}
			        		value={ inputPrice }
			        		onChange={e => setPrice(e.target.value)} 
			        		required/>
			      	</Form.Group>

			      	<Button variant="success" type="submit" id="submitBtn">
			  			Submit
			  		</Button>
			  		<Button variant="danger" onClick={cancelForm}>
			  			Cancel
			  		</Button>
			</Form>
		:
			<ListGroup horizontal as="ol" numbered className="my-2">
				<ListGroup.Item className="list-product">{name}</ListGroup.Item>
				<ListGroup.Item className="list-product">{brand}</ListGroup.Item>
				<ListGroup.Item className="list-product">{stock}</ListGroup.Item>
				<ListGroup.Item className="list-product">
					<Button onClick={editForm} className="btn btn-success w-50">Edit</Button>
					<Button onClick={deleteProduct} className="btn btn-danger w-50">Delete</Button>
				</ListGroup.Item>
			</ListGroup>
		}
		</>
	)
}