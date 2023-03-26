import {Container, Row, Col, Card} from 'react-bootstrap';
import {Navigate, NavLink} from 'react-router-dom';

export default function Profile({user}){
	const { profilePic, firstName, lastName, email, mobileNumber, address, isActive, orders} = user
	
	return (
		<Container className="p-5">
			<h1>Profile</h1>
			<img src={profilePic} className="rounded-circle w-50 mx-auto border border-secondary border-5"/>
			<span><h5>Name:</h5> {firstName} {lastName}</span>
			<span><h5>Email:</h5> {email}</span>
			<span><h5>Mobile Number:</h5> {mobileNumber}</span>
			<span><h5>default address:</h5></span>
			{/*<p>House/Unit/Bldg Number: {address[0].houseNoUnitNo}</p>
			<p>Street address: {address[0].street}</p>
			<p>Barangay: {address[0].town}</p>
			<p>City: {address[0].city}</p>
			<p>Region: {address[0].region}</p>
			<p>Postal Code: {address[0].Zipcode}</p>*/}
		</Container>
	)
}