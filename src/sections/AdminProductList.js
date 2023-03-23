import {Button, ListGroup, Container} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';

export default function AdminProductList({product}){
	const {_id, name, brand, stock, isActive} = product
	return(
		<ListGroup horizontal as="ol" numbered className="my-2">
			<ListGroup.Item className="list-product">{name}</ListGroup.Item>
			<ListGroup.Item className="list-product">{brand}</ListGroup.Item>
			<ListGroup.Item className="list-product">{stock}</ListGroup.Item>
			<ListGroup.Item className="list-product">
				<Button className="btn btn-success w-50">Edit</Button>
				<Button className="btn btn-danger w-50">Delete</Button>
			</ListGroup.Item>
		</ListGroup>
	)
}