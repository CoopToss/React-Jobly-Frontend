import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyCard from '../CompanyCard';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('my_api_url/companies', {
          params: { name: searchTerm }
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies', error);
      }
    };

    fetchCompanies();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Search for companies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {companies.map(company => (
        <CompanyCard key={company.handle} company={company} />
      ))}
    </div>
  );
};

export default CompanyList;