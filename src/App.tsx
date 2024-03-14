// App.tsx

import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface DataItem {
  name: string;
  email: string;
}

function App() {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState<DataItem[]>([]);

  // Fetch data from server on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from server
  const fetchData = async () => {
    try {
      const response: AxiosResponse<DataItem[]> = await axios.get('http://localhost:5000/getData');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/appendData', formData);
      console.log('Data appended successfully');
      // Refresh data after appending
      fetchData();
    } catch (error) {
      console.error('Error appending data:', error);
    }
  };

  // Function to handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Append and Display Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2>Displayed Data:</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name} - {item.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
