import React, { useState } from 'react';

function Acordeon({ children }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button className="acordeon" onClick={toggleForm}>
        Publicar noticia
      </button>
      {showForm && children}
    </div>
  );
}

export default Acordeon;
