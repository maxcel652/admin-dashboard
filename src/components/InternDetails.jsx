import React from 'react';
import { useParams } from 'react-router-dom'; // To get the ID from the URL
// import './InternDetails.css'; // You'll create this later

const InternDetails = ({ interns }) => {
  const { id } = useParams(); 
  
  const internData = interns.find(intern => intern.id === id);
  
    if(!internData){
        return <div>
            <h2>Intern not found</h2>
            <p>The intern with ID: {id} could not be found.</p>
        </div>;
    }

  return (
    <div>
      <h2>Intern Details (ID: {id})</h2>
      <p>This page will show detailed information about a specific intern.</p>
      {/* Content from your Intern Details screenshot */}
      <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
          <div style={{ flex: 1 }}>
              <div style={{ border: '1px dashed #eee', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <div style={{ width: '100px', height: '100px', backgroundColor: '#e0e0e0', borderRadius: '50%', marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <span style={{ fontSize: '3rem', color: '#666' }}>👤</span>
                  </div>
                  <p><strong>First Name:</strong> {internData.name.split(' ')[0] || ''}</p>
                  <p><strong>Last Name:</strong> {internData.name.split(' ').slice(1).join(' ') || ''}</p>
                  <p><strong>ID:</strong> {internData.id}</p>
                  <p><strong>Company:</strong> {internData.company}</p>
              </div>
          </div>
          <div style={{ flex: 2 }}>
              <p><strong>Contract Status:</strong> <span className={`status-tag ${internData.contractStatus.toLowerCase()}`}>{internData.contractStatus}</span></p>
              <p><strong>Report Status:</strong> <span className={`status-tag ${internData.role.toLowerCase().replace(/\s/g, '-')}`}>{internData.role}</span></p> {/* Using role for 'Report Status' field */}
              <p><strong>E-mail:</strong> {internData.email}</p>
              <p><strong>Phone:</strong> {internData.phone}</p>
              <p><strong>Job Description:</strong> {internData.role}</p> {/* Displaying role as Job Description */}
              <p>
                    <strong>Desired knowledge in programming languages:</strong>{' '}
                    {internData.knowledge && Array.isArray(internData.knowledge)
                      ? internData.knowledge.join(', ')
                      : 'N/A (Field not in mock data, placeholder)'}
                  </p>
              <p><strong>Internship Activities:</strong></p>
                  <ul>
                      {/* Ensure internData.activities is a string, then split and map */}
                      {(internData.activities || '').split(',').map((activity, index) => (
                          <li key={index}>{activity.trim()}</li>
                      ))}
                  </ul>
          </div>
      </div>
    </div>
  );
};

export default InternDetails;