import React from 'react';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
        <Link to={`/companies/${company.handle}`}>View Details</Link>
    </div>
  );
};

export default CompanyCard;