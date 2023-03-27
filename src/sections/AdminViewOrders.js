import {useEffect, useState, useContext} from 'react';
import {Container, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//import OrderContext from '../OrderContext';
//import UserContext from '../UserContext'
import UserViewOrders from './UserViewOrders'

export default function AdminViewOrder({order}){
	const {_id, userId, products, shippingCost, totalAmount, paymentMethod, status, purchaseOn} = order

	//const {order} = useContext(OrderContext)
	/*const {user} = useContext(UserContext);
	const [orders, setOrders] = useState([])
	const [products, setProducts] = useState('')
	const [orderId, setOrderId] = useState('')
	
	const [shippingCost, setShippingCost] = useState()
	const [totalAmount, setTotalAmount] = useState()
	const [paymentMethod, setPaymentMethod] = useState('')
	const [status, setStatus] = useState('')
	const [purchaseOn, setPurchaseOn] = useState()
	const [productId, setProductId] = useState('')
	const [productImage, setProductImage] = useState('')
	const [productName, setProductName] = useState('')
	const [productPrice, setProductPrice] = useState()
	const [quantity, setQuantity] = useState('')*/


	const displayShipping = shippingCost//.toLocaleString()
	const displayTotalPrice = totalAmount//.toLocaleString()
	const displayProductPrice = products.productPrice//.toLocaleString()

	/*useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/admin/orders`)
		.then(res => res.json()).then(data => {
			//console.log(data)
			setOrders(data.map(key => {
				setOrderId(key.orderId);
				setProductImage(key.productImage);
				setShippingCost(key.shippingCost);
				setTotalAmount(key.totalAmount);
				setPaymentMethod(key.paymentMethod);
				setStatus(key.status);
				setPurchaseOn(key.purchaseOn);
			}))
		})
	}, [user])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/admin/orders`)
		.then(res => res.json()).then(data => {
			console.log(data)
			setProducts(data.products.map(key => {
				setProductId(key.productId)
				setProductImage(key.productImage)
				setProductName(key.productName)
				setProductPrice(key.productPrice)
				setQuantity(key.quantity)
			}))
		})
	}, [])*/

	return (
		<Container>
		<ListGroup horizontal as="ol" numbered className="mt-5 col-12" >
				
				<ListGroup.Item className="col-3">Status:<br/> {status}</ListGroup.Item>
				<ListGroup.Item className="col-3">Payment Option:<br/> {paymentMethod}</ListGroup.Item>
				<ListGroup.Item className="col-3">Date Ordered:<br/> {purchaseOn}</ListGroup.Item>
				<ListGroup.Item className="col-3">shipping Cost: &#8369;{displayShipping}.00<br/><strong>Total Amount:</strong> &#8369;{displayTotalPrice}.00</ListGroup.Item>	
		</ListGroup>
		<p>Products:</p>
		<ListGroup horizontal as="ol" numbered className="col-12" >
			<ListGroup.Item className="col-2"><img src={products.productsImage} className="img-thumbnail w-100"/></ListGroup.Item>
			<ListGroup.Item as={Link} to={`/collection/${products.productId}`} className="col-4 text-dark">{products.productName}</ListGroup.Item>
			<ListGroup.Item className="col-2">Qty: {products.quantity}</ListGroup.Item>
			<ListGroup.Item className="col-4">Item Price: &#8369;{displayProductPrice}.00</ListGroup.Item>
		</ListGroup>
		</Container>
	)
}