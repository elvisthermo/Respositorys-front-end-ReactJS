import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {

  const  [repositories,setRepositories] =  useState([]);
  
  useEffect(()=>{
    api.get('repositories').then(response=>{
      console.log(response.data)
      setRepositories(response.data)
    });

  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:`Random Repository ${Date.now()}`,
      owner:"anonimo",
      techs:["java","javascript"]

  });
  const repositorie = response.data;

  setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    const repositor = [...repositories];
    const findIndex = repositor.findIndex(item=> item.id === id);
    
    repositor.splice(findIndex, 1);
  
    setRepositories(repositor);
    
  }

  return (
    
    <div>
      <ul data-testid="repository-list">
      {repositories.map(item=>(
        <li key={item.id}>
        {item.title}
        <button onClick={() => handleRemoveRepository(item.id)}>
          Remover
        </button>
      </li>

      ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
