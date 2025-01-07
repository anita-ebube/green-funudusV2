import React, { ChangeEvent, useState } from 'react';

interface ILoginForm {
    email: string;
    password: string;
}
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { errorToast, successToast } from '../utils/toast';
import axios from 'axios';

interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

const Login: React.FC = () => {
    const [formInput, setFormInput] = useState<ILoginForm>({ email: '', password: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case 'email':
                if (!value) return 'Email is required';
                if (!validateEmail(value)) return 'Please enter a valid email address';
                break;
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters long';
                break;
        }
    };

    const formHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        // Clear error when user starts typing
        setErrors(prev => ({ ...prev, [name]: undefined, general: undefined }));
        
        // Validate on change
        const fieldError = validateField(name, value);
        if (fieldError) {
            setErrors(prev => ({ ...prev, [name]: fieldError }));
        }

        setFormInput(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        Object.keys(formInput).forEach((key) => {
            const fieldName = key as keyof ILoginForm;
            const error = validateField(fieldName, formInput[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            errorToast('Please fix the errors before submitting');
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await axios.post('https://api.qubic.com.ng/api/v1/auth/login/', formInput);

            if (response.status === 200) {
                localStorage.setItem('access_token', JSON.stringify(response.data.token));
                localStorage.setItem('userDetails', JSON.stringify(response.data.user));
                dispatch(setUser(response.data.user));
                navigate('/dashboard/Home');
                successToast('Successfully Logged In!');
            }
        } catch (error: any) {
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.response) {
                console.log('Error details:', error);

                if (error.code === 'ERR_BAD_REQUEST') {
                    if (error.response?.data?.message) {
                        errorMessage = error.response.data.message;
                    } else if (error.response?.data?.error) {
                        errorMessage = error.response.data.error;
                    } else if (error.message) {
                        errorMessage = error.message;
                    }
                } else {
                    switch (error.response.status) {
                        case 401:
                            errorMessage = 'Invalid email or password';
                            break;
                        case 404:
                            errorMessage = 'Account not found';
                            break;
                        case 500:
                            errorMessage = 'Server error. Please try again later';
                            break;
                    }
                }

                if (error.response?.data?.errors) {
                    const fieldErrors: FormErrors = {};
                    Object.entries(error.response.data.errors).forEach(([key, value]) => {
                        fieldErrors[key as keyof FormErrors] = Array.isArray(value) ? value[0] : value as string;
                    });
                    setErrors(prev => ({ ...prev, ...fieldErrors }));
                } else {
                    setErrors(prev => ({ ...prev, general: errorMessage }));
                }
            } else if (error.request) {
                errorMessage = 'Network error. Please check your connection.';
                setErrors(prev => ({ ...prev, general: errorMessage }));
            }
            
            errorToast(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-black h-screen w-full p-4 lg:p-0 flex justify-center overflow-y-hidden items-center" id="register">
            <div className="hidden lg:block w-[50%] bg-cover">
            <img className="w-full h-full object-contain" src="/images/login.jpg" alt="signup_image" />
            </div>
            <div className="w-full max-w-[442px] lg:max-w-[50%] lg:w-[50%] lg:px-[70px] py-[10px] flex flex-col gap-7 items-center">
                
                <div className="w-full max-w-[442px]">
                    <h1 className="text-white font-semibold text-3xl md:text-[40px] mb-2 tracking-[-0.04em]">
                        Welcome <span className="text-primary">Back!</span>
                    </h1>
                    <p className="text-[#D0D0D0] text-xs md:text-sm">Let's get started for today</p>
                </div>

                {errors.general && (
                    <div className="w-full max-w-[442px] p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={formSubmit} className="w-full max-w-[442px]">
                    <div className="mb-4">
                        <label htmlFor="email" className="text-sm block mb-2 text-white bg-inherit">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            onChange={formHandler}
                            className={`py-[16px] px-[14px] w-full rounded-lg bg-inherit ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="text-sm block mb-2 text-white">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={formHandler}
                                className={`py-[16px] px-[14px] w-full rounded-lg bg-inherit ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
                        )}
                    </div>
                    <Link to="/email" className="block mb-10 text-primary hover:text-primary-dark">
                        Forgot password?
                    </Link>
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`mb-3 text-center p-4 bg-primary hover:bg-primary-dark transition duration-500 w-full rounded-md text-white ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
                    </button>
                    <div className="w-full text-center">
                        <p className="text-white text-sm">
                            Don't have an account?{' '}
                            <Link to="/" className="text-primary hover:text-primary-dark">
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