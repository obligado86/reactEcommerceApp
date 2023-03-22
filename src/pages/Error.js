import {Row, Col} from 'react-bootstrap';

export default function Error() {
	return (
			<Row>
				<Col className="p-5">
					<h1>Page Not Found</h1>
					<p>Go back to the <a href={"/"}>homepage</a></p>
				</Col>
			</Row>
		)
}