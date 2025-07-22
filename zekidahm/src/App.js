import React, { useState } from 'react';

function App() {
  const [text, setText] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTableData([...tableData, text]);
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} />
        <button type="submit">Add to Table</button>
      </form>
      <table>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;