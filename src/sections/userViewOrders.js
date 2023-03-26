import {useEffect, useState, useContext} from 'react' 
import {ListGroup, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import ProductOrderList from './ProductOrderList'
import UserContext from '../UserContext'

export default function UserViewOrders({orders}){
	const {orderId, products, shippingCost, totalAmount, paymentMethod, status, purchaseOn} = orders
	const {products, setProducts} = useState([])
	const {user} = useContext(UserContext)

	const idcreate = orderId.slice(9, productId.length)
	const displayShipping = shippingCost.toLocaleString()
	const displayTotalPrice = totalAmount.toLocaleString()

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/order/products`)
		.then(res => res.json()).then(data => {
			setProducts(data.map(product => {
				return (
					<ProductOrderList key={product} product={product}
				)
			}))
		})
	}, [])

	return (
		<ListGroup as="ol" numbered className="my-5 col-12" id={`list-${idcreate}`}>
				<ListGroup.Item className="col-4">Order number: {idcreate}</ListGroup.Item>
				<ListGroup.Item className="col-4">Status: {status}</ListGroup.Item>
				<ListGroup.Item className="col-4">Payment Option: {paymentMethod}</ListGroup.Item>
				<ListGroup.Item className="col-4">Date Ordered: {purchaseOn}</ListGroup.Item>
				<ListGroup.Item className="col-4">{products}</ListGroup.Item>
				<ListGroup.Item className="col-3">shipping Cost: &#8369;{displayShipping}.00<br/><strong>Total Amount:</strong> &#8369;{displayTotalPrice}.00</ListGroup.Item>	
		</ListGroup>
	)
}