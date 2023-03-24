import {useEffect, useState, useContext} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import UserContext from '../UserContext';
import ProductContext from '../ProductContext';
import logo from '../assets/media/icons/banner-logo.jpg'

export default function ProductView(){
	const {productId} = useParams();
	const {user} = useContext(UserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');
	const [brand, setBrand] = useState('');
	const [stock, setStock] = useState('');
	const [price, setPrice] = useState('');
	const [productRating, setProductRating] = useState('');
	const [reviews, setReviews] = useState('');

	const [quantity, setQuantity] = useState(0);

	const navigate = useNavigate();

	const displayPrice = price.toLocaleString()

	function addQuantity(){
		if (quantity !== stock) {
			setQuantity(quantity + 1)
		} else {
			setQuantity(quantity)
		}
	}

	function lessQuantity(){
		if (quantity !== 1) {
			setQuantity(quantity - 1)
		} else if (quantity === 1){
			setQuantity(quantity)
		}
	}

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/collection/${productId}`)
		.then(res => res.json()).then(data => {
			setName(data.name);
			setDescription(data.description);
			setImage(data.images[0].image);
			setCategory(data.category);
			setBrand(data.brand);
			setStock(data.stock);
			setPrice(data.price);
			setProductRating(data.productRating);
			setReviews(data.reviews);
		})
	}, [productId])

	function failReq(){
		Swal.fire({
					title: "Fail request",
					icon: "error",
					text: "must login to your account first"
				})
				navigate('/login')
	}

	const addToCart = (inputQty) => {
		fetch(`${process.env.REACT_APP_API_URL}/collection/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				quantity: inputQty
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
		<Container className="p-5">
			<Row>
				<Col className="col-12 col-md-5">
					<img src={image} className="img-fluid"/>
				</Col>
				<Col className="col-12 col-md-5 offset-md-1 pt-3 pt-md-5">
					<h1 className="header-text">{name}</h1>
					<h3 className="body-text"> Brand: {brand}</h3>
					<h5 className="body-text">Category: {category}</h5>
					<h6>Rating: 
			        <span class="fa fa-star ml-1" id="star-1"></span>
					<span class="fa fa-star" id="star-2"></span>
					<span class="fa fa-star" id="star-3"></span>
					<span class="fa fa-star" id="star-4"></span>
					<span class="fa fa-star" id="star-5"></span>
					</h6>
					<p className="body-text">{description}</p>
					<p className="body-text">Stock: {stock}</p>
					<h4 className="body-text">Php {displayPrice}</h4>
					<p><span class="fa fa-chevron-circle-left mr-1" onClick={lessQuantity}></span> {quantity} <span class="fa fa-chevron-circle-right ml-1" onClick={addQuantity}></span></p>
					{user.id === null ?
						<Button variant="warning" onClick={failReq}className="w-100 my-1">Add to cart
						</Button>
					:
						<Button className="btn btn-warning px-5" onClick={() => addToCart(quantity)}>add to Cart</Button>
					}
				</Col>
			</Row>
		</Container>
	)

}