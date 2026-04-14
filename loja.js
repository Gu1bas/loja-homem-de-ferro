if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready()
}

function ready(){
    const removeProductButtons = document.getElementsByClassName('remove-product-button');
    for(let i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener('click', function(event) {
            event.target.parentElement.parentElement.remove()
            updateTotal()
        });
    }

    const quantityInput = document.getElementsByClassName('product-qtd-input')
    for (let i = 0; i < quantityInput.length; i++){
        quantityInput[i].addEventListener('change', checkIfInputIsNull)
    }

    const addToCartButtons = document.getElementsByClassName('button-hover-background')
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', addProductToCart)
    }
}

function checkIfInputIsNull(event) {
    if (event.target.value === '0') {
        event.target.parentElement.parentElement.remove()
    }

    updateTotal()
}

function addProductToCart(event){
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productTitle = productInfos.getElementsByClassName('product-title')[0].innerText
    const productPrice = productInfos.getElementsByClassName('product-price')[0].innerText
     
    const productsCartName = document.getElementsByClassName('cart-product-title')
    for (let i = 0; i < productsCartName.length; i++) {
        if (productsCartName[i].innerText === productTitle) {
            productsCartName[i].parentElement.parentElement.getElementsByClassName('product-qtd-input')[0].value++
            updateTotal()
            return
        }
    }

    let newCartProduct = document.createElement('tr')
    newCartProduct.classList.add('cart-product')


    newCartProduct.innerHTML = `
        <td class="product-identification">
            <strong class="cart-product-title">${productTitle}</strong>
        </td>
        <td>
            <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
            <input type="number" value="1" min="0" class="product-qtd-input">
            <button type="button" class="remove-product-button">Remover</button>
        </td>
    

    const tableBody = document.querySelector('.cart-table tbody')
    tableBody.append(newCartProduct)

    updateTotal()
    newCartProduct.getElementsByClassName('product-qtd-input')[0].addEventListener('change', checkIfInputIsNull)
    newCartProduct.getElementsByClassName('remove-product-button')[0].addEventListener('click', removeProduct)
}

function removeProduct(event){
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal() {
    let totalAmount = 0;
    const cartProducts = document.getElementsByClassName('cart-product')
    for (let i = 0; i < cartProducts.length; i++) {
        //console.log(cartProducts[i])
        const productPrice = cartProducts[i].getElementsByClassName('cart-product-price')[0].innerText.replace('R$', '').replace(',' , '.')
        const productQuantity = cartProducts[i].getElementsByClassName('product-qtd-input')[0].value
        //console.log(productQuantity)
        //console.log(productPrice)
        
        totalAmount += (productPrice * productQuantity)
    }
    totalAmount = totalAmount.toFixed(2);
    totalAmount = totalAmount.replace('.' , ',');
    document.querySelector('.cart-total-container span').innerText = 'R$' + totalAmount;
}