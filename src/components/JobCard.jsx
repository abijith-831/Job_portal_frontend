import React from 'react';
import '../styles/JobCard.css';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="top-bar">
        <div className="logo-box">
          <img className="company-logo" src={job.image} alt={job.company} />
        </div>
        <span className="posted-time">24h Ago</span>
      </div>
      <h3>{job.job_title}</h3>
      <div className="job-info">
        <span>
          <img src="/src/assets/logos/Vector (1).png" alt="experience" className="icon" />
          1 - 3 yr Exp
        </span>
        <span>
          <img src="/src/assets/logos/Vector (2).png" alt="onsite" className="icon" />
          Onsite
        </span>
        <span>
          <img src="/src/assets/logos/Vector (3).png" alt="salary" className="icon" />
          ₹ {job.salary_max} 
        </span>
      </div>
      <ul>
        <li>A user-friendly interface lets you browse stunning photos and videos</li>
        <li>Filter destinations based on interests and travel style</li>
      </ul>
      <button className="apply-btn">Apply Now</button>
    </div>
  );
}

export default JobCard;
