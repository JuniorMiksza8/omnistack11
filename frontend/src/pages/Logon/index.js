import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

import heroesImage from '../../assets/heroes.png';
import logoImage from '../../assets/logo.svg';

export default function Logon(){

  const [id,setID] = useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();
    try{

      const response = await api.post('sessions',{id});
      
      localStorage.setItem('ongId',id);
      localStorage.setItem('ongName',response.data.name);

      history.push('/profile');
    }catch(err){
      alert('Falha no login,tente novamente.');
      console.log(err);
    }
  }

  return(
    <div className="logon-container">
      <section className="form">

        <img src={logoImage} alt="Be the hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input 
          placeholder="Sua ID"
          value={id}
          onChange={e => setID(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>

        </form>
      </section>

      <img src={heroesImage} alt="Heroes"/>

    </div>
  );
} 