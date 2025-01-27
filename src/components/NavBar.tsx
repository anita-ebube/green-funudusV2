import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setActivePage } from '../store/slices/navigationSlice';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';
import axios from 'axios';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const activePage = useSelector((state: RootState) => state.navigation.activePage);
  const productInCart = useSelector((state: RootState) => state.cart.cartProduct);
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string>('/images/Frame 12.png'); // Default image

  const showSideBar = () => {
    dispatch(setIsOpen(true));
    console.log('clicked');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUsername = localStorage.getItem('userDetails');
      if (storedUsername) {
        dispatch(setUser(JSON.parse(storedUsername)));

        // Fetch profile image
        try {
		const token = JSON.parse(localStorage.getItem('access_token') || '""');
          const response = await axios.get('https://api.qubic.com.ng/api/v1/profile/', {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          });
          if (response.data.profile) {
            setProfileImage(`https://api.qubic.com.ng${response.data.profile.profile_photo}`);
          }
        } catch (error) {
          console.error('Error fetching profile image:', error);
          // Keep default image on error
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  const setCartPage = (page: string) => {
    dispatch(setActivePage(page));
    navigate('/dashboard/Products/cart');
  };

  return (
    <div className="fixed top-0 left-0 right-0 py-2 z-20 pe-7 lg:ps-[266px] border-2 border-[#CFD2D8] bg-white flex justify-between items-center">
      <div className="flex gap-5 ps-5">
        <img
          onClick={showSideBar}
          className="lg:hidden"
          src="/svg-icons/breadcrumb.svg"
          alt="breadcrumb"
        />
        <p className="text-2xl font-semibold text-secondary">
          {activePage === 'Home' ? 'Overview' : activePage}
        </p>
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <img
            width={50}
            onClick={() => setCartPage('Cart')}
            src="/svg-icons/cart.svg"
            alt="cart"
            className="cursor-pointer"
          />
          {productInCart.length > 0 && (
            <div className="absolute top-[-5px] right-[-5px] text-sm bg-secondary text-white font-bold rounded-[70%] py-[1px] px-[8px]">
              {productInCart.length}
            </div>
          )}
        </div>
        <div className="border-l-2 ps-4 ml-4 hidden sm:block">
          <img 
            width={50} 
            src={profileImage} 
            alt="profile"
            className="rounded-full object-cover w-[50px] h-[50px]" // Added styling for profile image
          />
        </div>
        <div className="hidden sm:block">
          <p className="text-lg font-semibold text-secondary">{user.username}</p>
          <p className="text-sm text-primary">Free plan</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;