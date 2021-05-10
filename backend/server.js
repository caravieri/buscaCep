// cria um objeto do express
let express = require('express')

// criar o server do express
let server = express()

//cria um objeto da dependencia do cors
let cors = require('cors')

//associa o servidor ao cors
server.use(cors())

//cria um objeto para a dependencia node-correios
let Correios = require('node-correios')

//instanciar um objeto
let correios = new Correios()

server.get('/cep/:cep', (req, res) =>{
    let x = req.params.cep
    correios.consultaCEP({cep: x})
    .then(result =>{
        console.log(result)
        res.json(result)
    })
    .catch(erro => {
        console.log(erro)
    })
})

server.post(`/frete`, (req, res) => {
    console.log(req.body)
    let args = {
        nCdServico: req.body.servico,
        sCepOrigem: req.body.origem,
        sCepDestino: req.body.destino,
        nVlPeso: req.body.peso,
        nCdFormato: req.body.formato,
        nVlComprimento: req.body.comprimento,
        nVlAltura: req.body.altura,
        nVlLargura: req.body.largura,
        nVlDiametro: req.body.diametro
    }

    correios.calcPreco(args)
    .then(result => {
        console.log(result)
        res.json(result) //
    })
    .catch(erro => {
        console.log(erro)
    })

})
//definir uma rota com o metodo get
server.get('/cep', (req, resp) => {
    resp.send(`Aplicação em node com os correios`)
})

//porta do servidor
let porta = 3001

//sobe o servidor
server.listen(porta,() => {
    console.log(`Servidor na porta ${porta}`)
})