import React, {useEffect, useState} from 'react';
import { Link , useParams} from "react-router-dom"
import {useSelector, connect, useDispatch } from 'react-redux';
import { selectAllusuario,fetchUsuario,selectusuarioById, deleteusuarioServer} from '../AddPerfil/SlicePerfil.js'

function Usuario(props){

  const usuarios = useSelector(selectAllusuario)

  const status = useSelector(state => state.usuario.status);
  const error = useSelector(state => state.usuario.error);
  
    
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'not_loaded' ) {
        dispatch(fetchUsuario())
    }else if(status === 'failed'){
        setTimeout(()=>dispatch(fetchUsuario()), 5000);
    }
  }, [status, dispatch])
  
  
  
  let UsuarioInfo = '';
  let checkUser = '';
  if(status === 'loaded' || status === 'saved' || status === 'deleted'){
    UsuarioInfo = <User usuario={usuarios}/>;
    checkUser = <CheckUser usuario={usuarios}/>;
  }else if(status === 'loading'){
    UsuarioInfo = <div>Carregando Informações Extras...</div>;
  }else if(status === 'failed'){
    UsuarioInfo = <div>Error: {error}</div>;
  }


     return( <>
          {UsuarioInfo}
          {checkUser}
   </>
   );
}

function User (props) 
{
  return(
    <aside>
     
      <div className = "container">
         <div className="col-xs-6">
           <img class="img2" src="https://www.construtoracesconetto.com.br/wp-content/uploads/2020/03/blank-profile-picture-973460_640.png" alt="img" height="200px" width="200px" />
         </div>
        <div id="textousuario">
          <div class = "col-xs-6">
            <h1> 
            {props.usuario[0].nome}</h1>
           <div><h3>Bio:{props.usuario[0].bio}</h3></div>
           <div><h3> 
                Áreas de Atuação:{props.usuario[0].areaAt}</h3></div>
           </div>
         </div>
         <br />
       </div>
       
  </aside>
  )
}

function CheckUser(props) {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!users){
    fetch("http://localhost:3004/users").then(x =>
      x.json().then(y => {
        setUsers(y);
        setLoading(false);
      })
    );
  }
  
  }, [users,dispatch]);

  if (loading) {
    return (<div> Carregando... </div>)
  }
  
  if (users.name == props.usuario[0].usuario){
    return (
      <div>
       <Link to ={`/Altera/${props.usuario[0].id}`}>
          <input type="submit" value="editar" name = 'Editar' onClick = {() =>document.documentElement.scrollTop = 0} />
          </Link>
      </div>
    )
  }
  else{
    return (<div>  </div>)
  }
}

export default connect(state => ({ nome : state }))(Usuario);