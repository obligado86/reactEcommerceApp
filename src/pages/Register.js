import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

import UserContext from '../UserContext';

export default function Register(){

	const { user, setUser } = useContext(UserContext);

	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');

	const [isActive, setIsActive] = useState(false);

	function registerUser(e) {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_API_URL}/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password1,
					mobileNumber: mobileNumber
				})
			}).then(res => res.json()).then(data => {
				if(!data){
					Swal.fire({
						title: "Failed",
						Icon: "error",
						text: "email is already been used"
					})
				} else {
					setFirstName('');
					setLastName('');
					setEmail('');
					setMobileNumber('');
					setPassword1('');
					setPassword2('');
					Swal.fire({
						title: "Registered Successfully",
						icon: "success",
						text: "thank you for signing up"
					})
					navigate('/login')
				}
			}).catch(err => console.log(err))
		}

		useEffect(() => {
			
			if((email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)){
				setIsActive(true);
			} else {
				setIsActive(false);
			}
		}, [email, password1, password2]);

		return(
				(user.id !== null) ?
				    <Navigate to="/" />
				:
				<Container className="p-5">
					<Form onSubmit={(e) => registerUser(e)}>
						<Form.Group className="mb-3 w-100" controlId="firstName">
				        	<Form.Label>First Name</Form.Label>
				        	<Form.Control 
				        		type="text" 
				        		placeholder="Enter first name"
				        		value={ firstName }
				        		onChange={e => setFirstName(e.target.value)} 
				        		required/>
				      	</Form.Group>

				      	<Form.Group className="mb-3 w-100" controlId="lastName">
				        	<Form.Label>Last Name</Form.Label>
				        	<Form.Control 
				        		type="text" 
				        		placeholder="Enter last name"
				        		value={ lastName }
				        		onChange={e => setLastName(e.target.value)} 
				        		required/>
				      	</Form.Group>

				      	<Form.Group className="mb-3 w-100" controlId="mobileNo">
				        	<Form.Label>Mobile Number</Form.Label>
				        	<Form.Control 
				        		type="text" 
				        		placeholder="Enter your mobile number"
				        		value={ mobileNumber }
				        		onChange={e => setMobileNumber(e.target.value)} 
				        		required/>
				      	</Form.Group>

				      	<Form.Group className="mb-3 w-100" controlId="userEmail">
				        	<Form.Label>Email address</Form.Label>
				        	<Form.Control 
				        		type="email" 
				        		placeholder="Enter email"
				        		value={ email }
				        		onChange={e => setEmail(e.target.value)}
				        		required/>
				        	<Form.Text className="text-muted">
				         		We'll never share your email with anyone else.
				        	</Form.Text>
				      	</Form.Group>

				      <Form.Group className="mb-3 w-100" controlId="password1">
				        	<Form.Label>Password</Form.Label>
				        	<Form.Control 
				        		type="password" 
				        		placeholder="Password"
				        		value={ password1 }
				        		onChange={e => setPassword1(e.target.value)} 
				        		required/>
				      </Form.Group>
				      
				      <Form.Group className="mb-3 w-100" controlId="password2">
				        <Form.Label>Verify Password</Form.Label>
				        <Form.Control 
				        	type="password" 
				        	placeholder="Verify Password"
				        	value={ password2 }
				        	onChange={e => setPassword2(e.target.value)}  
				        	required/>
				      </Form.Group>

				      { isActive ?
				  			<Button variant="warning" type="submit" id="submitBtn" className="w-100">
				  			  Submit
				  			</Button>
				  			:
				  			<Button variant="secondary" type="submit" id="submitBtn" className="w-100" disabled>
				  			  Submit
				  			</Button>
				  		}
				  		<p className="text-center pt-1">Already have an account? <a href={"/login"}>Click Here</a> to login</p>
				    </Form>

			</Container>
		)
	}
