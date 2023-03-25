import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Home() {
	const {user} = useContext(UserContext);
	return (
			<Container className="vh-100">
				
			</Container>
		)
}