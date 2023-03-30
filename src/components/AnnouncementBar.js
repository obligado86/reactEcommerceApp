import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function AnnouncementBar(){
	return (
			<Container fluid className="bg-color2 text-light">
				<p className="body-text py-1 text-center">Free Shipping min order $100</p>
			</Container>
		)
}