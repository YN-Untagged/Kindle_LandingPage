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

function IncreaseQuantity(id){
    const input = document.getElementById(id);
    input.value = parseInt(input.value) + 1;
}

function DecreaseQuantity(id){
    const input = document.getElementById(id);
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

    LoadNavigators();
    LoadUserDetails();

    let users = RetrieveUsers(),
    index = sessionStorage.getItem('userIndex'),
    html = "",
    sum = 0;
    let userCart = users[index]["cart"];
    userCart.forEach(item => {
        html += `<li>${books[item.bookId]["name"]} R${books[item.bookId]["price"]} Qty: ${item.quantity}</li>`;
        sum += books[item.bookId]["price"] * item.quantity;
    });
    html += `<p> total: ${sum} </p>`;
    document.getElementById('cart-container').innerHTML = html;

}

function RemoveFromCart(item){

}
