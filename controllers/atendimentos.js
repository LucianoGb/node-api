
const Atendimento = require('../models/Atemdimento')

module.exports = app =>{

  app.get('/atendimentos', (req,res) => {
    console.log(Atendimento.pegarAtendimentos(res));});

  app.get('/atendimentos/id=:id', (req,res) =>{
    const id = parseInt(req.params.id);
    
    Atendimento.buscarPorId(id, res);
 
  })  
  app.post('/atendimentos', (req, res) =>{ 
    const atendimento = req.body;
  Atendimento.adiciona(atendimento,res);
   
    });

  app.patch('/atendimentos/id=:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const valores = req.body;

    Atendimento.altera(id, valores, res);
  })  

  app.delete('/atendimentos/id=:id', (req, res) =>{
    const id = parseInt(req.params.id);
    Atendimento.deleta(id,res)
  })
}
