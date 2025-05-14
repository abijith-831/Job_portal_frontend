import React, { useRef, useState } from 'react';
import '../styles/JobModal.css';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const JobModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Internship',
    minSalary: '',
    maxSalary: '',
    deadline: '',
    description: ''
  });


  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async () => {
    const {
      title,
      company,
      location,
      jobType,
      minSalary,
      maxSalary,
      deadline,
      description,
    } = formData;
  
    const jobData = {
      job_title: title,
      company_name: company,
      location,
      job_type: jobType,
      salary_min: minSalary,
      salary_max: maxSalary,
      deadline,
      description,
    };
  
    try {
      console.log('Sending job data:', jobData);
      const response = await axios.post('https://job-portal-backend-38l6.onrender.com/api/submit-jobs', jobData);
  
      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar('Job posted successfully!', { variant: 'success' });
        onClose()
      } else {
        enqueueSnackbar('Failed to post job.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      enqueueSnackbar('An error occurred while submitting the job.', { variant: 'error' });
    }
  };
  

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" ref={modalRef}>
        <h2>Create Job Opening</h2>

        <div className="form-row">
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Full Stack Developer" />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Amazon, Microsoft, Swiggy" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Choose Preferred Location" />
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <div className="custom-select-wrapper">
              <select className="custom-select" name="jobType" value={formData.jobType} onChange={handleChange}>
                <option value="Internship">Internship</option>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Salary Range</label>
            <div className="salary-range">
              <input type="text" name="minSalary" value={formData.minSalary} onChange={handleChange} placeholder=".        ₹ 0" className="input-icon" />
              <input type="text" name="maxSalary" value={formData.maxSalary} onChange={handleChange} placeholder=".        ₹ 12,00,000" className="input-icon" />
            </div>
          </div>

          <div className="form-group">
            <label>Application Deadline</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea
            className="description-box"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please share a description to let the candidate know more about the job role"
          />
        </div>

        <div className="btn-group">
          <button onClick={onClose} className="save-btn">
            Save Draft
            <img src="/logos/d-arrow.png" alt="Arrow" className="arrow-icon" />
          </button>
          <button className="publish-btn" onClick={handleSubmit}>
            Publish
            <img src="/logos/r-arrow.png" alt="Arrow" className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
