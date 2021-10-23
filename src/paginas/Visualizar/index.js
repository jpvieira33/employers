import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Titulo, ConteudoTitulo, ConteudoProd} from './styles'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faEye } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react/cjs/react.development';

export const Visualizar = (props) => {

    const[data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    useEffect(() => {
        const getFuncionario = async () => {
            await fetch("http://funcionario.com/view.php?id=" + id)
            .then((response) => response.json())
            .then((responseJ)=> {
                  setData(responseJ.funcionario);
            })
        }
        getFuncionario();
    },[id])

     return (
      <Container>
           <ConteudoTitulo>
                 <Titulo><FontAwesomeIcon icon={faEye} /> Visualizar</Titulo>
                 <Link to="/"><Button title="Lista de Funcionários" color='primary'><FontAwesomeIcon icon={faUsers} /></Button></Link>
           </ConteudoTitulo>
             <ConteudoProd> <strong>#ID:</strong> {data.id}</ConteudoProd>
             <ConteudoProd> <strong> Nome:</strong> {data.Nome} </ConteudoProd>
             <ConteudoProd><strong> Sobrenome:</strong> {data.Sobrenome} </ConteudoProd>
             <ConteudoProd> <strong>Nascimento: </strong> {data.Nascimento} </ConteudoProd>
             <ConteudoProd> <strong>Salário:</strong> R$ {data.Salario} </ConteudoProd>
             <ConteudoProd> <strong>Cargo:</strong> {data.Cargo} </ConteudoProd>   
      </Container>
     );
}