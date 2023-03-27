
import { useState, useEffect, useContext } from 'react';
import {Card, Col, Button, Form } from 'react-bootstrap';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import Swal from 'sweetalert2'

import MainNavBar from './MainNavBar'
import UserContext from '../UserContext';

export default function ProductCard({product}) {
	const {_id, name, description, images, brand, stock, price, productRating} = product;
	const [stars, setStars] = useState(productRating)
	const displayPrice = price.toLocaleString()
	const [item , setItem] = useState({})
	const [starId, setStarId] = useState('')
	const idcreate = _id.slice(19, _id.length)


	const { user, setUser } = useContext(UserContext);
	const [isActive, setIsActive] = useState(false);
	const navigate = useNavigate();

	const addToCart = (id) => {
		fetch(`${process.env.REACT_APP_API_URL}/collection/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${localStorage.getItem('token')}`
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
		if(stars === 1){
			document.getElementById(`${idcreate}-star1`).classList.add("checked")
		} else if(stars === 2) {
			document.getElementById(`${idcreate}-star1`).classList.add("checked")
			document.getElementById(`${idcreate}-star2`).classList.add("checked")
		} else if(stars === 3) {
			document.getElementById(`${idcreate}-star1`).classList.add("checked")
			document.getElementById(`${idcreate}-star2`).classList.add("checked")
			document.getElementById(`${idcreate}-star3`).classList.add("checked")
		} else if(stars === 4) {
			document.getElementById(`${idcreate}-star1`).classList.add("checked")
			document.getElementById(`${idcreate}-star2`).classList.add("checked")
			document.getElementById(`${idcreate}-star3`).classList.add("checked")
			document.getElementById(`${idcreate}-star4`).classList.add("checked")
		} else if(stars === 5) {
			document.getElementById(`${idcreate}-star1`).classList.add("checked")
			document.getElementById(`${idcreate}-star2`).classList.add("checked")
			document.getElementById(`${idcreate}-star3`).classList.add("checked")
			document.getElementById(`${idcreate}-star4`).classList.add("checked")
			document.getElementById(`${idcreate}-star5`).classList.add("checked")
		}
	}, [productRating])

	return (
		<Col className="col-6 col-lg-3 justify-content-between my-2">
			<Card className="card-height my-2">
				<div className="product-img">
			    	<Card.Img variant="top" src={images[0].image} className="img-fluid" />
			    </div>
			    <Card.Body>
			    	<div className="product-text m-0">
			        	<Card.Title><h2>{name}</h2></Card.Title>
			        </div>
			        <Card.Text>Brand: {brand}</Card.Text>
			        <Card.Text>Rating: <p className="d-none" id="rating">{productRating}</p>
			        <span class="fa fa-star ml-1" id={`${idcreate}-star1`}></span>
					<span class="fa fa-star" id={`${idcreate}-star2`}></span>
					<span class="fa fa-star" id={`${idcreate}-star3`}></span>
					<span class="fa fa-star" id={`${idcreate}-star4`}></span>
					<span class="fa fa-star" id={`${idcreate}-star5`}></span>
					</Card.Text>
			        <Card.Title>Php {displayPrice}</Card.Title>
			        <Link to={`/collection/${_id}`} className="btn btn-outline-secondary w-100 mt-3">View Item</Link>
			        {	isActive ?
			        		<Button variant="warning" className="w-100 my-1 btn" onClick={() => addToCart(_id)} id="addCart">Add to cart</Button>
			        		:
			        		<Button variant="warning" onClick={failReq}className="w-100 my-1">Add to cart</Button>
			        }
			        
			    </Card.Body>
			</Card>
		</Col>
	)
}