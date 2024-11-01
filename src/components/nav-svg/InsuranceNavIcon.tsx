import React from 'react';
import { IActiveNavLink } from '../../interfaces/interface';

const InsuranceNavIcon: React.FC<IActiveNavLink> = ({ activeLink }) => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10.4901 2.23L5.50015 4.09999C4.35015 4.52999 3.41016 5.88998 3.41016 7.11998V14.55C3.41016 15.73 4.19017 17.28 5.14017 17.99L9.44016 21.2C10.8502 22.26 13.1701 22.26 14.5801 21.2L18.8802 17.99C19.8302 17.28 20.6101 15.73 20.6101 14.55V7.11998C20.6101 5.88998 19.6701 4.52999 18.5201 4.09999L13.5302 2.23C12.6802 1.92 11.3201 1.92 10.4901 2.23Z"
				stroke={activeLink === 'Insurance' ? '#fff' : '#758193'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.9997 10.92C11.9597 10.92 11.9097 10.92 11.8697 10.92C10.9297 10.89 10.1797 10.11 10.1797 9.16003C10.1797 8.19003 10.9697 7.40002 11.9397 7.40002C12.9097 7.40002 13.6997 8.19003 13.6997 9.16003C13.6897 10.12 12.9397 10.89 11.9997 10.92Z"
				stroke={activeLink === 'Insurance' ? '#fff' : '#758193'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10.01 13.72C9.05004 14.36 9.05004 15.41 10.01 16.05C11.1 16.78 12.89 16.78 13.98 16.05C14.94 15.41 14.94 14.36 13.98 13.72C12.9 12.99 11.11 12.99 10.01 13.72Z"
				stroke={activeLink === 'Insurance' ? '#fff' : '#758193'}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default InsuranceNavIcon;
