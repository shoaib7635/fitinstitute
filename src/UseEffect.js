import { useEffect, useState } from 'react';

function BasicExample() {
  const [name, setName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (savedName) {
      setName(savedName);
    }
    console.log(savedName)
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
    localStorage.setItem('username', e.target.value);
  };

  return (
    <div>
      <h2>Welcome, {name || "Guest"}!</h2>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
    </div>
  );
}

export default BasicExample;
