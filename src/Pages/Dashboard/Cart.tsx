import React, { useEffect, useState } from 'react';
import Add from '../../components/nav-svg/Add';
import Minus from '../../components/nav-svg/Minus';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '../../store/slices/navigationSlice';
import { removeFromCart } from '../../store/slices/cartSlice';

import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ICard } from '../../interfaces/interface';
import { successToast } from '../../utils/toast';

const pageTransition = {
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20 },
	transition: { duration: 0.7 },
};

const Cart: React.FC = () => {
	const cartProducts = useSelector((state: RootState) => state.cart.cartProduct);
	const [totalAmount, setTotalAmount] = useState<number | null>(null);
	const navigate = useNavigate();
	// const [operation, setOperation] = useState('add');
	const [productQty, setProductQty] = useState(
		Array.from({ length: cartProducts.length }, (_, index) => ({
			qty: 1,
			productIndex: index,
			operand: 'add',
		}))
	);

	useEffect(() => {
		// console.log(mode);
		const amount = cartProducts.reduce((total, item) => {
			if (item.amount !== undefined) {
				return total + +item.amount.split('/')[0].split('$')[1];
			}
			return total;
		}, 0);
		console.log('amount: ', amount);
		setTotalAmount(amount);
	}, [cartProducts]);

	const dispatch = useDispatch();

	const handleButtonPlusMinus = (operation: string, index: number) => {
		// setOperation(operation);

		setProductQty((prevQty) =>
			prevQty.map(
				(item) =>
					item.productIndex === index
						? {
								...item,
								qty:
									operation === 'add'
										? item.qty + 1
										: operation === 'minus' && item.qty > 1
										? item.qty - 1
										: 1,
								operand: operation,
						  } // Increase qty if index matches
						: item // Keep item as is if index doesn’t match
			)
		);
		let newAmount;
		if (operation === 'add') {
			newAmount = totalAmount! + +cartProducts[index].amount.split('/')[0].split('$')[1];
			setTotalAmount(newAmount);
		} else if (operation === 'minus' && productQty[index].qty > 1) {
			newAmount = totalAmount! - +cartProducts[index].amount.split('/')[0].split('$')[1];
			setTotalAmount(newAmount);
		}
	};

	const handlePayment = (page: string) => {
		dispatch(setActivePage(page));
		navigate('/dashboard/Products/cart/Checkout');
	};

	const handleRemoveFromCart = (product: ICard) => {
		dispatch(removeFromCart(product));
		successToast('Successfully removed product!');
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
			className="min-h-screen pt-4 lg:ml-[242px] border-2"
		>
			<div className="pt-20 lg:ps-6 lg:pe-4 lg:flex lg:gap-4 lg:justify-between" id="cart">
				{/* Cart Items Section */}
				<div className="bg-white rounded-lg w-full lg:max-w-[670px]">
					<div className="bg-white md:px-16 lg:px-6 p-4 rounded-lg" id="cart-items">
						<div className="text-lg text-secondary font-semibold pb-4">
							Item List ({cartProducts.length})
						</div>
						{cartProducts.length > 0 ? (
							cartProducts.map((product, index) => (
								<div className="border-t py-4" key={index}>
									<div className="flex gap-3 justify-between md:gap-6" id="description">
										{/* Image Section */}
										<div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24">
											<img
												src={product.imageUrl}
												alt=""
												className="object-cover w-full h-full rounded-md"
											/>
										</div>
										{/* Product Details */}
										<div className="flex-1 sm:max-w-[300px] lg:max-w-[400px]">
											<p className="text-md text-secondary font-medium">{product.productName}</p>
											<p className="text-xs sm:text-sm text-gray-500 leading-5">
												{product.description}
											</p>
										</div>
										{/* Price Section */}
										<p className="text-primary text-lg text-right w-20 lg:w-16">{product.amount}</p>
									</div>
									{/* Quantity and Remove Options */}
									<div className="flex justify-between items-center mt-4">
										<button
											onClick={() => handleRemoveFromCart(product)}
											className="flex items-center gap-1 text-[#BD0505] hover:text-red-700"
										>
											<img src="/svg-icons/trash.svg" alt="Remove" className="w-4 h-4" />
											<span className="text-sm">Remove item</span>
										</button>
										<div className="flex items-center gap-3">
											<button
												onClick={() => handleButtonPlusMinus('minus', index)}
												className={`p-1 rounded-md ${
													productQty[index].operand === 'minus' ? 'bg-primary' : 'bg-[#FFF3E6]'
												}`}
											>
												<Minus addMinus={productQty[index].operand} />
											</button>
											<span className="text-sm">{productQty[index].qty}</span>
											<button
												onClick={() => handleButtonPlusMinus('add', index)}
												className={`p-1 rounded-md ${
													productQty[index].operand === 'add' ? 'bg-primary' : 'bg-[#FFF3E6]'
												}`}
											>
												<Add addMinus={productQty[index].operand} />
											</button>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="w-full text-lg text-primary italic px-3">
								Please add item(s) to Cart
							</div>
						)}
					</div>
				</div>

				{/* Cart Summary Section */}
				<div className="bg-white w-full max-w-[340px] p-4 rounded-lg mt-8 lg:mt-0 lg:h-max lg:sticky lg:top-24 shadow-sm">
					<div className="text-lg text-secondary font-semibold pb-4 border-b">Cart Summary</div>
					<div className="flex justify-between items-center border-b py-4">
						<p className="text-secondary text-sm">Subtotal</p>
						<p className="text-primary text-lg">${totalAmount}</p>
					</div>
					<button
						onClick={() => handlePayment('Checkout')}
						className="w-full py-3 mt-4 text-white bg-primary rounded-lg hover:bg-primary-dark transition"
					>
						Proceed with payment
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default Cart;
