import { useState, useEffect, useContext } from 'react';
import {Card, Col, Button} from 'react-bootstrap';
import {Navigate, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

import UserContext from '../UserContext';

export default function CourseCard({product}) {
	const {_id, name, description, images, brand, stock, price , reviews} = product;

	const { user, setUser } = useContext(UserContext);
	const [isActive, setIsActive] = useState(false);
	const navigate = useNavigate();

	function addToCart(e){
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/collection/${_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				quantity: 1
			})
		}).then(res => res.json()).then(data => {
			if(!data){
				Swal.fire({
					title: "Fail request",
					icon: "error",
					text: "Item is out of stock"
				})
			}
		}).catch(err => console.log(err))
	}

	useEffect(() => {
		if(user !== null){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [user])

	function addCartFail(){
		Swal.fire({
			title: "Fail Request",
			icon: "error",
			text: "Must login to your account first"
		})
		navigate('/login')
	}

	return (
		<Col className="col-5 col-md-3 justify-content-between">
			<Card style={{ width: '15rem' }} className="card-height my-2">
			    <Card.Img variant="top" src={images} />
			    <Card.Body>
			        <Card.Title><h2>{name}</h2></Card.Title>
			        <Card.Title>{brand}</Card.Title>
			        <Card.Title>{reviews.rating}</Card.Title>
			        <Card.Text>
			          {description}
			        </Card.Text>
			        <Card.Title>{price}</Card.Title>
			        <Button variant="dark my-1" href={`/collection/${_id}`} className="w-100">View Item</Button>
			        {	isActive ?
			        		<Button variant="warning" onClick={addToCart} className="w-100">Add to cart</Button>
			        		:
			        		<Button variant="secondary" href className="w-100" onClick={addCartFail}>Add to cart</Button>
			        }
			        
			    </Card.Body>
			</Card>
		</Col>
	)
}