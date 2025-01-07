import React, { useState } from 'react';
import { setActivePage } from '../../store/slices/navigationSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PaystackButton } from "react-paystack";
import { motion, AnimatePresence } from 'framer-motion';
import { successToast } from '../../utils/toast';
import { RootState } from '../../store/store';
const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Payment Successful!</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your order has been successfully processed. You will receive a confirmation email shortly.
            </p>
            <div className="mt-4">
              <button
                onClick={onClose}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

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
  const [showModal, setShowModal] = useState(false);
  
  const [lga, setLga] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartProducts.reduce((total, product) => {
    const amount = parseFloat(product.price.replace(/[^0-9.-]+/g, ''));
    return total + amount;
  }, 0);
  const handlePaymentSuccess = () => {
    // Show success modal
    setShowModal(true);
    // Show toast notification
    successToast('Payment processed successfully!');
    // Clear cart
    dispatch(clearCart());
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Navigate back to products or home page
    dispatch(setActivePage('Products'));
    navigate('/dashboard/Products');
  };
  const componentProps = {
    email,
    amount: totalAmount * 100,
    metadata: {
      fullName,
      phone,
      custom_fields: [
        {
          display_name: "Address",
          variable_name: "address",
          value: `${address}, ${lga}, ${state}`
        }
      ]
    },
    publicKey: 'pk_test_cd44a4c93e54e3d45a073566b088985701d43632',
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: () => {
      console.log('Payment closed');
    }
  };

  const backToCart = () => {
    dispatch(setActivePage('Cart'));
    navigate(-1);
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition.transition}
        variants={pageTransition}
        className="pt-4 lg:ml-[242px] border-2 flex flex-col items-center lg:items-start lg:flex-row lg:justify-between"
      >
        <div className="pt-20 lg:ps-6 lg:pe-4 p-4 w-full max-w-[571px] lg:max-w-[680px] rounded-lg shadow-sm cursor-pointer">
          <p className="flex gap-1 mb-5 text-secondary font-medium" onClick={backToCart}>
            <img src="/svg-icons/arrow-left.svg" alt="" /> Back to Cart
          </p>

          <div className="mb-8 bg-white rounded-lg w-full p-4">
            <h2 className="text-lg font-semibold text-secondary mb-4">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-secondary">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jackie Black"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 placeholder:text-sm focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-secondary">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 90000222"
                  className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-secondary">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="JackieBlack@gmail.com"
                  className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-secondary">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Enugu"
                  className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-secondary">LGA</label>
                <input
                  type="text"
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                  placeholder="Enugu"
                  className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-medium text-secondary">House Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="9 Areana street."
                  className="mt-1 block w-full placeholder:text-sm border border-gray-300 rounded-md p-2 text-gray-500 focus:border-gray-400 focus:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 bg-white rounded-lg w-full p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment</h2>
            <div className="w-full">
              {email && fullName && phone ? (
                <PaystackButton
                  {...componentProps}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors"
                />
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed"
                >
                  Complete form to pay
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[571px] lg:max-w-[400px] p-[14px] lg:mt-28 h-max">
          <div className="bg-white rounded-lg p-4">
            <p className="text-base font-semibold text-secondary pb-2">Product Summary</p>
            {cartProducts.map((product, index) => (
              <div className="border-t flex gap-3 justify-between md:gap-6 py-4" key={index}>
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24">
                  <img src={`http://127.0.0.1:8000` + product.get_image} alt="" className="object-cover w-full h-full rounded-md" />
                </div>
                <div className="sm:max-w-[300px] w-full lg:max-w-[400px]">
                  <div className="flex justify-between items-center">
                    <p className="text-md text-secondary font-medium">{product.name}</p>
                    <p className="text-primary text-lg text-right">{product.price}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-5">{product.description}</p>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total Amount:</p>
                <p className="text-primary text-xl font-bold">₦{totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <SuccessModal isOpen={showModal} onClose={handleModalClose} />
    </>
  );
};

export default Checkout;