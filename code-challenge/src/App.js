import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/TammyBriggs/Phase-2-week-1-code-challenge/code-challenge/src/transactions')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => alert(error))
  }, []);
  

  const handleSubmit = e => {
    e.preventDefault();

    const highestId = data.reduce((acc, transaction) => {
      return transaction.id > acc ? transaction.id : acc;
    }, 0);

    const newId = highestId + 1;
    const newTransaction = {
      id: newId,
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: formData.amount
    };
    setData([...data, newTransaction]);
    setFormData({
      date: '',
      description: '',
      category: '',
      amount: ''
    });
    // PUT request to update the JSON file with the new transaction data
    fetch(`https://my-json-server.typicode.com/TammyBriggs/Phase-2-week-1-code-challenge/code-challenge/src/transactions/${newId}`, {
      method: 'PUT' ,
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(newTransaction)
    })
    .then(response => response.json())
  
    .catch(error => console.log(error));
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = id => {
    const newData = data.filter(row => row.id !== id);
    setData(newData); 

// DELETE request to remove the transaction data from the JSON file
fetch(`https://my-json-server.typicode.com/TammyBriggs/Phase-2-week-1-code-challenge/code-challenge/src/transactions/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
};

  const filteredData = data.filter(row => row.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <form>
        <input type="text" placeholder="Search by description" value={searchTerm} onChange={handleSearch} />
      </form>
    <table id='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      {filteredData.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.date}</td>
            <td>{row.description}</td>
            <td>{row.category}</td>
            <td>{row.amount}</td>
            <td><button onClick={() => handleDelete(row.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
     <form onSubmit={handleSubmit}>
         <label>
           Date:
           <input type="text" name="date" value={formData.date} onChange={handleChange} required />
         </label>
         <label>
           Description:
           <input type="text" name="description" value={formData.description} onChange={handleChange} required />
         </label>
         <label>
           Category:
           <input type="text" name="category" value={formData.category} onChange={handleChange} required />
         </label>
         <label>
           Amount:
           <input type="text" name="amount" value={formData.amount} onChange={handleChange} required />
         </label>
         <button type="submit">Add Transaction</button>
       </form>
     </div>

   );
}
      
export default App;
