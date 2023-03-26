import {useEffect, useState, useContext} from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap'

import Profile from '../sections/Profile';
import UserContext from '../UserContext'

export default function UserProfile(){
	const {user} = useContext(UserContext);
	const [profile, setProfile] = useState('')
	const [orders, setOrders] = useState([])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/details`)
		.then(res => res.json()).then(data => {
			console.log(data)
			setProfile(data.map(user => {
				return (
					<Profile key={user} user={user}/>
				)
			}))
		})
	}, [user])

	return (
		<Container className="p-5">
			<Row>
				<Col className="col-5">
					{profile}
				</Col>
			</Row>
		</Container>
	)

}