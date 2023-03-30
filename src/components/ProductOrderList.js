import {useEffect, useState, useContext} from 'react'
import {ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import UserContext from '../UserContext'

export default function ProductOrders({product}) {
	//const {productId, productImage, productName, productPrice, quantity} = product
	const {user} = useContext(UserContext);

	const [products, setProducts] = useState([])
	
	const idcreate = productId.slice(19, productId.length)
	const subtotal = productPrice * quantity
	const displayPrice = subtotal.toLocaleString()
	const displayintPrice = productPrice.toLocaleString()

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/order/products`)
		.then(res => res.json()).then(data => {
			setProducts(data.map(key => {
				setProductId(key.productId)
				setProductImage(key.productImage)
				setProductName(key.productName)
				setProductPrice(key.productPrice)
				setQuantity(key.quantity)
			}))
		})
	}, [])

	return (
		<ListGroup horizontal as="ol" numbered className="my-5 col-12" id={`list-${idcreate}`}>
				<ListGroup.Item className="col-3"><img src={productImage} className="img-thumbnail w-100"/></ListGroup.Item>
				<ListGroup.Item as={Link} to={`/collection/${productId}`} className="col-3 text-dark">{productName}</ListGroup.Item>
				<ListGroup.Item className="col-2">Qty: {quantity}</ListGroup.Item>
				<ListGroup.Item className="col-3">Cost: &#8369;{displayintPrice}.00<br/><strong>Total:</strong> &#8369;{displayPrice}.00</ListGroup.Item>
		</ListGroup>
	)
}