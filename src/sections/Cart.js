import { useState, useEffect, useContext} from 'react';
import { Container, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';

export default function Cart({item}){
	const {productImage, productId, productName, quantity, price} = item;
	const {user} = useContext(UserContext)
	const idcreate = productId.slice(19, productId.length)
	const subtotal = price * quantity
	const displayPrice = subtotal.toLocaleString()
	const displayintPrice = price.toLocaleString()
	const userId = user.id

	function removeItem(productId){
		fetch(`${process.env.REACT_APP_API_URL}/${userId}/mycart`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				productId: productId
			})
		}).then(res => res.json()).then(data => {
			if(data){
				document.getElementById(`list-${idcreate}`).remove()
			}
		}).catch(err => console.log(err));
	}
	
	return (
			<ListGroup horizontal as="ol" numbered className="my-5 col-12" id={`list-${idcreate}`}>
				<ListGroup.Item className="col-3"><img src={productImage} className="img-thumbnail w-100"/></ListGroup.Item>
				<ListGroup.Item as={Link} to={`/collection/${productId}`} className="col-3 text-dark">{productName}</ListGroup.Item>
				<ListGroup.Item className="col-2">Qty: {quantity}</ListGroup.Item>
				<ListGroup.Item className="col-3">Cost: &#8369;{displayintPrice}.00<br/><strong>Total:</strong> &#8369;{displayPrice}.00</ListGroup.Item>
				<ListGroup.Item onClick={() => removeItem(productId)} className="col-1"><span className="mt-2 del-btn fa fa-close"></span></ListGroup.Item>
			</ListGroup>
	)
}