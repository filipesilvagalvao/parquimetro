
//Classe que processa os inseridos no HTML
class SystemPark {
    //Propriedade privada com um array de objetos com os minutos e valores/preços tabelados
    #minutes = [
        {minutesTime: 30,values:1},
        {minutesTime: 60,values:1.75},
        {minutesTime: 120,values:3}
    ]
    //As propriedades cashInserted e timeInserted recebem o dinheiro e o tempo inseridos pelo user 
    constructor(cashInserted,timeInserted){
        this.cashInserted = cashInserted
        this.timeInserted = timeInserted
        this.#minutes
    }

    //Função que coloca o tempo(time)/preço(price) selecionado pelo user e faz a verificação
    setInfos(){
        const time = this.#minutes[this.timeInserted].minutesTime
        const price = this.#minutes[this.timeInserted].values
        //3 verificações se o valor é insuficiente, se há troco ou exibe somente o tempo
        if(this.cashInserted < price){
            return 'Valor Insuficiente!'
        }
        else if(this.cashInserted > price){
            return `Tempo: ${time} minutos
            Troco: R$${(this.cashInserted - price).toFixed(2).replace('.',',')}`
        }
        else{
            return `Tempo: ${time} minutos`
        }
    }
}

//Classe que recebe os dados inseridos no HTML, para enviar para a classe de processamento
class PanelPark {
    constructor(){
        this.time = Number(document.querySelector('input[name="timeVacancy"]:checked').value)//tempo selecionado pelo user
        this.payment = Number(document.querySelector('#payment').value)//valor de dinheiro inserido pelo user
    }

    setInfo(){
        return [this.payment,this.time]
    }
}

//Evento de clique ao botão para chamar as devidas funções das classes
document.querySelector('#confirm').addEventListener('click', (e)=>{
    e.preventDefault() //previne qualquer evento padrão desnecessário
    const panel = new PanelPark()                    //Istância classe PanelPark
    const system = new SystemPark(...panel.setInfo()) //Istância classe SystemPark

    document.querySelector('.message > span').innerText = system.setInfos() //Devolve uma mensagem no campo de mensagem no html
})