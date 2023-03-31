import {Container, Col, Row, NavLink,} from 'react-bootstrap'
import FooterLogo from '../assets/media/icons/logofooter.jpg'
import { useState, useEffect, useContext } from 'react';

import UserContext from '../UserContext'

export default function Footer(){
	const {user} = useContext(UserContext)
	return(
		(user.isAdmin === true) ?
			<>
			</>
		:

		<Container fluid className="bg-color2 pt-5 px-5 text-light mt-5">
			<Row>
				<Col className="col-3">
					<NavLink className="text-light"><h5 className="mb-3">Collections</h5></NavLink>
					<NavLink className="text-light admin-nav">All Products</NavLink>
					<NavLink className="text-light admin-nav">Laptop</NavLink>
					<NavLink className="text-light admin-nav">Destop</NavLink>
					<NavLink className="text-light admin-nav">Phones</NavLink>
					<NavLink className="text-light admin-nav">Tablets</NavLink>
					<NavLink className="text-light admin-nav">Accessories</NavLink>
				</Col>
				<Col className="col-3">
					<NavLink className="text-light"><h5 className="mb-3">Links</h5></NavLink>
					<NavLink className="text-light admin-nav">About Us</NavLink>
					<NavLink className="text-light admin-nav">Career</NavLink>
					<NavLink className="text-light admin-nav">Terms of Service</NavLink>
					<NavLink className="text-light admin-nav">User Privacy Policy</NavLink>
					<NavLink className="text-light admin-nav">Refund Policy</NavLink>
					<NavLink className="text-light admin-nav">Do not sell my personal information</NavLink>
					<NavLink className="text-light admin-nav">Partners</NavLink>
				</Col>
				<Col className="col-3">
					<NavLink className="text-light"><h5 className="mb-3">Need help?</h5></NavLink>
					<NavLink className="text-light admin-nav">Contact Us</NavLink>
					<NavLink className="text-light admin-nav">Track my Orders</NavLink>
					<NavLink className="text-light admin-nav">FAQ's</NavLink>
				</Col>
				<Col>
					<img src={FooterLogo} className="img-fluid" id="footer-logo"/>
					<h1 className="text-light mb-3">Caccah Shopping</h1>
					<span className="text-light">Follow us: </span>
					<span className="fa fa-instagram text-light mx-1 admin-nav"></span>
					<span className="fa fa-facebook text-light mx-1 admin-nav"></span>
					<span className="fa fa-pinterest text-light mx-1 admin-nav"></span>
					<span className="fa fa-twitter text-light mx-1 admin-nav"></span>
				</Col>
				<p className="text-center body-text mt-5 mb-2">2023 Caccah Shopping by: Joseph Obligado&#169;</p>
			</Row>
		</Container>
	)
}