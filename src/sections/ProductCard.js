import {Card, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function CourseCard({product}) {
	const {_id, name, description, images, brand, stock, price , reviews} = product;
	return (
		<Col xs={{span: 6}} md={{span: 3}}>
			<Card style={{ width: '18rem' }}>
			    <Card.Img variant="top" src={images.image[0]} />
			    <Card.Body>
			        <Card.Title><h2>{name}</h2></Card.Title>
			        <Card.Title>{brand}</Card.Title>
			        <Card.Title>{reviews.rating}</Card.Title>
			        <Card.Text>
			          {description}
			        </Card.Text>
			        <Card.Title>{price}</Card.Title>
			        <Button variant="warning" href={`/collection/${_id}`}>View Item</Button>
			        <Button variant="warning">Add to cart</Button>
			    </Card.Body>
			</Card>
		</Col>
	)
}