import React, { useCallback, useEffect, useState } from 'react';
import Filters from './components/Filters';
import JobCard from './components/JobCard';
import './styles/App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import { SnackbarProvider } from 'notistack';

// const jobData = [
//   {
//     company: "Amazon",
//     role: "Full Stack Developer",
//     experience: "1-3 yr",
//     type: "Onsite",
//     salary: "12LPA",
//     image: "/src/assets/logos/image 79.svg"  // ← example path
//   },
//   {
//     company: "Tesla",
//     role: "Node Js Developer",
//     experience: "1-3 yr Exp",
//     type: "Onsite",
//     salary: "12LPA",
//     image: "/src/assets/logos/image 78.svg"
//   },
//   {
//     company: "Swiggy",
//     role: "UX/UI Designer",
//     experience: "1-3 yr Exp",
//     type: "Onsite",
//     salary: "12LPA",
//     image: "/src/assets/logos/image 79.svg"
//   },
//   {
//     company: "Amazon",
//     role: "Full Stack Developer",
//     experience: "1-3 yr Exp",
//     type: "Onsite",
//     salary: "12LPA",
//     image: "/src/assets/logos/image 77.svg" 
//   },
// ];


function App() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const imagePaths = [
    '/src/assets/logos/image 77.svg',
    '/src/assets/logos/image 78.svg',
    '/src/assets/logos/image 79.svg'
  ];

  const fetchJobs = useCallback(async (filters = {}) => {
    try {
      const response = await axios.get('https://job-portal-backend-38l6.onrender.com/api/get-jobs', {
        params: filters,
      });

      const jobsWithImages = response.data.map(job => ({
        ...job,
        image: imagePaths[Math.floor(Math.random() * imagePaths.length)]
      }));
      setJobs(jobsWithImages);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
          <div className="app-container">
            <div className="header-box">
              <Navbar />
              <Filters onFilter={fetchJobs} />
            </div>
              <div className="job-list">
                {jobs.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </div>
          </div>
    </SnackbarProvider>

  );
}

export default App;
