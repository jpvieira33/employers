import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { Container, ConteudoForm, ConteudoTitulo, Titulo, AlertSuccess, AlertDanger, Label } from './styles.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react/cjs/react.development";
import Moment from 'moment';

export const Editar = (props) => {
    
    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [salario, setSalario] = useState('');
    const [cargo_id, setCargo] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editFunc = async e => {
        e.preventDefault();
   
        await fetch("http://funcionario.com/edit.php", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nome, sobrenome, nascimento, salario, cargo_id })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if(responseJson.erro){
                 setStatus({
                     type:'erro',
                     mensagem:responseJson.mensagem
                 });
            }else{
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
                mensagem: 'Funcionário não foi atualizado, Erro!'
            });
        });
    }

    useEffect(() => {
        const getFuncionario = async () => {
            await fetch("http://funcionario.com/view.php?id=" + id)
                .then((response) => response.json())
                .then((responseJ) => {
                    console.log(responseJ)
                    setNome(responseJ.funcionario.Nome);
                    setSobrenome(responseJ.funcionario.Sobrenome);
                    setNascimento(responseJ.funcionario.Nascimento);
                    setSalario(responseJ.funcionario.Salario);
                    setCargo(responseJ.funcionario.IdCargo);
                });
        }
        getFuncionario();
    }, [id]);

    return (
      <Container>
          <ConteudoForm>
              <ConteudoTitulo>
                  <Titulo><FontAwesomeIcon icon= {faEdit} /> Editar Funcionário</Titulo>
                  <Link to="/"><Button title="Lista de Funcionários" color='primary'><FontAwesomeIcon icon={faUsers} /></Button></Link>
              </ConteudoTitulo>
                {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
         <Form onSubmit={editFunc}>
                <Label htmlFor="">Nome:</Label>
                <input className="form-control" type="text" name="nome" id="nome" placeholder="Nome do Funcionário"  value={nome} onChange={e => setNome(e.target.value)} />

                <Label htmlFor="">Sobrenome:</Label>
                    <input className="form-control" type="text" name="sobrenome" id="sobrenome" placeholder="Sobrenome do Funcionário" value={sobrenome} onChange={e => setSobrenome(e.target.value)} />

                <Label htmlFor="">Data de Nascimento:</Label>
                    <input className="form-control" type="date" name="nascimento" id="nascimento" value={nascimento} onChange={e => setNascimento(e.target.value)} />

                <Label htmlFor="">Salário:</Label>
                    <input className="form-control" type="number" min="0" step="0.01" name="salario" id="salario" value={salario} onChange={e => setSalario(e.target.value)} />

                <Label htmlFor="">Cargo:</Label>
                    <select className="form-control" name="cargo" id="cargo" value={cargo_id} onChange={e => setCargo(e.target.value)} >
                    <option value="">Selecione o Cargo</option>
                        <option value="1" >Analista</option>
                        <option value="2" >Desenvolvedor</option>
                        <option value="3" >Tester</option>
                </select>
                <Button color="warning" className="mt-4" type="submit">Editar</Button>
         </Form>
        </ConteudoForm>
      </Container>
    );
}