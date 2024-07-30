import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import JobCard from '../JobCard';

const CompanyDetail = ({ currentUser }) => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set(currentUser ? currentUser.applications : []));

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`YOUR_BACKEND_API_URL/companies/${handle}`);
        setCompany(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompany();
  }, [handle]);

  const applyToJob = (id) => {
    setAppliedJobs(new Set([...appliedJobs, id]));
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <p>{company.numEmployees} employees</p>
      <div>
        <h2>Jobs at {company.name}</h2>
        {company.jobs.map(job => (
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

export default CompanyDetail;