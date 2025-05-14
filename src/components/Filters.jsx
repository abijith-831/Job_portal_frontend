import React, { useState, useEffect } from 'react';
import '../styles/Filters.css';
import searchIcon from '../assets/logos/Vector.png';
import locationIcon from '../assets/logos/location.png';
import jobTypeIcon from '../assets/logos/jobtype.png';

function Filters({ onFilter }) {
  const minSalary = 50000;
  const [maxSalary, setMaxSalary] = useState(60000);

  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salary: maxSalary,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilter(filters);
    }, 300);
    return () => clearTimeout(timeout);
  }, [filters, onFilter]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'salary') {
      const newMax = parseInt(value, 10);
      setMaxSalary(newMax);
      setFilters(prev => ({ ...prev, salary: newMax }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="filters">
      <div className="filter-item">
        <img src={searchIcon} alt="Search" className="filter-icon" />
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
          placeholder="Search By Job Title, Role"
        />
      </div>

      <div className="filter-item">
        <img src={locationIcon} alt="Location" className="filter-icon" />
        <select name="location" value={filters.location} onChange={handleChange}>
          <option value="">Preferred Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Calicut">Calicut</option>
        </select>
      </div>

      <div className="filter-item">
        <img src={jobTypeIcon} alt="Job Type" className="filter-icon" />
        <select name="jobType" value={filters.jobType} onChange={handleChange}>
          <option value="">Job Type</option>
          <option value="Internship">Internship</option>
          <option value="FullTime">FullTime</option>
          <option value="PartTime">PartTime</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="filter-item">
        <div className="salary-filter">
          <div className='salary-amount-range' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label >Salary Per Month</label>
            <label>₹ {minSalary / 1000}k</label>
            <label>₹ {maxSalary / 1000}k</label>
          </div>
          <input
            type="range"
            name="salary"
            min={minSalary}
            max="100000"
            value={maxSalary}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
