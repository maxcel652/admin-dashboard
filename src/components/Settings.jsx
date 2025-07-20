import React, { useState, useEffect } from 'react';
import './styles/Settings.css'; // Import the new CSS

// Accept adminProfile and setAdminProfile as props
const Settings = ({ adminProfile, setAdminProfile }) => {
  // Local state for form inputs
  const [name, setName] = useState(adminProfile.name);
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [tempAvatarUrl, setTempAvatarUrl] = useState(adminProfile.image); // For previewing new avatar

  // Effect to update local state if adminProfile changes from parent (e.g., initial load)
  useEffect(() => {
    setName(adminProfile.name);
    setTempAvatarUrl(adminProfile.image);
    // Reset other fields or load from adminProfile if they were part of it
  }, [adminProfile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatarUrl(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (e.g., name not empty)
    if (!name.trim()) {
      alert('Name cannot be empty.');
      return;
    }



    setAdminProfile(prevProfile => {
      const updatedProfile ={
      ...prevProfile,
      name: name,
      image: tempAvatarUrl,
      } 
      console.log('Settings.jsx - Preparing to update adminProfile with:', updatedProfile); // <--- ADD THIS LOG
      return updatedProfile;
    });

    alert('Profile updated successfully!');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="settings-container">
      <h2>User Settings</h2>
      <div className="user-info-card">
        <h3>EDIT USER INFORMATION</h3>
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="profile-picture-section full-width">
            <div className="current-avatar">
              {tempAvatarUrl ? (
                <img src={tempAvatarUrl} alt="Admin Avatar" />
              ) : (
                <span>👤</span>
              )}
            </div>
            <div>
              <label htmlFor="avatar-upload" className="custom-file-upload">
                Upload Profile Picture
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '5px' }}>
                Max file size: 2MB. JPG, PNG, GIF.
              </p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1234567890"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <div className="settings-actions">
            <button type="submit" className="primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
