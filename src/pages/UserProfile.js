import {useEffect, useState, useContext} from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap'

//import Profile from '../sections/Profile';
import UserViewOrders from '../sections/UserViewOrders'
import UserContext from '../UserContext'

export default function UserProfile(){
	const {user} = useContext(UserContext);
	const [profile, setProfile] = ('')
	const [orders, setOrders] = useState([])
	const [profilePic, setProfilePic] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [mobileNumber, setMobileNumber] = useState('')
	const [houseNoUnitNo, setHouseNoUnitNo] = useState('');
	const [address, setAddress] = useState('')
	const [street, setStreet] = useState('');
	const [town, setTown] = useState('');
	const [city, setCity] = useState('');
	const [region, setRegion] = useState('');
	const [zipCode, setZipCode] = useState('');

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/profile`)
		.then(res => res.json()).then(data => {
			setProfile([data].map(key => {
				console.log(key)
				setProfilePic(key.profilePic);
				setFirstName(key.firstName);
				setLastName(key.lastName);
				setEmail(key.email);
				setMobileNumber(key.mobileNumber);
			}))
		})
	}, [user])

	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/address`, {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json()).then(data => {
			setAddress([data].map(key => {
				setHouseNoUnitNo(key.houseNoUnitNo);
				setStreet(key.street);
				setTown(key.town);
				setCity(key.city);
				setRegion(key.region);
				setZipCode(key.zipCode);
			}))
		})
	}, [])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/order`)
		.then(res => res.json()).then(data => {
			console.log(data)
			setOrders([data].map(order => {
				return (
					<UserViewOrders order={order.id} order={order} />
				)
			}))
		})
	}, [user])

	return (
		(user.id === null) ?
		<Navigate to='/login'/>
		:
		<Container fluid className="card-height">
			<Row>
				<Col className="col-5 text-center card-height bg-color2 text-light p-4">
					<h1>Profile</h1>
					<img src={profilePic} className="rounded-circle w-50 my-2 mx-auto border border-secondary border-5"/>
					<span><h5>Name:</h5> {firstName} {lastName}</span>
					<span><h5>Email:</h5> {email}</span>
					<span><h5>Mobile Number:</h5> {mobileNumber}</span>
					<span><h5>default address:</h5></span>
					<p>House/Unit/Bldg Number: {houseNoUnitNo}</p>
					<p>Street address: {street}</p>
					<p>Barangay: {town}</p>
					<p>City: {city}</p>
					<p>Region: {region}</p>
					<p>Postal Code: {zipCode}</p>
				</Col>
				<Col className="col-7 p-5">
					<h1>Orders:</h1>
					{orders}
				</Col>
			</Row>
		</Container>
	)

}