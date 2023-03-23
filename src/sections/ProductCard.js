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

	function addToCart(){
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
			} else {
				document.getElementById("addCart").classList.add("btn-white")
			}
		}).catch(err => console.log(err))
	}

	function failReq(){
		Swal.fire({
					title: "Fail request",
					icon: "error",
					text: "must login to your account first"
				})
				navigate('/login')
	}

	useEffect(() => {
		if(user.id !== null){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [user])

	return (
		<Col className="col-6 col-lg-3 justify-content-between my-2">
			<Card className="card-height my-2">
			    <Card.Img variant="top" src={images} />
			    <Card.Body>
			        <Card.Title><h2>{name}</h2></Card.Title>
			        <Card.Title><h3>{brand}</h3></Card.Title>
			        <Card.Title>{reviews.rating}</Card.Title>
			        <Card.Text>
			          {description}
			        </Card.Text>
			        <Card.Title>{price}</Card.Title>
			        <Button variant="dark" href={`/collection/${_id}`} className="w-100 mt-3">View Item</Button>
			        {	isActive ?
			        		<Button variant="warning" className="w-100 my-1 btn" onClick={addToCart} id="addCart">Add to cart</Button>
			        		:
			        		<Button variant="warning" onClick={failReq}className="w-100 my-1">Add to cart</Button>
			        }
			        
			    </Card.Body>
			</Card>
		</Col>
	)
}