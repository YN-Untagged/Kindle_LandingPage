let modalDetails = new bootstrap.Modal(document.getElementById('details-modal'), {});

function ShowBookDetails(id){
    //find the book
    let book = books[id];

    //Load modal and show the details
    document.getElementById('modal-img').src = booksUrl + book.cover;
    document.getElementById('book-id').value = book.id;

    let details = document.getElementById('details');
    details.innerHTML = `
        <h4>${book.name}</h4>
        <h6>${book.author}</h6>
        <p>
            ${book.summary}
            ${book.price}
        </p>`;

    

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

    let msg = document.getElementById('modal-alert');
    msg.className = "success_message";
    msg.innerHTML = "<p>Book successfully added to cart.<a>Click here to view cart.</a></p>";
    
});

function LoadCart(){

    if(!"user" in sessionStorage){
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
    backTo = `<a href="index.html"><i class="fas fa-long-arrow-alt-left"></i>Continue shopping</a>`;
    total.className = "list-group-item justify-content-between d-flex align-items-center";

    if(userCart.length > 0)
    {
        userCart.forEach(item => {
            var cartItem = AddListItem(item);
            cartList.append(cartItem);
            sum += books[item.bookId]["price"] * item.quantity;
        });
    
        
        total.innerHTML = `${backTo}<div> Subtotal: R ${sum} </div>`;
        
    }
    else{
        total.innerHTML = `<div><h3>Your cart is empty</h3> ${backTo} <div>`;
    }
    cartList.append(total);
    
}

function UpdateCart(id, rmvd){

    let users = RetrieveUsers(),
    qty = document.getElementById('quantity').value;
    index = sessionStorage.getItem('userIndex');

    users[index]["cart"].forEach((item, indx) => {
        if(item.bookId === id){
            item.quantity = qty;
            if(rmvd || qty <= 0){
                delete users[indx]["cart"][indx];
            }
            return;
        }
    });

    StoreUsers(users);
    window.reload();
}

function ChangeQuantity(e, form){
    e.preventDefault();
    if(e.target.value === "+"){
        alert(e.target.value);
        alert(parseInt(form['quantity'].value) + 1);
    }
    else{
        alert(e.target.value);
        alert(parseInt(form['quantity'].value) - 1);
    }
    
}

function AddListItem(item){

    var listItem = document.createElement('div');
    listItem.className = "list-group-item justify-content-between d-flex align-items-center";
    listItem.innerHTML = `
        <div class="col-7">
            <div class="row align-items-center">
                <img class="cart_book" src="${booksUrl + books[item.bookId]['cover']}">
                <div>
                    <h6>${books[item.bookId]["name"]}</h6>
                    <small>${books[item.bookId]["author"]}</small>
                </div>
            </div>
        </div>
        <div class="col-3">
            <form onclick="ChangeQuantity(event, this);">
                <div class="btn-group">
                    <input type="submit" name="subtract" value="-">
                    <input name="quantity" type="number" class="modal_input" min="0" value="${item.quantity}" required>
                    <input type="submit" name="add" value="+">
                </div>
            </form>
        </div>
        <div class="col-2">
            <div class="row justify-content-between">
                <span>R ${books[item.bookId]["price"]}</span>
                <a onclick="UpdateCart(${item.bookId}, true);"><i class="fas fa-times"></i></a>
            </div>
        </div>
    `;

    return listItem;
}