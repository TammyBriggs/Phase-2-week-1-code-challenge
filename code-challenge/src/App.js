import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     date: '',
//     description: '',
//     category: '',
//     amount: ''
//   });

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

//   const handleSubmit = e => {
//     e.preventDefault();
//     const newId = data.length + 1;
//     const newTransaction = {
//       id: newId,
//       date: formData.date,
//       description: formData.description,
//       category: formData.category,
//       amount: formData.amount
//     };
//     setData([...data, newTransaction]);
//     setFormData({
//       date: '',
//       description: '',
//       category: '',
//       amount: ''
//     });
//   };

//   const handleChange = e => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

  return (
    <div>
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
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.date}</td>
            <td>{row.description}</td>
            <td>{row.category}</td>
            <td>{row.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
{/* //     <form onSubmit={handleSubmit}>
//         <label>
//           Date:
//           <input type="text" name="date" value={formData.date} onChange={handleChange} required />
//         </label>
//         <label>
//           Description:
//           <input type="text" name="description" value={formData.description} onChange={handleChange} required />
//         </label>
//         <label>
//           Category:
//           <input type="text" name="category" value={formData.category} onChange={handleChange} required />
//         </label>
//         <label>
//           Amount:
//           <input type="text" name="amount" value={formData.amount} onChange={handleChange} required />
//         </label>
//         <button type="submit">Add Transaction</button>
//       </form> */}
     </div>

   );
 }

export default App;
