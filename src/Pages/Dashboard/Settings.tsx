import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  username: string;
}

interface ProfileData {
  profile_photo: File | null;
  phone_number: string;
  fullname: string;
  location: string;
  farm_location: string;
  farm_size: string;
  created_at: string;
  updated_at: string;
}

interface ApiProfile {
  id: number;
  profile_photo: string | null;
  phone_number: string;
  fullname: string;
  location: string;
  farm_location: string;
  farm_size: string;
  created_at: string;
  updated_at: string;
  user: number;
}

interface ApiResponse {
  user: User;
  profile: ApiProfile;
}

const Settings: React.FC = () => {
  // Page transition configuration
  const pageTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.7 }
  };

  // Form fields configuration
  const formFields = [
    { label: 'Profile Photo', name: 'profile_photo', type: 'file', accept: 'image/*' },
    { label: 'Phone Number', name: 'phone_number', type: 'tel', placeholder: 'Enter phone number' },
    { label: 'Full Name', name: 'fullname', type: 'text', placeholder: 'Enter full name' },
    { label: 'Location', name: 'location', type: 'text', placeholder: 'Enter location' },
    { label: 'Farm Location', name: 'farm_location', type: 'text', placeholder: 'Enter farm location' },
    { label: 'Farm Size', name: 'farm_size', type: 'text', placeholder: 'Enter farm size' },
  ] as const;

  // State management
  const [formData, setFormData] = useState<ProfileData>({
    profile_photo: null,
    phone_number: '',
    fullname: '',
    location: '',
    farm_location: '',
    farm_size: '',
    created_at: '',
    updated_at: '',
  });
  const [loading, setLoading] = useState({ fetch: false, update: false });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [initialData, setInitialData] = useState<ProfileData | null>(null);
  const [photoError, setPhotoError] = useState('');
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  const token = JSON.parse(localStorage.getItem('access_token') || '""');

  useEffect(() => {
    const fetchProfileData = async (): Promise<void> => {
      if (!token) {
        setError('No authentication token found.');
        return;
      }

      setLoading((prev) => ({ ...prev, fetch: true }));
      try {
        const response = await axios.get<ApiResponse>('http://127.0.0.1:8000/api/v1/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          const { profile } = response.data;
          console.log(profile)
          const formattedData: ProfileData = {
            profile_photo: profile.profile_photo ? new File([], profile.profile_photo) : null, 
            phone_number: profile.phone_number || '',
            fullname: profile.fullname || '',
            location: profile.location || '',
            farm_location: profile.farm_location || '',
            farm_size: profile.farm_size || '',
            created_at: profile.created_at ? new Date(profile.created_at).toISOString().slice(0, 16) : '',
            updated_at: profile.updated_at ? new Date(profile.updated_at).toISOString().slice(0, 16) : '',
          };
          setFormData(formattedData);
          setInitialData(formattedData);
          // Check if profile is completed based on the actual profile photo URL
          setIsProfileCompleted(!!profile.profile_photo);
          
          // Display existing profile photo if available
          if (profile.profile_photo) {
            const profilePhotoPreview = document.getElementById('profile-photo-preview') as HTMLImageElement;
            if (profilePhotoPreview) {
              profilePhotoPreview.src = `http://127.0.0.1:8000${profile.profile_photo}`;
            }
          }
        }
      } catch (err) {
        setError('Failed to fetch profile data.');
      } finally {
        setLoading((prev) => ({ ...prev, fetch: false }));
      }
    };

    fetchProfileData();
  }, [token]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (isProfileCompleted) return;
    
    const { name, value } = e.target;
    setError('');
    setPhotoError('');
    setSuccessMessage('');
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (isProfileCompleted) return;
    
    const { name, files } = e.target;
    setError('');
    setPhotoError('');
    setSuccessMessage('');
    
    if (files && files[0]) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(files[0].type)) {
        setPhotoError('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      if (files[0].size > 5 * 1024 * 1024) {
        setPhotoError('Image size should be less than 5MB');
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleReset = (): void => {
    if (initialData) {
      setFormData(initialData);
      setError('');
      setSuccessMessage('');
      setPhotoError('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!formData.profile_photo) {
      setPhotoError('Profile photo is required');
      return;
    }

    if (!token) {
      setError('No authentication token found.');
      return;
    }

    setLoading((prev) => ({ ...prev, update: true }));
    setError('');
    setSuccessMessage('');

    const updatedFormData = new FormData();
    
    const fieldsToUpdate = ['profile_photo', 'phone_number', 'fullname', 'location', 'farm_location', 'farm_size'] as const;
    
    fieldsToUpdate.forEach(key => {
      const value = formData[key];
      if (value !== null && value !== '') {
        updatedFormData.append(key, value);
      }
    });

    try {
      const response = await axios.put('http://127.0.0.1:8000/api/v1/profile/', updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully!');
        setInitialData(formData);
        setIsProfileCompleted(true);
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const renderFormField = ({ label, name, type, ...rest }) => {
    const isDisabled = false;

    if (type === 'file') {
      return (
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}: <span className="text-red-500">*</span>
          </label>
          <input
            id={name}
            name={name}
            type={type}
            onChange={handleFileChange}
            disabled={isDisabled}
            required
            {...rest}
            className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-primary focus:border-primary 
              ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
          {photoError && name === 'profile_photo' && (
            <p className="text-red-500 text-sm mt-1">{photoError}</p>
          )}
        </div>
      );
    }

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}:</label>
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name as keyof ProfileData] as string}
          onChange={handleInputChange}
          disabled={isDisabled}
          {...rest}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-primary focus:border-primary
            ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className="pt-4 lg:ml-[242px] border-2 h-screen"
    >
      <div className="pt-20 lg:ps-6 pe-4 text-3xl px-5 text-[#758193]">
        {isProfileCompleted ? 'Profile Completed' : 'Complete Profile'}
      </div>

      {loading.fetch ? (
        <div className="flex justify-center items-center mt-10">
          <p className="text-blue-500">Loading profile data...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-5 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map((field, index) => (
            <React.Fragment key={index}>
              {renderFormField(field)}
            </React.Fragment>
          ))}

          {!isProfileCompleted && (
            <div className="col-span-2 flex gap-4">
              <button
                type="submit"
                className={`flex-1 p-3 rounded-md transition-colors ${
                  loading.update
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
                disabled={loading.update}
              >
                {loading.update ? 'Updating...' : 'Update Profile'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={loading.update}
                className={`flex-1 p-3 rounded-md transition-colors ${
                  loading.update
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Reset Changes
              </button>
            </div>
          )}
        </form>
      )}

      {error && <p className="text-red-500 mt-4 px-5">{error}</p>}
      {successMessage && <p className="text-green-500 mt-4 px-5">{successMessage}</p>}
      {isProfileCompleted && (
        <p className="text-green-500 mt-4 px-5">
          Your profile has been completed. Contact support if you need to make changes.
        </p>
      )}
    </motion.div>
  );
};

export default Settings;