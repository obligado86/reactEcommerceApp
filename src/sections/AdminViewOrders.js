import {useEffect, useState, useContext} from 'react';
import {Container} from 'react-bootstrap';

import UserContext from '../UserContext'
import UserViewOrders from './UserViewOrders'

export default function AdminViewOrder(){
	const {user} = useContext(UserContext);
	const [orders, setOrders] = useState([])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/admin/order`)
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
		<Container>
			{orders}
		</Container>
	)
}