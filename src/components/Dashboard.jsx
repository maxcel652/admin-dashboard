import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InternModal from './InternModal';

import './styles/Dashboard.css'



const Dashboard = ({interns, setInterns}) => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentIntern, setCurrentIntern] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6; 
    

    // handle intern registration
    const handleInternRegistration = () =>{

        setModalMode('create');
        setCurrentIntern(null);
        setIsModalOpen(true);
    }

    // handle editing intern's information
    const handleEditIntern = (intern) =>{

        setModalMode('edit');
        setCurrentIntern(intern);
        setIsModalOpen(true);
    };

    // handle deleting intern
    const handleDeletIntern = (internId) =>{
        if(window.confirm(`Are you sure you want to delete intern with ID:${internId}?`)){
            setInterns(prevInterns => prevInterns.filter(intern => intern.id !== internId));

            if (paginatedInterns.length === 1 && currentPage > 1 && totalPages === currentPage) {
            setCurrentPage(currentPage - 1);
            }
        }
    }

    // update the intern which has been created, edited or delete

    const handleModalSubmit = (formData) =>{
        console.log(formData)

        if(modalMode==='create'){
            console.log('Creating new intern. formData for creation:', formData); 
            const newIntern = { ...formData, id: `NEW-${Date.now().toString().slice(-6)}`, contractStatus: 'pending', role: formData.jobDescription, name: `${formData.firstName} ${formData.lastName}`, company:`${formData.contractingCompany}` };
            setInterns((prevInterns) => [...prevInterns, newIntern]);
            setCurrentPage(1)

        }else {
            // Update logic for editing
            setInterns(prevInterns => prevInterns.map(intern =>
              intern.id === formData.id ? {
                  ...intern,
                  name: `${formData.firstName} ${formData.lastName}`,
                  company: formData.contractingCompany,
                  role: formData.jobDescription,
                  email: formData.email,
                  phone: formData.phone,
                  activities: formData.internshipActivities,
                  
              } : intern
            ));
          }
          setIsModalOpen(false)
    }

    const handleInternClick = (internId) => {
        navigate(`/interns/${internId}`);
      };

       //  Filter interns based on searchQuery
    const filteredInterns = interns.filter(intern => {
        const query = searchQuery.toLowerCase();
        return (
        intern.name.toLowerCase().includes(query) ||
        intern.id.toLowerCase().includes(query) ||
        intern.company.toLowerCase().includes(query)
        );
    })

    useEffect(()=>{
        setCurrentPage(1);
    }, [searchQuery])

    const totalPages = Math.ceil(filteredInterns.length / ITEMS_PER_PAGE);

    // Calculate the interns to display on the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedInterns = filteredInterns.slice(startIndex, endIndex);

     // Pagination button handlers
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePreviousPage = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(currentPage + 1);
  }


    // const hasFilteredInterns = interns.length > 0;
    const hasInternsToDisplay = paginatedInterns.length > 0;

  return (
    <>
        <div className="dashboard-controls">
            <h2>All internships</h2>
            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder='Search interns, contacts and agents'
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    />
            </div>
            <button className="primary" onClick={handleInternRegistration}>Register Intern</button>
        </div>

        {/* show interns if they are registered or display nothing if none present */}

        {hasInternsToDisplay? (
        <>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Internship</th>
                <th>Contract stats</th>
                <th>Vacancy</th> 
                <th>Company</th>
                <th></th> 
              </tr>
            </thead>
            <tbody>
              {paginatedInterns.map((intern) => (
                <tr key={intern.id}>
                  <td onClick={() => handleInternClick(intern.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    {intern.name}
                  </td>
                  <td>
                    <span className={`status-tag ${intern.contractStatus}`}>
                      {intern.contractStatus}
                    </span>
                  </td>
                  <td>{intern.role}</td> 
                  <td>{intern.company}</td>
                  <td className="action-icons">
                    
                    <span title="Edit" onClick={() => handleEditIntern(intern)}>✏️</span>
                    <span title="Delete" className="delete-icon" onClick={()=>handleDeletIntern(intern.id)}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Functional Pagination controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous page
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <span
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active-page' : ''}
                  onClick={() => handlePageChange(index + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  {index + 1}
                </span>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next page
              </button>
            </div>
          )}
        </>
      ) : (
            <div className="no-interns-message">
            {searchQuery ? "No interns found matching your search." : "No interns were found."}
            </div>
        )}

        <InternModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mode={modalMode}
            initialData={currentIntern}
            onSubmit={handleModalSubmit}
        />
        </>
    );
    };

export default Dashboard;