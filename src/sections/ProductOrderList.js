import {ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function ProductOrders({product}) {
	const {productId, productImage, productName, productPrice, quantity} = product

	const idcreate = productId.slice(19, productId.length)
	const subtotal = productPrice * quantity
	const displayPrice = subtotal.toLocaleString()
	const displayintPrice = productPrice.toLocaleString()

	return (
		<ListGroup horizontal as="ol" numbered className="my-5 col-12" id={`list-${idcreate}`}>
				<ListGroup.Item className="col-3"><img src={productImage} className="img-thumbnail w-100"/></ListGroup.Item>
				<ListGroup.Item as={Link} to={`/collection/${productId}`} className="col-3 text-dark">{productName}</ListGroup.Item>
				<ListGroup.Item className="col-2">Qty: {quantity}</ListGroup.Item>
				<ListGroup.Item className="col-3">Cost: &#8369;{displayintPrice}.00<br/><strong>Total:</strong> &#8369;{displayPrice}.00</ListGroup.Item>
		</ListGroup>
	)
}