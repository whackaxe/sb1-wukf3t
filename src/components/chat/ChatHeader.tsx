import React, { useRef, useState } from 'react';
import { LogOut, Upload, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { uploadIcon } from '../../api';

export function ChatHeader() {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user?.token) {
      try {
        const response = await uploadIcon(user.token, file);
        setUser({ ...user, profile_picture: response.url });
      } catch (error) {
        console.error('Failed to upload icon:', error);
      }
    }
  };

  return (
    <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">University Assistant</h1>
      
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 p-1 rounded-full bg-gray-100" />
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <button
              onClick={handleIconClick}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Change Profile Picture
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}