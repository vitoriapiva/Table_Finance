import React,{useEffect, useState} from 'react'

import './App.css';
import logo from './assets/logo.svg'
import income from './assets/income.svg'
import expense from './assets/expense.svg'
import total from './assets/total.svg'
import minus from './assets/minus.svg'

import Modal from './components/modal'

function App(valor) {
  const [dadoTable,setDadoTable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [somatoria, setSomatoria] = useState(0);
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);
  
  useEffect(() => {
      const tabelaPositive = dadoTable.filter((item) => {return item.valor > 0} )
      const income = tabelaPositive.reduce((entradaAtual, novaEntrada) => {
        return parseFloat(entradaAtual) + parseFloat(novaEntrada.valor);
      },0);
      setEntrada(income)
}, [dadoTable]) 

  useEffect(() => {
    const tabelaNegative = dadoTable.filter((item) => {return item.valor < 0} )
    const expense = tabelaNegative.reduce((saidaAtual, novaSaida) => {
    return parseFloat(saidaAtual) + parseFloat(novaSaida.valor);
    }, 0);
      setSaida(expense)
  }, [dadoTable]) 

  useEffect (() => {
    const total = dadoTable.reduce((acumulador, valorAtual) => parseFloat(acumulador) + parseFloat( valorAtual.valor), 
    0,
    );
    setSomatoria(total)
  }, [dadoTable] ) 

  function currencyFormatter(value) {
    if (!Number(value)) return 0
    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
    return amount
  } 

  function dataFormatada(data){
    const newData = data.split("-")
    return `${newData[2]}/${newData[1]}/${newData[0]}`
}


  const functionFechar= (item) => {
    
    console.log("item :" + JSON.stringify(item))
    if (item.valor === undefined) {
      
      setShowModal(false)
      return
    }
    const novoItem = {
      id: dadoTable.length === 0 ? 1 : dadoTable.length+1,
      descricao: item.descricao,
      valor: item.valor,
      data: item.data,
    }; 
    console.log(JSON.stringify(novoItem, null, 2))
    const listaTable = Array.from(dadoTable);


    listaTable.push(novoItem);
    setDadoTable(listaTable)
    setShowModal(false);
  }
  const functionExcluir = (index) => {

    const listaTable = Array.from(dadoTable);

    listaTable.splice(index, 1);

    setDadoTable(listaTable);

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Dev. Finance$"/>
      </header>

      <div class="container"> 
        <div id="section-balance"/> 
              <h2 class="sr-only"> Balanço</h2>
              <div class="cart"> 
                  <h3>
                  Entrada 
                    <img src={income} alt="Entrada"/>
                  </h3>
                  <p id="incomeDisplay"> {entrada.toLocaleString('pt-br', {style:'currency', currency:'BRL'})} </p>  
              </div>
              <div class="cart"> 
                  <h3>
                    Saida
                    <img src={expense} alt="Saida"/>
                  </h3>
                  <p id="expenseDisplay"> {saida.toLocaleString('pt-br', {style:'currency', currency:'BRL'})} </p>  
              </div>
              <div class="cart total"> 
                  <h3>
                    Total
                    <img src={total} alt="Total"/>
                  </h3>
                  <p id="total"> {somatoria.toLocaleString('pt-br', {style:'currency', currency:'BRL'})} </p>  
              </div>
          </div>
            
          <div id="transaction">
              <h2 class="sr-only"> Transações </h2> 
              <button type='button' onClick={() => setShowModal(true)} class='buttonText'> + Nova transação  </button>
              <table id="data-table"> 
                  <thead> 
                      <tr>
                          <th> Descrição </th>
                          <th> Valor  </th>
                          <th> Data </th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      dadoTable.map((item,index) => (
                        <tr key={item.id}>
                          <td>
                            {
                              item.descricao
                            }
                          </td>
                          <td>
                           {
                             currencyFormatter(item.valor)
                            }
                           
                          </td>
                          <td>
                            {
                              dataFormatada(item.data)
                            }
                          </td>
                          <td>
                          <img src={minus} alt="Excluir" onClick={() => functionExcluir(index)}/>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
              </table>
        </div>
        {
          showModal && (
          <Modal functionFechar = {functionFechar} id = { dadoTable.length === 0 ? 1 : dadoTable.length+1}/>
          )
        }
        <footer><p>2021 - dev.Finance$</p></footer>
        
      </div>      
  );
}

export default App;
