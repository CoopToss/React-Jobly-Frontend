import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../JobCard';

const JobList = ({ currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(new Set(currentUser ? currentUser.applications : []));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`MY_BACKEND_API_URL/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`MY_BACKEND_API_URL/jobs`, { params: { title: searchTerm } });
      setJobs(response.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const applyToJob = (id) => {
    setAppliedJobs(new Set([...appliedJobs, id]));
  };

  return (
    <div>
      <h1>Job Listings</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search jobs" 
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            hasApplied={appliedJobs.has(job.id)}
            applyToJob={applyToJob} 
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;

