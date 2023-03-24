import { useState, useEffect, useContext } from 'react';
import {Card, Col, Button} from 'react-bootstrap';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2'

import UserContext from '../UserContext';

export default function CourseCard({product}) {
	const {_id, name, description, images, brand, stock, price, productRating} = product;

	const displayPrice = price.toLocaleString()

	const { user, setUser } = useContext(UserContext);
	const [isActive, setIsActive] = useState(false);
	const navigate = useNavigate();

	const addToCart = ({_id}) => {
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

	useEffect(() => {
		if(productRating === 1){
			document.getElementById('star-1').classList.add("checked")
		} else if(productRating === 2) {
			document.getElementById('star-1').classList.add("checked")
			document.getElementById('star-2').classList.add("checked")
		} else if(productRating === 3) {
			document.getElementById('star-1').classList.add("checked")
			document.getElementById('star-2').classList.add("checked")
			document.getElementById('star-3').classList.add("checked")
		} else if(productRating === 4) {
			document.getElementById('star-1').classList.add("checked")
			document.getElementById('star-2').classList.add("checked")
			document.getElementById('star-3').classList.add("checked")
			document.getElementById('star-4').classList.add("checked")
		} else if(productRating === 5) {
			document.getElementById('star-1').classList.add("checked")
			document.getElementById('star-2').classList.add("checked")
			document.getElementById('star-3').classList.add("checked")
			document.getElementById('star-4').classList.add("checked")
			document.getElementById('star-5').classList.add("checked")
		}
	}, [productRating])

	return (
		<Col className="col-6 col-lg-3 justify-content-between my-2">
			<Card className="card-height my-2">
				<div className="product-img">
			    	<Card.Img variant="top" src={images[0].image} className="img-fluid" />
			    </div>
			    <Card.Body>
			    	<div className="product-text">
			        	<Card.Title><h2>{name}</h2></Card.Title>
			        </div>
			        <Card.Title>Brand: {brand}</Card.Title>
			        <Card.Title>Rating: 
			        <span class="fa fa-star ml-1" id="star-1"></span>
					<span class="fa fa-star" id="star-2"></span>
					<span class="fa fa-star" id="star-3"></span>
					<span class="fa fa-star" id="star-4"></span>
					<span class="fa fa-star" id="star-5"></span>
					</Card.Title>
			        <Card.Title>Php {displayPrice}</Card.Title>
			        <Link to={`/collection/${_id}`} className="btn btn-outline-secondary w-100 mt-3">View Item</Link>
			        {	isActive ?
			        		<Button variant="warning" className="w-100 my-1 btn" onClick={() => addToCart({_id})} id="addCart">Add to cart</Button>
			        		:
			        		<Button variant="warning" onClick={failReq}className="w-100 my-1">Add to cart</Button>
			        }
			        
			    </Card.Body>
			</Card>
		</Col>
	)
}