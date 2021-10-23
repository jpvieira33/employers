import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Home} from './paginas/Home'
import { Cadastrar } from './paginas/Cadastrar'
import {Visualizar} from './paginas/Visualizar'
import {Editar} from './paginas/Edit'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 return (
    <div>
       <Router>
           <Switch>
               <Route exact path="/" component={Home}   />
               <Route path="/cadastrar" component={Cadastrar} />
               <Route path="/visualizar/:id" component={Visualizar} />
                <Route path="/editar/:id" component={Editar} />
           </Switch>
       </Router>
    </div>
    );
}

export default App;