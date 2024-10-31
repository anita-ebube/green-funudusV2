import React from 'react';
import { IActiveNavLink } from '../../interfaces/interface';

const SecurityNavIcon: React.FC<IActiveNavLink> = ({ activeLink }) => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
				stroke={activeLink === 'Security' ? '#C6FBC4' : '#758193'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
				stroke={activeLink === 'Security' ? '#C6FBC4' : '#758193'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.9965 16H16.0054"
				stroke={activeLink === 'Security' ? '#C6FBC4' : '#758193'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.9955 16H12.0045"
				stroke={activeLink === 'Security' ? '#C6FBC4' : '#758193'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7.99451 16H8.00349"
				stroke={activeLink === 'Security' ? '#C6FBC4' : '#35C12F'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default SecurityNavIcon;
