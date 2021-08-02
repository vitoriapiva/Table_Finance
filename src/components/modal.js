import React,{useState, useEffect} from 'react'
import '../App.css'
import './modal.css'

function Modal({functionFechar}) { 
    const [descricao,setDescricao] = useState('');
    const [valor,setValor] = useState('');
    const [data,setData] = useState('');

      const functionSalvar = () => {
      
        const novoItem = {
          descricao: descricao,
          valor: valor,
          data: data,
        }; 
          if ( 
              descricao.trim() === "" ||
              valor.trim() === "" ||
              data.trim() === "" ) {
                  alert("Por favor, preencha todos os campos")
              }
              else {
                functionFechar(novoItem)
              }
            }
    return (
        <div id="box">
        <div id="form" class="card">

                  <h2> NOVA TRANSAÇÃO </h2>                  
                    <div class="input-group">
                      <label 
                       class="sr-only"
                       for="descrição"> 
                       Descrição 
                      </label>
                      <input 
                        id="descricao"
                        value={descricao}
                        onChange={event => setDescricao(event.target.value)}
                        type="text" 
                        name="descricao" 
                        placeholder="Descrição"/>
                    </div>

                    <div class="input-group">
                        <label 
                          class="sr-only"
                          for="valor"> 
                          Valor 
                        </label>
                        <input
                          id="valor"
                          value={valor}
                          onChange={event => setValor(event.target.value)}
                          type="number"
                          step="0.01" 
                          name="valor"
                          placeholder="0,00"/>
                    </div>

                      <p>
                        Use o sinal - (negativo) para despesas e , (virgula) pra casas decimais   
                      </p>
                                                         
                    <div class="input-group">
                      <label 
                        class="sr-only"
                        for="data">
                        Data
                      </label>
                      <input 
                        id="data"
                        value={data}
                        onChange={event => setData(event.target.value)}
                        type="date"
                        name="data" 
                        placeholder="dd/mm/yyyy"/>
                    </div>

                    <div class="input-group action">
                        <button type='button' onClick={() => functionFechar({})} class='buttonCancel'> Cancelar</button>
                        <button type='button' onClick={functionSalvar} class='buttonSave'> Salvar </button>
                        
                    </div>
            </div>
        </div>
    )
}

export default Modal;