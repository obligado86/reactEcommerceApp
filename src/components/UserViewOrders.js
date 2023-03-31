import {useEffect, useState, useContext} from 'react' 
import {ListGroup, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//import ProductOrderList from './ProductOrderList'
//import UserContext from '../UserContext'

export default function UserViewOrders({order}) {
	const { userId, products, shippingCost, totalAmount, paymentMethod, status, purchaseOn } = order;

	const [displayStatus, setDisplayStatus] = useState('')
	const [displayShipping, setDisplayShipping] = useState()
	const [displayTotalPrice, setDisplayTotalPrice] = useState()
	const [displayProductPrice, setDisplayProductPrice] = useState()

	useEffect(() => {
		if(status === "pending"){
			setDisplayStatus("to Pay")
		} else if(status === "processsing"){
			setDisplayStatus("to ship")
		} else if(status === "shippedout"){
			setDisplayStatus("to receive")
		} else if(status === "delivered"){
			setDisplayStatus("to rate")
		} else if(status === "returned"){
			setDisplayStatus("canceled")
		} else if(status === "forcancelation"){
			setDisplayStatus("canceled")
		}  else if(status === "canceled"){
			setDisplayStatus("canceled")
		}

		setDisplayShipping(shippingCost)//.toLocaleString()
		setDisplayTotalPrice(totalAmount)//.toLocaleString()
		setDisplayProductPrice(products.productPrice)//.toLocaleString()
	}, [status, products])

	return (
		<>
		<ListGroup horizontal as="ol" numbered className="col-12" >
				<ListGroup.Item className="col-3">Status:<br/> {displayStatus}</ListGroup.Item>
				<ListGroup.Item className="col-3">Payment Option:<br/> {paymentMethod}</ListGroup.Item>
				<ListGroup.Item className="col-3">Date Ordered:<br/> {purchaseOn}</ListGroup.Item>
				<ListGroup.Item className="col-3">shipping Cost: &#8369;{displayShipping}.00<br/><strong>Total Amount:</strong> &#8369;{displayTotalPrice}.00</ListGroup.Item>	
		</ListGroup>
		<p>Products:</p>
		<ListGroup horizontal as="ol" numbered className="col-12" >
			<ListGroup.Item className="col-2"><img src={products.productImage} className="img-thumbnail w-100"/></ListGroup.Item>
			<ListGroup.Item as={Link} to={`/collection/${products.productId}`} className="col-4 text-dark">{products.productName}</ListGroup.Item>
			<ListGroup.Item className="col-2">Qty: {products.quantity}</ListGroup.Item>
			<ListGroup.Item className="col-4">Item Price: &#8369;{displayProductPrice}.00</ListGroup.Item>
		</ListGroup>
		</>
	)
}
