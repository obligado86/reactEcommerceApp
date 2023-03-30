import {useEffect, useState, useContext} from 'react' 
import {ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';

//import ProductOrderList from './ProductOrderList'
import UserContext from '../UserContext'

export default function UserViewOrders({ order }){
	const { userId, products, shippingCost, totalAmount, paymentMethod, status, purchaseOn } = order;
	//const [orders, setOrders] = useState([])
	const {user} = useContext(UserContext)

	//const [products, setProducts] = useState([])
	//const [orderId, setOrderId] = useState('')
	
	//const [shippingCost, setShippingCost] = useState()
	//const [totalAmount, setTotalAmount] = useState()
	//const [paymentMethod, setPaymentMethod] = useState('')
	//const [status, setStatus] = useState('')
	//const [purchaseOn, setPurchaseOn] = useState()
	const [productId, setProductId] = useState('')
	const [productImage, setProductImage] = useState('')
	const [productName, setProductName] = useState('')
	const [productPrice, setProductPrice] = useState()
	const [quantity, setQuantity] = useState('')
	const [displayStatus, setDisplayStatus] = useState('')
	setProductId(products.productId);
	setProductImage(products.productImage);
	setProductName(products.productName);
	setProductPrice(products.productPrice.toLocaleString());
	setQuantity(products.quantity);
	//const idcreate = orderId.slice(9, orderId.length)

	const displayShipping = shippingCost.toLocaleString()
	const displayTotalPrice = totalAmount.toLocaleString()
	const displayProductPrice = products.productPrice.toLocaleString()
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
	}, [status])
	/*useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/myorder`)
		.then(res => res.json()).then(data => {
			
			setOrder(data.map(key => {
				setOrderId(key.orderId);
				setShippingCost(key.shippingCost.toLocaleString());
				setTotalAmount(key.totalAmount.toLocaleString());
				setPaymentMethod(key.paymentMethod);
				setStatus(key.status);
				setPurchaseOn(key.purchaseOn);
			}))
		})
	}, [user])

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/${user.id}/order/products`)
		.then(res => res.json()).then(data => {
			//console.log(data)
			setProducts(data.map(key => {
				setProductId(key.productId)
				setProductImage(key.productImage)
				setProductName(key.productName)
				setProductPrice(key.productPrice.toLocaleString())
				setQuantity(key.quantity)
			}))
		})
	}, [])*/

	return (
		<>
		<ListGroup horizontal as="ol" numbered className="col-12 bg-secondary" >
				<ListGroup.Item className="col-3">Status:<br/> {displayStatus}</ListGroup.Item>
				<ListGroup.Item className="col-3">Payment Option:<br/> {paymentMethod}</ListGroup.Item>
				<ListGroup.Item className="col-3">Date Ordered:<br/> {purchaseOn}</ListGroup.Item>
				<ListGroup.Item className="col-3">shipping Cost: &#8369;{displayShipping}.00<br/><strong>Total Amount:</strong> &#8369;{displayTotalPrice}.00</ListGroup.Item>	
		</ListGroup>
		<p>Products:</p>
		<ListGroup horizontal as="ol" numbered className="col-12" >
			<ListGroup.Item className="col-2"><img src={productImage} className="img-thumbnail w-100"/></ListGroup.Item>
			<ListGroup.Item as={Link} to={`/collection/${productId}`} className="col-4 text-dark">{productName}</ListGroup.Item>
			<ListGroup.Item className="col-2">Qty: {quantity}</ListGroup.Item>
			<ListGroup.Item className="col-4">Item Price: &#8369;{displayProductPrice}.00</ListGroup.Item>
		</ListGroup>
		</>
	)
}
