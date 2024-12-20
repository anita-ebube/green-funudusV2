import React, { useState } from 'react';
import axios from 'axios';

const Email: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setError('');
    setSuccess('');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError('Please enter a valid email address.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required.');
      return;
    }

    if (error) return;

    setLoading(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/auth/request-password-reset-email/',
        { email }
      );
      
      setSuccess('Password reset link has been sent to your email.');
      setEmail('');
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
          </div>
          <button
            type="submit"
            className={`w-full bg-primary text-white py-3 rounded-md transition duration-200 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary'}`}
            disabled={!!error || loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Email;