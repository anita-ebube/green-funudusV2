/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FC8000', // Default shade for 'primary'
					light: '#3B82F6', // Optional custom shades
					dark: '#CC6600',
				},
				secondary: {
					DEFAULT: '#052124', // Default shade for 'secondary'
					light: '#F59E0B',
					dark: '#B45309',
				},
			},
		},
	},
	plugins: [],
};
