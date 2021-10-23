import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react/cjs/react.development";
import { Titulo, AlertSuccess, AlertDanger } from './styles.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faPlus, faEye, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'reactstrap';


export const Home = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const getFuncionarios = async () => {
        fetch("http://funcionario.com/index.php")
            .then((response) => response.json())
            .then((responseJson) => (
                //console.log(responseJson),
                setData(responseJson.registros)
            ));
    }

    const delFunc = async (idFunc) =>{
        await fetch("http://funcionario.com/delete.php?id=" + idFunc)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.erro) {
                setStatus({
                    type: 'erro',
                    mensagem: responseJson.mensagem
                });
            } else {
                setStatus({
                    type: 'success',
                    mensagem: responseJson.mensagem
                });

            }
        }).then(() => {
            setTimeout(() => {
                window.location.href = "/"
            }, 2500);

        }).catch(() => {
            setStatus({
                type: 'erro',
                mensagem: 'Funcionário não foi deletado, Erro!'
            });
        });
    };

    useEffect(() => {
        getFuncionarios();
    }, [])
    
    return (
        <div className="mt-5 p-2">
            <Titulo> <FontAwesomeIcon icon={faUsers} /> Lista de Funcionários   <Link to="/cadastrar"> <Button color="primary" title="Adicionar Funcionário" className=" ml-2 btn btn-sm"><FontAwesomeIcon icon={faPlus} /></Button> </Link> </Titulo>
            {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
            {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
            <Table className="mt-2" striped bordered hover variant="dark" responsive>
                <thead className="mt-5">
                    <tr>
                        <th>#ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Cargo</th>
                        <th>Nascimento</th>
                        <th>Salário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(funcionario => (
                        <tr key={funcionario.id}>
                            <td>{funcionario.id}</td>
                            <td>{funcionario.Nome}</td>
                            <td>{funcionario.Sobrenome}</td>
                            <td>{funcionario.Cargo}</td>
                            <td>{funcionario.Nascimento}</td>
                            <td>R$ {funcionario.Salario}</td>
                            <td><Link to={"/visualizar/" + funcionario.id}><Button color="info" title="Visualizar" className="btn-sm" style={{ marginRight: 0.5 + 'em' }}> <FontAwesomeIcon icon={faEye} /></Button></Link>
                                <Link to={"/editar/" + funcionario.id}><Button color="warning" title="Editar" className="btn-sm" style={{ marginRight: 0.5 + 'em' }}> <FontAwesomeIcon icon={faUserEdit} /></Button></Link>
                                <Button color="danger" title="Remover" className="btn-sm" onClick={() => delFunc(funcionario.id)}> <FontAwesomeIcon icon={faUserTimes} /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    );
}

