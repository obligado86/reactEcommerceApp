import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Home() {
	const {user} = useContext(UserContext);
	return (
		(user.isAdmin === true) ?
				<Navigate to="/admin"/>
		:
			<>
				
			</>
		)
}