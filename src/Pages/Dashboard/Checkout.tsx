import React, { useState } from 'react';
import { setActivePage } from '../../store/slices/navigationSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PaystackButton } from "react-paystack";
import { motion } from 'framer-motion';
import { RootState } from '../../store/store';

const pageTransition = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20 },
	transition: { duration: 0.7 },
};



const Checkout: React.FC = () => {
	const cartProducts = useSelector((state: RootState) => state.cart.cartProduct);
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [state, setState] = useState('');
	const [lga, setLga] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();


	const totalAmount = cartProducts.reduce((total, product) => {
		const amount = parseFloat(product.amount.replace(/[^0-9.-]+/g, ''));
		return total + amount;
	}, 0);

	const config = {
		reference: (new Date()).getTime().toString(),
		email: email,
		amount: totalAmount * 100, // Convert to kobo
		publicKey: 'pk_live_fe190e51a0efed431b5666cb2ec4f9df50dbbd19',
		metadata: {
			custom_fields: [
				{
					display_name: "Full Name",
					variable_name: "full_name",
					value: fullName
				},
				{
					display_name: "Phone",
					variable_name: "phone",
					value: phone
				},
				{
					display_name: "Address",
					variable_name: "address",
					value: `${address}, ${lga}, ${state}`
				}
			]
		}
	};

	const handlePaystackSuccess = (reference: any) => {
		console.log('Payment successful', reference);
		// Handle successful payment (e.g., clear cart, show success message)
	};

	const handlePaystackClose = () => {
		console.log('Payment closed');
	};
	const backToCart = () => {
		dispatch(setActivePage('Cart'));
		navigate(-1);
	};
	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			transition={pageTransition.transition}
			variants={{
				initial: pageTransition.initial,
				animate: pageTransition.animate,
				exit: pageTransition.exit,
			}}
			className="pt-4 lg:ml-[242px] border-2 flex flex-col items-center lg:items-start lg:flex-row lg:justify-between"
		>
			<div className="pt-20 lg:ps-6 lg:pe-4 p-4 w-full max-w-[571px] lg:max-w-[680px]  rounded-lg shadow-sm cursor-pointer">
				<p className="flex gap-1 mb-5 text-secondary font-medium" onClick={backToCart}>
					<img src="/svg-icons/arrow-left.svg" alt="" /> Back to Cart
				</p>
				{/* <!-- Delivery Information Section --> */}
				<div className="mb-8 bg-white rounded-lg w-full p-4">
					<h2 className="text-lg font-semibold text-secondary mb-4">Delivery Information</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* <!-- Full Name --> */}
						<div>
							<label className="text-sm font-medium text-secondary">Full Name</label>
							<input
								type="text"
								placeholder="Jackie Black"
								className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 placeholder:text-sm focus:ring-0"
							/>
						</div>
						{/* <!-- Phone Number --> */}
						<div>
							<label className="text-sm font-medium text-secondary">Phone Number</label>
							<input
								type="text"
								placeholder="+234 90000222"
								className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
							/>
						</div>
						{/* <!-- Email Address --> */}
						<div className="col-span-1 md:col-span-2">
							<label className="text-sm font-medium text-secondary">Email Address</label>
							<input
								type="email"
								placeholder="JackieBlack@gmail.com"
								className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
							/>
						</div>
						{/* <!-- State --> */}
						<div>
							<label className="text-sm font-medium text-secondary">State</label>
							<input
								type="text"
								placeholder="Enugu"
								className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
							/>
						</div>
						{/* <!-- LGA --> */}
						<div>
							<label className="text-sm font-medium text-secondary">LGA</label>
							<input
								type="text"
								placeholder="Enugu"
								className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
							/>
						</div>
						{/* <!-- House Address --> */}
						<div className="col-span-1 md:col-span-2">
							<label className="text-sm font-medium text-secondary">House Address</label>
							<input
								type="text"
								placeholder="9 Areana street."
								className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
							/>
						</div>
					</div>
				</div>
				{/* <!-- Payment Method Section --> */}
				<div className="mb-8 bg-white rounded-lg w-full p-4">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Payment</h2>
					<div className="w-full">
						<PaystackButton
							{...config}
							onSuccess={handlePaystackSuccess}
							onClose={handlePaystackClose}
							className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors"
							text="Pay Now"
						/>
					</div>
				</div>
			</div>

			{/* purchase summary */}
			<div className="w-full max-w-[571px] lg:max-w-[400px] p-[14px] lg:mt-28 h-max">
				<div className="bg-white rounded-lg  p-4 ">
					<p className="text-base font-semibold text-secondary pb-2">Product Summary</p>
					{cartProducts.map((product, index) => (
						<div
							className="border-t flex gap-3 justify-between md:gap-6 py-4"
							id="description"
							key={index}
						>
							{/* Image Section */}
							<div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24">
								<img
									src={product.imageUrl}
									alt=""
									className="object-cover w-full h-full rounded-md"
								/>
							</div>
							{/* Product Details */}
							<div className="sm:max-w-[300px] w-full lg:max-w-[400px]">
								<div className="flex justify-between items-center">
									<p className="text-md text-secondary font-medium">{product.productName}</p>

									<p className="text-primary text-lg text-right ">{product.amount}</p>
								</div>
								<p className="text-xs  text-gray-500 leading-5">{product.description}</p>
							</div>
							{/* Price Section */}


						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default Checkout;
