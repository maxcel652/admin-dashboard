import React, { useState, useEffect } from 'react';
import './styles/InternModal.css';

const InternModal = ({ isOpen, onClose, mode, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    phone: '',
    contractingCompany: '',
    jobDescription: '',
    internshipActivities: '',
  });

  // Effect to populate form data when initialData changes (for 'edit' mode)
  useEffect(() => {
    console.log('InternModal useEffect triggered. Mode:', mode, 'Initial Data:', initialData); // Keep this for debugging!

    if (mode === 'edit' && initialData) {
      setFormData({
        firstName: initialData.name.split(' ')[0] || '', // Assuming name is "First Last"
        lastName: initialData.name.split(' ').slice(1).join(' ') || '',
        id: initialData.id || '',
        email: initialData.email || '', // These would come from fuller intern data
        phone: initialData.phone || '',
        contractingCompany: initialData.company || '',
        jobDescription: initialData.role || '', // Mapping 'role' to jobDescription for simplicity
        internshipActivities: initialData.activities || '', // Assuming a text field for activities
      });
    } else if (mode === 'create') {
      // Clear form data when switching to 'create' mode
      setFormData({
        firstName: '',
        lastName: '',
        id: '',
        email: '',
        phone: '',
        contractingCompany: '',
        jobDescription: '',
        internshipActivities: '',
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data up to the parent component
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null; // Don't render if not open

  const modalTitle = mode === 'create' ? 'CREATE INTERN' : 'EDIT INTERN';
  const submitButtonText = mode === 'create' ? 'Register Intern' : 'Save Changes';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Prevent clicks inside modal from closing it */}
        <div className="modal-header">
          <h2>{modalTitle}</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times; {/* HTML entity for 'x' */}
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contractingCompany">Contracting Company</label>
            <input
              type="text"
              id="contractingCompany"
              name="contractingCompany"
              value={formData.contractingCompany}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-group full-width">
            <label htmlFor="internshipActivities">Internship Activities (separated with commas)</label>
            <textarea
              id="internshipActivities"
              name="internshipActivities"
              value={formData.internshipActivities}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <div className="modal-actions">
            <button type="submit" className="primary">
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternModal;