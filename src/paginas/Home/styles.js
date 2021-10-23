import styled from 'styled-components';

export const Titulo = styled.h1`
 color:#3e3e3e;
 font-size:23px;
 margin-bottom: 10px;
 text-align:center;
`;

export const Table = styled.table`
  width: 100%;
  th{
      background-color:#DAA520;
      color: black;
      padding:10px;
  }
  td{
       background-color:#f6f6f6;
       color: #3e3e3e;
       padding:8px;

  }
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