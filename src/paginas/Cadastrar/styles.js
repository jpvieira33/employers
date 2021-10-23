import styled from 'styled-components';

export const Container = styled.section`
    font-family: Trebuchet MS, sans-serif;
    max-width: 960px;
    margin: 20px auto;
    box-shadow: 0 0 1em #6c757d;
`;

export const ConteudoTitulo = styled.section`
    display: flex;
    justify-content: space-between;
`;

export const Form = styled.form`
    margin: 0px auto;
`;

export const ConteudoForm = styled.section`
    max-width: 960px;
    padding: 10px 30px 30px;
`;

export const Titulo = styled.h1`
 color:#3e3e3e;
 font-size:23px;
`;

export const AlertSuccess = styled.p`
    background-color: #d1e7dd;
    color: #0f5132;
    margin: 20px 0;
    border: 1px solid #badbcc;
    border-radius: 4px;
    padding: 7px;
`;

export const AlertDanger = styled.p`
    background-color: #f8d7da;
    color: #842029;
    margin: 20px 0;
    border: 1px solid #f5c2c7;
    border-radius: 4px;
    padding: 7px;
`;

export const Label = styled.label`
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    font-weight:bold;
`;




