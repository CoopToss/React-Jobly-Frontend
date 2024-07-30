import React, { useState } from 'react';
import JoblyApi from '../api';

const JobCard = ({ job, hasApplied, applyToJob }) => {
  const [applied, setApplied] = useState(hasApplied);

  const handleApply = async () => {
    if (!applied) {
      try {
        await JoblyApi.applyToJob(job.id);
        setApplied(true);
        applyToJob(job.id);
      } catch (error) {
        console.error('Error applying to job:', error);
      }
    }
  };

  return (
    <div>
      <h2>{job.title}</h2>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
};

export default JobCard;