import React,{useEffect,useState} from 'react';
import  {Link,useHistory} from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function Profile(){

  const [incidets,setIncidents] = useState([]);

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(()=>{
    api.get('profile',{
      headers : {
        Authorization : ongId,
      }
    }).then(response =>{
      console.log(response);
      setIncidents(response.data);
    });
  },[ongId]);

  async function handleDelete(id){
    try{
      await api.delete(`incidents/${id}`,{
        headers : {
          Authorization : ongId,
        }
      });

      setIncidents(incidets.filter(incidet => incidet.id !== id));
    }catch(err){
      alert('Erro ao deletar caso');
      console.log(err);
    }
  }

  function logout(){
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the hero"/>
        <span>Bem vinda,{ongName} </span>

        <Link  className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={logout} type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidets.map(incident =>(
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR',{style : 'currency',currency : 'BRL'}).format(incident.value)}</p>

            <button type="button" onClick={() => handleDelete(incident.id)}>
              <FiTrash2 size={20} color="a8a8b3"></FiTrash2>
            </button>
        </li>
        ))}
      </ul>
    </div>
  );
}