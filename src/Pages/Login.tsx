import React, { ChangeEvent, useState } from 'react';
import { Iform } from '../interfaces/interface';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { errorToast, successToast } from '../utils/toast';

const Login: React.FC = () => {
	// const [error] = useState<Iform | null>(null);
	const [formInput, setFormInput] = useState<Iform>({ name: '', password: '' });
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormInput((prevState) => ({ ...prevState, [name]: value }));
	};

	const formSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formInput.email?.length === 0 || formInput.password.length === 0) {
			errorToast('All fields are required!!!');
			return;
		} else {
			localStorage.setItem('userDetails', JSON.stringify(formInput));
			console.log('form: ', formInput);
			dispatch(setUser(formInput));
			navigate('/dashboard/Home');
			successToast('Successfully Logged In!');
		}
	};

	return (
		<div
			className="bg-black h-screen w-full p-4 lg:p-0 flex justify-center overflow-y-hidden items-center"
			id="register"
		>
			<div className="hidden lg:block w-[50%]  bg-cover">
				<img className="w-full h-full object-contain" src="/images/login.png" alt="signup_image" />
			</div>
			<div className="w-full max-w-[442px] lg:max-w-[50%] lg:w-[50%] lg:px-[70px] py-[10px] flex flex-col gap-7  items-center">
				<div>
					<img src="/svg-icons/logo.svg" alt="logo" />
				</div>
				<div className="w-full  max-w-[442px]  ">
					<h1 className=" text-white font-semibold text-3xl md:text-[40px] mb-2 tracking-[-0.04em]">
						Welcome <span className="text-primary">Back!</span>
					</h1>
					<p className="text-[#D0D0D0] text-xs md:text-sm">Let's get started for today</p>
				</div>
				<form action="" onSubmit={formSubmit} className="w-full max-w-[442px] ">
					<div className="mb-4">
						<label htmlFor="username" className="text-sm block mb-2 text-white bg-inherit">
							Email Address
						</label>
						<input
							type="text"
							name="email"
							id="email"
							placeholder="Email Address"
							onChange={formHandler}
							className="py-[16px] px-[14px] w-full rounded-lg bg-inherit"
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="username" className="text-sm block mb-2 text-white">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							onChange={formHandler}
							className="py-[16px] px-[14px] w-full rounded-lg bg-inherit"
						/>
					</div>
					<p className="mb-10 text-primary">Forgot password?</p>
					<button className="mb-3 text-center p-4 bg-primary hover:bg-primary-dark transition duration-500 w-full rounded-md text-white">
						LOGIN
					</button>
					<div className="w-full text-center">
						<p className="text-white text-sm">
							Don't have an account?{' '}
							<Link to="/" className="text-primary">
								Sign up
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
