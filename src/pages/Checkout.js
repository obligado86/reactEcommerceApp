import {Button, Container, Row, Col, Form} from 'react-bootstrap';
import {useNavigate, Navigate, NavLink, useParams} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import Swal from 'sweetalert2';

import UserContext from '../UserContext';
import Cart from '../sections/Cart';

export default function CheckOut(){
	const {user} = useContext(UserContext);
	const navigate = useNavigate()
	const {userId} = useParams();

	const [houseNoUnitNo, setHouseNoUnitNo] = useState('');
	const [street, setStreet] = useState('');
	const [town, setTown] = useState('');
	const [city, setCity] = useState('');
	const [region, setRegion] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');

	const [items, setItems] = useState('');
	const [itemCount, setItemCount] = useState('');
	const [total, setTotal] = useState('');
	const [shippingCost, setShippingCost] = useState('');
	const [discount, setDiscount] = useState('')

	const displayTotalPrice = total.toLocaleString();
	const displayShippingCost = shippingCost.toLocaleString();
	const displayDiscount = discount.toLocaleString();

	function CheckoutItems(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/${userId}/mycart/checkout`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				houseNoUnitNo: houseNoUnitNo,
				street: street,
				town: town,
				city: city,
				region: region,
				zipCode: zipCode,
				paymentMethod: paymentMethod
			})
		}).then(res => res.json()).then(data => {
			console.log(data)
			if(!data){
				Swal.fire({
					title: "Somethings went wrong",
					icon: "error",
					text: "Please try again."
				});
			} else {
				Swal.fire({
					title: "Thank you for making a purchase",
					icon: "success",
					text: "We'll Process your order once you recieved a confirmation"
				});
				navigate('/')
			}
		}).catch(err => console.log(err))
	};

	useEffect(() => {
  		fetch(`${process.env.REACT_APP_API_URL}/${userId}/mycart`)
  		.then(res => res.json()).then(data => {
  			setItems(data.map(item => {
  				return (
  					<Cart key={item.id} item={item} />
  				)
  			}))

  			let dataTotal = 0
  			let dataShipping = 0
  			let dataQuantity = 0
  			let dataDiscount = 0
  			for(let i = 0; i < data.length; i++){
  				let dataSubtotal = data[i].price * data[i].quantity
  				dataTotal += dataSubtotal
  				dataQuantity += data[i].quantity
  				if(dataTotal < 1000){
  					dataShipping = 120 * dataQuantity
  					dataTotal += dataShipping
  				} else {
  					dataDiscount = 120 * dataQuantity
  				}
  				setTotal(dataTotal);
  				setItemCount(dataQuantity);
  				setShippingCost(dataShipping);
  				setDiscount(dataDiscount);
  			};
  		});
  	}, []);

	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_URL}/${userId}/address`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json()).then(data => {
			if(data.length >= 0){
				setHouseNoUnitNo(data.houseNoUnitNo);
				setStreet(data.street);
				setTown(data.town);
				setCity(data.city);
				setRegion(data.region);
				setZipCode(data.zipCode);
				setPaymentMethod('')
			} else {
				setHouseNoUnitNo('');
				setStreet('');
				setTown('');
				setCity('');
				setRegion('');
				setZipCode('');
				setPaymentMethod('')
			}
		})
	}, [])

	
	return (
		(user.id === null) ?
		<Navigate to='/login'/>
		:
		<>
		<Container fluid className="check-out">
			<Row>
				<Col className="col-5 p-5 bg-color1">
					<Form onSubmit={(e) => CheckoutItems(e)}>
						<h1>Ship to:</h1>
						<Form.Group className="mb-3" controlId="houseNo">
						    <Form.Label>house No./Unit No./Bldg No.</Form.Label>
						    <Form.Control 
						        type="text" 
						        placeholder="Enter your house/Bldg/unit number"
						        value={ houseNoUnitNo }
						        onChange={e => setHouseNoUnitNo(e.target.value)} 
						        required/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="street">
						    <Form.Label>Street Address</Form.Label>
						    <Form.Control 
						        type="text" 
						        placeholder="Enter street address"
						        value={ street }
						        onChange={e => setStreet(e.target.value)} 
						        required/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="town">
						    <Form.Label>Town/Brgy. Address</Form.Label>
						    <Form.Control 
						        type="text" 
						        placeholder="Enter town or brgy address"
						        value={ town }
						        onChange={e => setTown(e.target.value)} 
						        required/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="city">
						    <Form.Label>City Address</Form.Label>
						    <Form.Control 
						        type="text" 
						        placeholder="Enter city address"
						        value={ city }
						        onChange={e => setCity(e.target.value)} 
						        required/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="region">
						    <Form.Label>Region</Form.Label>
						    <Form.Control 
						        type="text" 
						        placeholder="Enter region address"
						        value={ region }
						        onChange={e => setRegion(e.target.value)} 
						        required/>
						</Form.Group>

						<Form.Group className="mb-5" controlId="zipCode">
						    <Form.Label>Postal Code</Form.Label>
						    <Form.Control 
						        type="text" 
						        placeholder="Enter postal code"
						        value={ zipCode }
						        onChange={e => setZipCode(e.target.value)} 
						        required/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="paymentMethod">
						  	<Form.Label>Payment Method</Form.Label>
						  	<select value={ paymentMethod } onChange={e => setPaymentMethod(e.target.value)} className="form-control ml-2 w-100" required>
						  		<option value="" selected disabled>--Select Payment Option--</option>
						  	  	<option value="COD">Cash on Delivery</option>
						  	  	<option value="card">Credit/Debit Card</option>
						  	  	<option value="Ewallet">E-Wallet Card</option>
						  	  	<option value="Paylater">Utang</option>
						  	  	<option value="bladder">Bladder</option>
						  	</select>
						</Form.Group>
						<Button variant="secondary" type="submit" id="submitBtn" className="w-100 mt-auto">
				  			  Checkout
				  		</Button>
						<Button as={NavLink} to="/" className="btn btn-warning text-light w-100 logout-admin mb-2">Cancel</Button>
				</Form>
			
				</Col>
				<Col className="col-7">
					<Container>
						{items}
					</Container>
					<Container fluid className="pt-5 pb-3">
						<hr className="mt-5" />
						<p className="body-text mt-5">Total items: {itemCount}</p>
						<p className="body-text">Shipping Cost: &#8369;{displayShippingCost}.00</p>
						<p className="body-text">Total Discount: <span className="discount-text">&#8369;{displayDiscount}.00</span></p>
						<h3>Total Payment: &#8369;{displayTotalPrice}.00</h3>
					</Container>
				</Col>
				
			</Row>
		</Container>
	</>
	)
}