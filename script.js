const botoesCardapio = document.querySelectorAll(".btnAbaCategoria")
const cardapio = document.querySelectorAll(".cartaoProduto")
const linksMobile = document.querySelectorAll(".painelMenuMobile a")
const botoesAdicionarItem = document.querySelectorAll(".btnAdicionarItem")
const pontoStatusFuncionamento = document.querySelector(".pontoStatus")
const textoStatusFuncionamento = document.querySelector(".textoStatus")
const divCarrinhoLateral = document.querySelector(".divCarrinhoLateral")
const btnFecharCarrinho = document.querySelector(".btnFecharCarrinho")
const btnConcluidoPedido = document.querySelector(".btnConcluido")
const divProdutosCarrinho = document.querySelector(".divProdutosCarrinho")
const textoValorTotal = document.querySelector(".textoValorTotal")
const btnFinalizarPedido = document.querySelector(".btnFinalizarPedido")
const modalPedidoConcluido = document.querySelector(".modalPedidoConcluido")
const mensagemPedido = document.querySelector(".mensagemPedido")
const horarioDoPedido = document.querySelector(".horarioDoPedido")
const menuNavegacao = document.getElementById("headerMenu")
const btnAlternadorMobile = document.getElementById("btnAlternadorMobile")
const btnAbrirCarrinho = document.getElementById("btnAbrirCarrinho")

function salvarPedido(){
    localStorage.setItem("pedido", JSON.stringify(pedido))
}

botoesCardapio.forEach((botao) => {
    botao.addEventListener("click", (evento) => {
        const categoria = evento.currentTarget.dataset.categoria
        
        botoesCardapio.forEach((botaoAtual) => {
            botaoAtual.classList.remove("ativa")
        })
        
        botao.classList.add("ativa")
        
        cardapio.forEach((produto) => {
            if(categoria === produto.dataset.categoria){
                produto.style.display = ""
            }else{
                produto.style.display = "none"
            }
        })
    })
})

function verificarHorarioFuncionamento(){
    let dataAtual = new Date()
    let dia = dataAtual.getDay()
    let hora = dataAtual.getHours()
 
    if(dia >= 1 && dia <= 5){
        if(hora >= 11 && hora <= 21){
            pontoStatusFuncionamento.style.background = "#00473c"
            textoStatusFuncionamento.textContent = "Aberto agora"
        }else{
            pontoStatusFuncionamento.style.background = "#6e0000"
            textoStatusFuncionamento.textContent = "Estamos Fechados"
        }
    }else if(dia === 6){
        if(hora >= 11 && hora <= 22){
            pontoStatusFuncionamento.style.background = "#00473c"
            textoStatusFuncionamento.textContent = "Aberto agora"
        }else{
            pontoStatusFuncionamento.style.background = "#6e0000"
            textoStatusFuncionamento.textContent = "Estamos Fechados"
        }
    }else{
        if(hora >= 12 && hora <= 20){
            pontoStatusFuncionamento.style.background = "#00473c"
            textoStatusFuncionamento.textContent = "Aberto agora"
        }else{
            pontoStatusFuncionamento.style.background = "#6e0000"
            textoStatusFuncionamento.textContent = "Estamos Fechados"
        }
    }
}

verificarHorarioFuncionamento()
setInterval(verificarHorarioFuncionamento, 60000)

btnAlternadorMobile.addEventListener("click", () => {
    menuNavegacao.classList.toggle("aberto")
})

linksMobile.forEach((linkSelecionado) => {
    linkSelecionado.addEventListener("click", () => {
        menuNavegacao.classList.remove("aberto")
    })
})

btnAbrirCarrinho.addEventListener("click", () => {
    divCarrinhoLateral.classList.toggle("mostrar")
})

let pedido = JSON.parse(localStorage.getItem("pedido")) || []

function atualizarNota(){
    divProdutosCarrinho.innerHTML = ""
 
    pedido.forEach((item) => {
        let botaoRemover = document.createElement("button")
        let produtoNota = document.createElement("div")
        let botaoAdicionar = document.createElement("button")
 
        produtoNota.textContent = `${item.nome} (x${item.quantidade}) — R$ ${item.preco.toFixed(2).replace(".", ",")}`
 
        botaoRemover.textContent = "-"
        botaoAdicionar.textContent = "+"
 
        divProdutosCarrinho.appendChild(botaoRemover)
        divProdutosCarrinho.appendChild(produtoNota)
        divProdutosCarrinho.appendChild(botaoAdicionar)

        botaoRemover.addEventListener("click", () => {
            if(item.quantidade === 1){
                pedido = pedido.filter((produto) => {
                    return produto !== item
                })
                salvarPedido()
                atualizarNota()
            }else{
                item.quantidade = item.quantidade - 1
                salvarPedido()
                atualizarNota()
            }
        })

        botaoAdicionar.addEventListener("click", () => {
            if(item.quantidade < 20){
                item.quantidade = item.quantidade + 1
            }else{
                window.alert("O limite é 20")
            }
            salvarPedido()
            atualizarNota()
        })
    })

    resultado()
}

function resultado(){
    let valorSomado = pedido.reduce((soma, notaValor) => {
        return soma + (notaValor.preco * notaValor.quantidade)
    }, 0)
 
    let valorFinalPedido = document.querySelector(".valorFinalPedido")
 
    mensagemPedido.textContent = "A sua compra foi feita!"
    valorFinalPedido.textContent = `O total da sua compra foi de R$ ${valorSomado.toFixed(2).replace(".", ",")}`
    textoValorTotal.textContent = `R$ ${valorSomado.toFixed(2).replace(".", ",")}`
}

botoesAdicionarItem.forEach((botaoProduto) => {
    botaoProduto.addEventListener("click", (evento) => {
        evento.preventDefault()
        btnAbrirCarrinho.classList.add("balancar")

        setTimeout(() => {
            btnAbrirCarrinho.classList.remove("balancar")
        }, 500);

        if(horarioDoPedido.textContent === "") {
            let dataAtual = new Date();
            let hora = dataAtual.getHours();
            let minuto = dataAtual.getMinutes();
            horarioDoPedido.textContent = `${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;
        }
 
        let nomeProduto = evento.currentTarget.dataset.nome
        let precoProduto = Number(evento.currentTarget.dataset.preco)
 
        const produtoEncontrado = pedido.find((produto) => {
            return produto.nome === nomeProduto
        })

        if(produtoEncontrado){
            produtoEncontrado.quantidade += 1
        }else{
            pedido.push({
                nome: nomeProduto,
                preco: precoProduto,
                quantidade: 1
            })
        }
        
        pedido.forEach((produto) => {
            if(produto.quantidade < 20){
            }else{
                window.alert("O limite é 20")
            }
        })

        salvarPedido()
        atualizarNota()
    })
})

btnFecharCarrinho.addEventListener("click", () => {
    divCarrinhoLateral.classList.remove("mostrar")
})

btnConcluidoPedido.addEventListener("click", () => {
    modalPedidoConcluido.classList.remove("mostrar")
    pedido = []
    salvarPedido()
    atualizarNota()
})

btnFinalizarPedido.addEventListener("click", () => {
    if(pedido.length > 0){
        modalPedidoConcluido.classList.add("mostrar")
        divCarrinhoLateral.classList.remove("mostrar")
        salvarPedido()
    }else{
        window.alert("Você ainda não adicionou nenhum item ao pedido")
    }
})

atualizarNota()
