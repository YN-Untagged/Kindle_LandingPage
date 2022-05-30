let modalDetails = new bootstrap.Modal(document.getElementById('details-modal'), {});

function ShowBookDetails(id){
    
    //find the book
    let book = books[id];

    //Load modal and show the details
    document.getElementById('modal-img').src = booksUrl + book.cover;
    document.getElementById('book-id').value = book.id;

    let details = document.getElementById('details');
    details.innerHTML = `
        <img src="${booksUrl +book.cover}" alt="book cover" class="book modal_image_small">
        <h4>${book.name}</h4>
        <h6>${book.author}  <small class="category">${ book.genre }</small></h6>
        <small> ISBN: ${book.isbn} </small>
        <p> ${book.summary}</p>
        <strong> — R${book.price.toFixed(2)}</strong>`;

    modalDetails.show();
}

function IncreaseQuantity(){
    const input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
}

function DecreaseQuantity(){
    const input = document.getElementById('quantity');
    input.value = parseInt(input.value) - 1;
}

let aform = document.getElementById('add-book-form');
aform.addEventListener('submit', function(e){
    e.preventDefault();

    //Add item to users cart
    let userindex = parseInt(sessionStorage.getItem("userIndex"));
    let users = RetrieveUsers(),
    bookid = parseInt(aform["book-id"].value),
    quan = parseInt(aform["quantity"].value),
    updated = false,
    cartlength = users[userindex]["cart"].length;

    //Check if cart is not empty
    if(cartlength > 0){
        //if cart is not empty, find if book is already in cart
        for(var i = 0; i < cartlength ;i++) {
            //if book is in cart increase quantity
            if(users[userindex]["cart"][i].bookId === bookid){
                users[userindex]["cart"][i].quantity += quan;
                updated = true;
                break;
            }
        }
    }

    //if book not in cart add it to cart
    if(!updated){
        let item = { bookId: bookid, quantity: quan };
        users[userindex]["cart"].push(item);
    }
    
    StoreUsers(users);
    aform.reset();

    swal("Added To Cart!", "Book has been successfully added to cart.", "success", {
        buttons: ["Back", "View Cart"],
    })
    .then((goToCart)=>{
        if(goToCart){
            window.location.href = "cart.html";
        }   
    });

    let num = document.getElementById('item-count');
    num.innerText = parseInt(num.innerText) + 1
    
});

function LoadCart(){

    if(sessionStorage.getItem("user") === null){
        window.location.href = "login.html";
    }

    LoadNavigators();
    LoadUserDetails();
    ShowHideSideNav();

    let users = RetrieveUsers(),
    index = sessionStorage.getItem('userIndex'),
    sum = 0,
    cartList = document.getElementById('cart-container'),
    userCart = users[index]["cart"];
    var total = document.createElement('div'),
    backTo = `<a href="index.html"><i class="fas fa-long-arrow-alt-left"></i> Continue shopping</a>`;
    total.className = "list-group-item justify-content-between d-flex align-items-center";

    if(userCart.length > 0)
    {
        userCart.forEach(item => {
            var cartItem = AddListItem(item);
            cartList.append(cartItem);
            sum += books[item.bookId]["price"] * item.quantity;
        });
    
        
        total.innerHTML = `${backTo}<div><b>Subtotal:</b> R ${sum.toFixed(2)} </div>`;
        
    }
    else{
        total.innerHTML = `<div><h3>Your cart is empty</h3> ${backTo} <div>`;
    }
    cartList.append(total);
    
}

function UpdateCart(id, rmvd, qty){
    //Get user Cart
    let users = RetrieveUsers(),
    index = sessionStorage.getItem('userIndex'),
    userCart =users[index]["cart"];

    userCart.forEach((item, indx) => {
        if(item.bookId === id){
            item.quantity = qty;
            if(rmvd || qty <= 0){
                delete userCart[indx];

                const filteredCart = userCart.filter(el => {
                    return el != null;
                });
                userCart = filteredCart;
            }
            return;
        }
    });

    users[index]["cart"] = userCart;
    StoreUsers(users);
    window.location.reload();
}

function ChangeQuantity(e, form){
    e.preventDefault();

    //Get bookId and quantity value from form.
    var qty = parseInt(form['quantity'].value),
    id = parseInt(form['id'].value),
    submitBtn = e.target.value;

    if(submitBtn === "+"){
        UpdateCart( id, false, qty + 1);
    }
    else if(submitBtn === "-"){
        UpdateCart( id, false, qty - 1);
    }
    
}

function AddListItem(item){

    var listItem = document.createElement('div');
    listItem.className = "list-group-item justify-content-between d-flex align-items-center";
    listItem.innerHTML = `
        <div class="col-lg-7">
            <div class="row align-items-center">
                <img class="cart_book" src="${booksUrl + books[item.bookId]['cover']}">
                <div>
                    <h4>${books[item.bookId]["name"]}</h4>
                    <p>${books[item.bookId]["author"]}</p>
                    <small>Price per Item: R${books[item.bookId]["price"].toFixed(2)}</small>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <form onclick="ChangeQuantity(event, this);">
                <input type="hidden" name="id" value="${item.bookId}">
                <div class="btn-group">
                    <input type="submit" name="subtract" value="-">
                    <input name="quantity" type="number" class="modal_input" min="0" value="${item.quantity}" required readonly>
                    <input type="submit" name="add" value="+">
                </div>
            </form>
        </div>
        <div class="col-lg-2">
            <div class="row justify-content-between">
                <a >R ${(books[item.bookId]["price"] * item.quantity).toFixed(2)}</a>
                <a onclick="UpdateCart(${item.bookId}, true,0);" data-toggle="tooltip" title="Delete Item"><i class="far fa-trash-alt"></i></a>
            </div>
        </div>
    `;

    return listItem;
}
