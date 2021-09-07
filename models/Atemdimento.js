const conexao = require('../infraestrutura/conexao');
const moment = require('moment');
// moment.locale('pt-br');

class Atendimento{
 
  adiciona(atendimento,res) {
    const dataCriacao  = moment().format('YYYY/MM/DD HH:mm:ss');
    const data = moment(atendimento.data, 'DD/MM/YYYY HH:mm:ss').format('YYYY/MM/DD HH:mm:ss');
    const dataValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteValido = atendimento.cliente.length >= 5;
    
    
  

    const validacoes = [
      
      {
        nome: 'cliente',
        valido: clienteValido,
        mensagem: 'Quantidade de caracteres menor que 5'
      },
      {
        nome: 'data',
        valido: dataValida,
        mensagem: 'Data tem que ser igual ou superior'
      },

     
    ];

    const erros = validacoes.filter(campo => !campo.valido);
    

    if(erros.length > 0) {
      res.status(400).json(erros);
    }else{
      
      const atendimentoDatado = {...atendimento, dataCriacao, data};

      const sql = `INSERT INTO atendimentos SET ?`;

      conexao.query(sql, atendimentoDatado, (erro,resultados) =>{
        if(erro){
          res.status(400).json(erro)
        }else{
          res.status(201).json(resultados); 
        }
      })
    }    
   
    
  }

  pegarAtendimentos(res){
    const sql = `SELECT * FROM atendimentos`;
    
    conexao.query(sql,(erro,resultados) =>{
      if(erro) {
        console.log(erro);
      }else{
        res.status(200).json(resultados);
        
      }
    })
  
  }

  buscarPorId(id, res){
    
    const sql = `SELECT * FROM atendimentos where id=${id}`;

    conexao.query(sql,(erro, resultados) => {
      const result = resultados[0];
      if(erro){
        res.status(400).json(erro);
      }else{
        res.status(200).json(result);
      }
    })
  }
  
}

module.exports = new Atendimento;