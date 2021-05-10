import React, {Component} from 'react'

import axios from 'axios'

export default class Cep extends Component {
   
     constructor(){
        super()
        this.state = {
            cep: '',
            endereco: ''
        }
    }

    setCep(e){
        this.setState({
            cep: e.target.value
        })
    }

    consultaCep(){
        const url = `http://localhost:3001/cep/${this.state.cep}`
            axios.get(url)
            .then(resposta => {
                this.setState({endereco: resposta.data})
                })
    }

    render(){
        return(
            <div className="container">
                <h2> Exemplo de consulta ao CEP</h2>
                <form>
                    <div className="form-group">
                        <input value ={this.state.cep} onChange={ e => this.setCep(e)} 
                            type="number" className = "form-control"/>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={ e => this.consultaCep()} className="btn btn-primary"> Consulta </button>
                    </div>
                    <div className="form-group">
                        <ul>
                            <li> Logradouro: {this.state.endereco.logradouro}</li>
                            <li> Bairro: {this.state.endereco.bairro}</li>
                            <li> Localidade: {this.state.endereco.localidade}</li>
                            <li> UF: {this.state.endereco.uf}</li>
                            <li> DDD: {this.state.endereco.ddd}</li>
                        </ul>
                    </div>
                </form>
            </div> 
        )
    }
}