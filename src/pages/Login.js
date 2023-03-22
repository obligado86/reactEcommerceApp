import { useState, useEffect, useContext } from 'react';

import { Form, Button, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../UserContext';

export default function Login() {
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);

    function authenticate(e){
    	e.preventDefault();
    	fetch(`${process.env.REACT_APP_API_URL}/login`, {
    		method: 'POST',
    		headers: {
    			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify({
    			email: email,
    			password: password
    		})
    	}).then(res => res.json()).then(data => {
    		if(typeof data.access !== "undefined"){
    			localStorage.setItem('token', data.access);
    			retrieveUserDetails(data.access);
    			setEmail('');
    			setPassword('');
    			Swal.fire({
    				title: "Login Successful",
    				icon: "success",
    				text: "Welcome. Enjoy Shopping"
    			});
    		} else {
    			Swal.fire({
    				title: "Authentication Failed",
    				icon: "error",
    				text: "Check your login credientials and try again."
    			});
    		}
    	});

    }

    const retrieveUserDetails = (token) => {
    	fetch(`${process.env.REACT_APP_API_URL}/details`, {
    		headers: {
    			Authorization: `Bearer ${token}`
    		}
    	}).then(res => res.json()).then(data => {
    		setUser({
    			id: data._id,
    			isAdmin: data.isAdmin
    		})
    	})
    };

    useEffect(() => {
    	if(email !== '' && password !== ""){
    		setIsActive(true);
    	} else {
    		setIsActive(false);
    	}
    }, [email, password]);

    return (
    	<Container className="p-5">
    		{/*(user.id !== null) ?
    		   <Navigate to="/"/>
    		:*/}
    		   <Form onSubmit={e => authenticate(e)}>
    		        <Form.Group className="mb-3" controlId="userEmail">
    		            <Form.Label>User Email</Form.Label>
    		            <Form.Control 
    		                type="email" 
    		                placeholder="Enter email"
    		                value={email}
    		    			onChange={(e) => setEmail(e.target.value)}
    		                required
    		            />
    		        </Form.Group>

    		        <Form.Group className="mb-3" controlId="password">
    		            <Form.Label>Password</Form.Label>
    		            <Form.Control 
    		                type="password" 
    		                placeholder="Password"
    		                value={password}
    		    			onChange={(e) => setPassword(e.target.value)}
    		                required
    				    />

    				</Form.Group>

    				    { isActive ? 
    				        <Button variant="warning" type="submit" id="submitBtn" className="w-100">
    				            Login
    				        </Button>
    				       : 
    				        <Button variant="secondary" type="submit" id="submitBtn" className="w-100" disabled>
    				            Login
    				       </Button>
    				    }
    				    <p className="text-center pt-1">Don't have an account yet? <a href={"/signup"}>Click Here</a> to Register</p>
    			</Form>
    	</Container>
	)
}