import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Container,ConteudoForm, ConteudoTitulo, Titulo, AlertSuccess, AlertDanger, Label } from './styles.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faUsers } from '@fortawesome/free-solid-svg-icons'


export const Cadastrar = () => {
    const[funcionario, setFunc] = useState({
        nome: '',
        sobrenome: '',
        nascimento: '',
        salario: '',
        cargo: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const cad = e => setFunc({ ...funcionario,[e.target.name]: e.target.value })

    const cadastrarFunc = async e =>{
        e.preventDefault();
       // console.log(funcionario)
        await fetch("http://funcionario.com/cadastrar.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ funcionario })
        })
          .then((response) => response.json()) 
          .then((responseJ) => {
                console.log(responseJ)
                if (responseJ.erro) {
                    setStatus({
                        type: 'erro',
                        mensagem: responseJ.mensagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        mensagem: responseJ.mensagem
                    });
                }
            })
            .then(() => {
                setTimeout(() => {
                    window.location.href = "/"
                }, 2500);
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    mensagem: 'Funcionário não foi cadastro, Erro!'
                });
            });
    }

   return (
       <Container>
           <ConteudoForm>
               <ConteudoTitulo>
                   <Titulo><FontAwesomeIcon icon={faSave} /> Cadastro de Funcionários</Titulo>
                       <Link to="/"><Button title="Lista de Funcionários" color='primary'><FontAwesomeIcon icon={faUsers} /></Button></Link>
               </ConteudoTitulo>
           {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
           {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
           <Form onSubmit={cadastrarFunc}>
               <Label htmlFor="">Nome:</Label>
                   <input className="form-control" type="text" name="nome" id="nome" placeholder="Nome do Funcionário" onChange={cad} required />

                   <Label htmlFor="">Sobrenome:</Label>
                   <input className="form-control" type="text" name="sobrenome" id="sobrenome" placeholder="Sobrenome do Funcionário" onChange={cad} required/>

                   <Label htmlFor="">Data de Nascimento:</Label>
                   <input className="form-control" type="date" name="nascimento" id="nascimento" onChange={cad} required/>

                   <Label htmlFor="">Salário:</Label>
                   <input className="form-control" type="number" min="0" step="0.01" name="salario" id="salario" onChange={cad} required />

                   <Label htmlFor="">Cargo:</Label>
                   <select className="form-control" name="cargo" id="cargo" onChange={cad} required>
                       <option value="">Selecione o Cargo</option>
                       <option value="1">Analista</option>
                       <option value="2">Desenvolvedor</option>
                       <option value="3">Tester</option>
                   </select>
                   <Button color="success" className="mt-4" type="submit" >Cadastrar</Button>
           </Form>
           </ConteudoForm>
       </Container>
    );
}

