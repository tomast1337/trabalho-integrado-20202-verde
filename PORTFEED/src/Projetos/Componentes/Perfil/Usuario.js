import React from 'react';
import ReactDOM from 'react-dom';

class Usuario extends React.Component {
  render(){
  return(
    <div className = "container">
	     <div className="col-xs-6">
         <img class="img2" src="https://www.construtoracesconetto.com.br/wp-content/uploads/2020/03/blank-profile-picture-973460_640.png" alt="img" height="200px" width="200px" />
       </div>
      <div id="textousuario">
        <div class = "col-xs-6">
          <h1> 
             {descricao.nome}</h1>
         <div><h3>Bio:{descricao.bio}</h3></div>
         <div><h3> 
             Areas de Atuacao:{descricao.areaAt}</h3></div>
         </div>
       </div>
       <br />
     </div>
   );
   }
  
}
ReactDOM.render(
  <Usuario />,
  document.getElementById('root')
);

export default Usuario;