import { menuArray } from "./data.js"

document.addEventListener("DOMContentLoaded", (e) => { render() }) 

function createElement(elementType, className, parent) {
    const elementName = document.createElement(elementType)
    elementName.classList.add(className)
    parent.appendChild(elementName)
    return elementName
}

function render() {
    getItemLayout(menuArray)
}

const clickedArray = []
const items = document.getElementById("items")
const formWrapper = document.getElementById("form-wrapper")
const submitBtn = document.getElementById("submit-btn")
const orderConfirmed = document.getElementById("order-confirmed")
const appContainer = document.getElementById("app-container")
const body = document.querySelector("body")

function getItemLayout(array) {
    items.innerHTML = "";

    for (let item of array) {
        // parent-div
        const itemDiv = createElement("div", "item-container", items)
            const leftSection = createElement("div", "item-left-section", itemDiv)
                const emoji = createElement("p", "emoji-icon", leftSection)
                const infoDiv = createElement("div", "info-container", leftSection)
                    const itemName = createElement("p", "item-name", infoDiv)
                    const itemIngredients = createElement("p", "item-ingredients", infoDiv)
                    const itemPrice = createElement("p", "item-price", infoDiv)
            const rightSection = createElement("div", "item-right-section", itemDiv)
                const addBtn = createElement("button", "add-btn", rightSection)
                    const btnText = createElement("p", "btn-text", addBtn)
    
        itemPrice.textContent = `$${item.price}`
        itemIngredients.textContent = item.ingredients.join(", ")
        itemName.textContent = item.name
        emoji.textContent = item.emoji
        btnText.textContent = "+"

        addBtn.addEventListener("click", function(){

            let cartItem = {
                name: item.name,
                price: item.price,
                id: item.id
            }

            clickedArray.push(cartItem)
            console.log(clickedArray)
            getOrderLayout(clickedArray)  
        })  
    }
}

function calculateTotalPrice(array){
    let total = 0
    for(let i=0 ; i < array.length; i++) {
        total += array[i].price
    }
    return total
}

function getOrderLayout(array){
    
    let orderContainer = document.getElementById("order-container");

    if (!orderContainer) {
        orderContainer = createElement("div", "order-container", document.body);
        orderContainer.id= "order-container"
    }
    
    let orderTitle = document.getElementById("order-title")

    if(!orderTitle) {
        orderTitle = createElement("p", "order-title", items)
        orderTitle.textContent = "Your order"
        orderTitle.id = "order-title"
    }

    orderContainer.innerHTML = "";      

    for(let order of array) {
        const orderInfoContainer = createElement("div", "order-info-container", orderContainer)
            const orderLeftSection = createElement("div", "order-left-section", orderInfoContainer)
                const orderedItemName = createElement("p", "ordered-item-name", orderLeftSection)
                const removeBtn = createElement("p", "remove-order-btn", orderLeftSection)
            const orderRightSection = createElement("div", "order-right-section", orderInfoContainer)
                const orderedItemPrice = createElement("p", "ordered-item-price", orderRightSection)

        removeBtn.textContent = "remove"
        orderedItemName.textContent = order.name
        orderedItemPrice.textContent = `$${order.price}`
        removeBtn.setAttribute("data-id", order.id)

        removeBtn.addEventListener('click', function(e){

           orderInfoContainer.remove() 
          
           let selectedElementIndex = array.indexOf(order)

           array.splice(selectedElementIndex, 1)

           document.getElementById("total-price-value").textContent = calculateTotalPrice(clickedArray)

           let priceCheck = document.getElementById("total-price-value").textContent

           if(totalPrice && priceCheck == 0) {
               orderContainer.remove()
               orderTitle.remove()
           }
        })
    }

    let totalPrice = document.getElementById("total-price")
    
    if (!totalPrice) {
        totalPrice = createElement("div", "total-price", orderContainer)
        totalPrice.id = "total-price"
        const totalPriceText = createElement("p", "total-price-text", totalPrice)
        const totalPriceValue = createElement("p", "total-price-value", totalPrice)
        totalPriceText.textContent = "Total Price :"
        totalPriceValue.id = "total-price-value"
        totalPriceValue.textContent = calculateTotalPrice(clickedArray)
        
    }

    let completeOrderBtn = document.getElementById("order-btn")

    if(!completeOrderBtn) {
        completeOrderBtn = createElement("button", "order-btn", orderContainer)
        completeOrderBtn.id = "order-btn"
        completeOrderBtn.textContent = "Complete order"
    }
    
    completeOrderBtn.addEventListener("click", function(){
        formWrapper.style.display = "flex"
    })

    submitBtn.addEventListener("click", function(e){
        e.preventDefault()
        orderContainer.innerHTML = ""
        orderTitle.innerHTML = ""
        formWrapper.style.display = "none"
        orderConfirmed.style.display = "flex"
        appContainer.style.backgroundColor = "white"                
    })
}













