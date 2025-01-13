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
import { successToast, errorToast } from '../../utils/toast';

interface Product {
    id: number;
    name: string;
    get_absolute_url: string;
    description: string;
    price: string;
    get_image: string;
    get_thumbnail: string;
    stock_quantity: number;
    category_name: string;
    quantity?: number;
}

interface ProductQuantity {
    qty: number;
    productIndex: number;
    operand: 'add' | 'minus';
}

const pageTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.7 },
};

// Helper function to parse price from string
const parsePrice = (price: string): number => {
    try {
        // Remove any non-numeric characters except decimal point
        const numericPrice = price.replace(/[^0-9.]/g, '');
        return parseFloat(numericPrice);
    } catch (error) {
        console.error('Error parsing price:', error);
        return 0;
    }
};

// Helper function to format price in Naira
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

const Cart: React.FC = () => {
    const cartProducts = useSelector((state: RootState) => state.cart.cartProduct);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [productQty, setProductQty] = useState<ProductQuantity[]>(
        cartProducts.map((_, index) => ({
            qty: 1,
            productIndex: index,
            operand: 'add',
        }))
    );

    useEffect(() => {
        setIsCalculating(true);
        try {
            const amount = cartProducts.reduce((total, item, index) => {
                const itemPrice = parseFloat(item.price);
                const quantity = productQty[index]?.qty || 1;
                return total + (itemPrice * quantity);
            }, 0);
            setTotalAmount(amount);
        } catch (error) {
            console.error('Error calculating total:', error);
            errorToast('Error calculating total');
            setTotalAmount(0);
        } finally {
            setIsCalculating(false);
        }
    }, [cartProducts, productQty]);

    const handleButtonPlusMinus = (operation: 'add' | 'minus', index: number) => {
        setProductQty((prevQty) =>
            prevQty.map((item) =>
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
                      }
                    : item
            )
        );
    };

    const calculateItemTotal = (price: string, quantity: number): string => {
        try {
            const basePrice = parsePrice(price);
            return formatPrice(basePrice * quantity);
        } catch (error) {
            console.error('Error calculating item total:', error);
            return '0.00';
        }
    };

    const handlePayment = (page: string) => {
        if (cartProducts.length === 0) {
            errorToast('Please add items to cart before proceeding');
            return;
        }
        dispatch(setActivePage(page));
        navigate('/dashboard/Products/cart/Checkout');
    };

    const handleRemoveFromCart = (product: Product) => {
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
                                                src={`https://api.qubic.com.ng` + product.get_image}
                                                alt={product.name}
                                                className="object-cover w-full h-full rounded-md"
                                            />
                                        </div>
                                        {/* Product Details */}
                                        <div className="flex-1 sm:max-w-[300px] lg:max-w-[400px]">
                                            <p className="text-md text-secondary font-medium">
                                                {product.name}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-500 leading-5">
                                                {product.description}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Category: {product.category_name}
                                            </p>
                                        </div>
                                        {/* Price Section */}
                                        <div className="text-right w-24 lg:w-32">
                                            <p className="text-primary text-lg">
                                                {formatPrice(parseFloat(product.price))}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Total: {formatPrice(parseFloat(product.price) * productQty[index].qty)}
                                            </p>
                                        </div>
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
                                                    productQty[index].operand === 'minus'
                                                        ? 'bg-primary'
                                                        : 'bg-[#FFF3E6]'
                                                }`}
                                                disabled={productQty[index].qty <= 1}
                                            >
                                                <Minus addMinus={productQty[index].operand} />
                                            </button>
                                            <span className="text-sm">{productQty[index].qty}</span>
                                            <button
                                                onClick={() => handleButtonPlusMinus('add', index)}
                                                className={`p-1 rounded-md ${
                                                    productQty[index].operand === 'add'
                                                        ? 'bg-primary'
                                                        : 'bg-[#FFF3E6]'
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
                        <p className="text-primary text-lg">
                            {isCalculating ? 'Calculating...' : formatPrice(totalAmount)}
                        </p>
                    </div>
                    <div className="border-b">
                        <div className="flex justify-between items-center py-4">
                            <label htmlFor="Plan" className="text-secondary text-sm">Choose Insurance Plan</label>
                            <select
                                id="Plan"
                                name="Plan"
                                className="border-0 text-secondary text-sm"
                                defaultValue="premium"
                            >
                                <option value="premium">Premium (10%)</option>
                                <option value="golden">Golden (8%)</option>
                                <option value="standard">Standard (5%)</option>
                                <option value="basic">Basic (3%)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-b py-4">
                        <p className="text-secondary text-sm">Commission</p>
                        <p className="text-primary text-lg">
                            {isCalculating
                                ? 'Calculating...'
                                : formatPrice(totalAmount * 0.1)}
                        </p>
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <p className="text-secondary text-sm font-semibold">Total</p>
                        <p className="text-primary text-lg font-semibold">
                            {isCalculating
                                ? 'Calculating...'
                                : formatPrice(totalAmount + totalAmount * 0.1)}
                        </p>
                    </div>
                    <button
                        onClick={() => handlePayment('Checkout')}
                        className={`w-full py-3 mt-4 text-white bg-primary rounded-lg transition ${
                            cartProducts.length === 0
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-primary-dark'
                        }`}
                        disabled={cartProducts.length === 0 || isCalculating}
                    >
                        {isCalculating ? 'Calculating...' : 'Proceed with payment'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Cart;