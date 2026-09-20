const tabButtons = document.querySelectorAll(".tab")
const productCards = document.querySelectorAll(".product-card")
const mobileNavLinks = document.querySelectorAll(".nav__panel a")
const orderButtons = document.querySelectorAll(".ghost-link")
const statusDot = document.querySelector(".status-dot")
const statusText = document.querySelector(".statusText")
const cartPanel = document.querySelector(".cart")
const closeCartBtn = document.querySelector(".cart__close")
const doneBtn = document.querySelector(".order-confirmation__done")
const cartItemsContainer = document.querySelector(".cart__items")
const cartTotalEl = document.querySelector(".cart__total")
const checkoutBtn = document.querySelector(".buy")
const orderConfirmation = document.querySelector(".order-confirmation")
const confirmationMessage = document.querySelector(".order-confirmation__message")
const orderTimeEl = document.querySelector(".order-confirmation__time")
const nav = document.getElementById("siteNav")
const mobileMenuToggle = document.getElementById("navToggle")
const cartToggleBtn = document.getElementById("btn-ask")
 
 
tabButtons.forEach((tabButton) => {
    tabButton.addEventListener("click", (event) => {
 
        const category = event.currentTarget.dataset.category
 
        tabButtons.forEach((otherTabButton) => {
            otherTabButton.classList.remove("is-active")
        })
 
        tabButton.classList.add("is-active")
 
        productCards.forEach((card) => {
 
            if(category === card.dataset.category){
                card.style.display = ""
            }else{
                card.style.display = "none"
            }
 
        })
    })
})
 
 
function updateOpenStatus(){
 
    let now = new Date()
    let day = now.getDay()
    let hour = now.getHours()
    let minute = now.getMinutes()
 
    orderTimeEl.textContent = `${hour}:${minute.toString().padStart(2, "0")}`
 
    if(day >= 1 && day <= 5){
 
        if(hour >= 11 && hour <= 21){
            statusDot.style.background = "#00473c"
            statusText.textContent = "Aberto agora"
        }else{
            statusDot.style.background = "#6e0000"
            statusText.textContent = "Estamos Fechados"
        }
 
    }else if(day === 6){
 
        if(hour >= 11 && hour <= 22){
            statusDot.style.background = "#00473c"
            statusText.textContent = "Aberto agora"
        }else{
            statusDot.style.background = "#6e0000"
            statusText.textContent = "Estamos Fechados"
        }
 
    }else{
 
        if(hour >= 12 && hour <= 20){
            statusDot.style.background = "#00473c"
            statusText.textContent = "Aberto agora"
        }else{
            statusDot.style.background = "#6e0000"
            statusText.textContent = "Estamos Fechados"
        }
 
    }
}
 
 
updateOpenStatus()
setInterval(updateOpenStatus, 60000)
 
 
mobileMenuToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open")
})
 
 
mobileNavLinks.forEach((link) => {
 
    link.addEventListener("click", () => {
        nav.classList.remove("is-open")
    })
 
})
 
 
cartToggleBtn.addEventListener("click", () => {
    cartPanel.classList.toggle("is-visible")
})
 
 
let cart = []
 
 
function updateCart(){
 
    cartItemsContainer.innerHTML = ""
 
    cart.forEach((item) => {
 
        let decreaseBtn = document.createElement("button")
        let itemLine = document.createElement("div")
        let increaseBtn = document.createElement("button")
 
        itemLine.textContent = `${item.name} (x${item.quantity}) — R$ ${item.price.toFixed(2).replace(".", ",")}`
 
        decreaseBtn.textContent = "-"
        increaseBtn.textContent = "+"
 
        cartItemsContainer.appendChild(decreaseBtn)
        cartItemsContainer.appendChild(itemLine)
        cartItemsContainer.appendChild(increaseBtn)
 
 
        decreaseBtn.addEventListener("click", () => {
 
            if(item.quantity === 1){
 
                cart = cart.filter((entry) => {
                    return entry !== item
                })
 
                
                updateCart()
                
            }else{
                
                item.quantity = item.quantity - 1
 
                updateCart()
 
            }
 
        })
 
 
        increaseBtn.addEventListener("click", () => {
 
            item.quantity = item.quantity + 1
 
            updateCart()
 
        })
 
    })
 
 
    updateTotal()
 
}
 
 
function updateTotal(){
 
    let total = cart.reduce((sum, cartItem) => {
 
        return sum + (cartItem.price * cartItem.quantity)
 
    }, 0)
 
    let finalTotalEl = document.querySelector(".order-confirmation__total")
 
    confirmationMessage.textContent = "A sua compra foi feita!"
    finalTotalEl.textContent = `O total da sua compra foi de R$ ${total.toFixed(2).replace(".", ",")}`
 
    cartTotalEl.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`
 
    
 
}
 
 
orderButtons.forEach((btn) => {
 
    btn.addEventListener("click", (event) => {
 
        event.preventDefault()
 
        let productName = event.currentTarget.dataset.name
        let productPrice = Number(event.currentTarget.dataset.price)
 
        const existingItem = cart.find((entry) => {
            return entry.name === productName
        })
 
 
        if(existingItem){
 
            existingItem.quantity += 1
 
        }else{
 
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            })
 
        }
 
        updateCart()
 
    })
 
})
 
closeCartBtn.addEventListener("click", () => {
    cartPanel.classList.remove("is-visible")
})
 
doneBtn.addEventListener("click", () => {
    orderConfirmation.classList.remove("is-visible")
    cart = []
    updateCart()
})
 
checkoutBtn.addEventListener("click", () => {
    if(cart.length > 0){
        orderConfirmation.classList.add("is-visible")
        cartPanel.classList.remove("is-visible")
    }else{
        window.alert("Você ainda não adicionou nenhum item ao pedido")
    }
 
})
 