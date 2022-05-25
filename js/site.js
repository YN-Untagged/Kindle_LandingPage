const profilesUrl = "images/user_images/";
const booksUrl = "images/site_images/";

let newCart = new Array();
let userProfiles = [{ name: "Dummy", email: "dummy@gmail.com", phone : "+27893452360", photo: profilesUrl + "profile.jpg", password :"pass123" , cart: newCart}];

const purchasedBooks = [
    {name : "The Island of Doctor Moreau", cover: "the_Island_Of_DrMoreau.jpg", pages: 95, chapter: 4, read: true},
    {name : " The Hunger Games", cover: "The_Hunger_Games.jpg", pages: 25, chapter: 1, read: true},
    {name : "Against All Odds: Memoirs of Resilience, Determination, and Luck Amidst Hardship for an African Girl Child in Her Passionate Pursuit for Education", cover: "against_all_odds.jpg", pages: 60, chapter: 3, read: true},
    {name : "Brave New World", cover: "brave_new_world.jpg", pages: 0, chapter: 2, read:true},
    {name : "Gold Diggers", cover: "gold_diggers.jpg", pages: 0, chapter:0 , read: false},
    {name : "Before She Disappeared", cover: "before_she_disappeared.jpg", pages: 0, chapter: 0, read:false},
    {name : "My Life in Full", cover: "my_life_in_full.jpg", pages: 0, chapter: 0, read:false},
    {name : "The Turnout", cover: "the_turnout.jpg", pages: 0, chapter: 0, read: false},
    {name : "While Justice Sleeps", cover: "while_justice_sleeps.jpg", pages: 0, chapter: 0, read:false},
    {name : "Wonder" , cover: "wonder.jpg", pages: 0, chapter: 0, read: false},
];

const books = [
    {id: 0, name : "Against Heresies", cover: "against_heresies.jpg", author: "Irenaeus of Lyons", genre: "Theology", price: 251.59 , summary: `Irenaeus of Lyons wrote about and refuted many heresies in his books, including the idea that the resurrection would only be a spiritual resurrection and that the physical human body would have no part in it. His main argument is, if the body is not important, then why did Jesus take on a body of flesh and become human as well as heal many people's bodily afflictions? Irenaeus first argues against those who believe that Christ only "appeared" as man but really did not have flesh and blood as a real human being. He argues that if the Word had not become flesh, we would not have been able to hear and understand His teachings. In the past, when God wanted to speak to His people Israel, He would speak through the prophets who would spread the word with the community. God would only speak with one man individually. However, God in the form of Jesus was able to teach and speak to large groups of people directly. This is because He was truly God and truly man.`},
    {id: 1, name : "The Day I Met BigFoot" , cover: "the_day_i_met_bigfoot.jpg" , author: "D.L. Miller", genre: "Fantacy", price: 120.10, summary: `From D.L. Miller, your favorite mysterious creature is back in this sweet short story about friendship! Normally shy and reclusive, BigFoot spends his days in the deep dark woods, rarely spotted by humankind. But one day while walking along a wooded path, a friendly human child finds BigFoot and encourages him to stop hiding. After telling BigFoot he should be brave and proud of who he is and that it's okay to be different, a new friendship is formed and future adventures together will be had.` },
    {id: 2, name : "Dark Things I Adore", cover: "dark_things_I_adore.jpg", author: "Katie Lattari", genre: "Thriller", price: 89.05, summary: `A provocative must-read of feminist fury about the inhuman lengths some take for success... or justice. Three campfire secrets. Two witnesses. One dead in the trees. And the woman, thirty years later, bent on making the guilty finally pay. 1988. A group of outcasts gather at a small, prestigious arts camp nestled in the Maine woods. They're the painters: bright, hopeful, teeming with potential. But secrets and dark ambitions rise like smoke from a campfire, and the truths they tell will come back to haunt them in ways more deadly than they dreamed.` },
    {id: 3, name : "Viral", cover: "viral.jpeg", author: "Robin Cook" , genre: "Mystery", price: 90.37, summary: `` },
    {id: 4, name : "A Brush with Love: A Novel", cover: "a_brush_with_love.jpg", author: "Mazey Eddings", genre: " Fiction", price: 340.00 , summary: `` },
    {id: 5, name : "Chicken Pox", cover: "chicken_pox.jpg", author: "Bernard Demaere", genre: "Children's Liteture", price: 148.20 , summary: `` },
    {id: 6, name : "The House Across the Lake", cover: "the_house_across_the_lake.jpg", author:"Riley Sager" , genre: "Mystery", price: 181.78 , summary: `` },
    {id: 7, name : "The Red Palace", cover:"the_red_palace.jpg" , author: "June Hur" , genre:  "Historical Fiction", price: 269.48 , summary: `` },
    {id: 8, name : "Kaikeyi", cover: "kaikeyi.jpg" , author: "Vaishnavi Patel" , genre: "Fantasy", price: 104.99 , summary: `` },
    {id: 9, name : "The Book of Cold Cases", cover: "the_book_of_cold_cases.jpg", author: "Simone St. James", genre: "Thriller", price: 135.04 , summary: `` }
];


/* Registration and Login*/
///
/// Starts here
///

function LoadDummyUsers() {
    if(!"users" in localStorage || localStorage.getItem("users") === null){
        StoreUsers(userProfiles);
    }
};


//Login Function
let lform = document.getElementById("loginForm");
let confirmPass = document.getElementById("cpassword");
let pass = document.getElementById("password");

confirmPass.addEventListener('focusout', function(){
    MatchPasswords()
});

pass.addEventListener('focusout',function(){
    MatchPasswords()
});

function MatchPasswords(){
    let mess = document.getElementById("password-alert");
    let match = false;
    
    if(confirmPass.value !== pass.value)
    {
        mess.innerText = "Confirmation password doesn't match password!";
    }
    else{
        mess.innerHTML = "";
        match = true;
    }

    return match;
}

lform.addEventListener('submit', function(event){
    event.preventDefault();
    
    let email = lform["email"].value;
    let found = FindUserAccount(email);
    let message = document.getElementById('alert-message');

    if(found)
    {
        if(lform["password"].value === (JSON.parse(sessionStorage.getItem("user"))).password)
        {
            //redirect to landing page
            window.location.href = "index.html";
        }
    }

    //Return error message
    message.className = "error_message";
    message.innerHTML = '<p>You have entered invalid credentials!<br> Enter valid credentials to login or <a class="yellow" onclick="FlipToRegister();">Click here to Register.</a><p></p>';
    lform.reset();

});

//Registration

let rform = document.getElementById("registerForm");

rform.addEventListener('submit', function(event){
    event.preventDefault();

    let message = document.getElementById('alert-message');
    document.getElementById("loader-message").style.display = 'none';

    if(rform["password"].value !== rform["cpassword"].value){
        message.innerHTML = "Confirmation password doesn't match password. Please enter matching passwords.";
        return;
    }
    
    let email = rform["email"].value;
    let found = FindUserAccount(email);
    let pic = profilesUrl + "profile.jpg";

    if(!found)
    {
        //Save Profile picture if found
        if(rform["photo"].files.length > 0)
        {
            pic = localStorage.getItem("pic");
        }
        
        //Add user
        let newUser = {
            name: rform["name"].value, 
            email: rform["email"].value, 
            phone : rform["phone"].value, 
            photo: pic, 
            password : rform["password"].value,
            cart: newCart
        }

        //Get stored users, add new user and save users in localStorage
        const users = RetrieveUsers();
        users.push(newUser);
        StoreUsers(users);

        rform.reset();
        message.className = "success_message";
        message.innerHTML = 'Registration successful. Login to your account <a class="yellow" onclick="FlipToRegister();">Login here!</a> ';
        lform["email"].value = newUser["email"];
    }
    else
    {
        //User email already used
        message.className = "error_message";
        message.innerHTML = '<p>Email address has already been used. Try different email or if you already have an account <a class="yellow" onclick="FlipToRegister();">Click here to login.</a><p>';

    }

});

const input_file = document.getElementById("photo"), 
loader = document.getElementById("loader"),
message = document.getElementById("loader-message"),
btn = document.getElementById("sign-up");

input_file.addEventListener("change", function(){

    loader.style.display = "block";
    message.style.display = "block";
    btn.disabled = true;

    let reader = new FileReader();
    reader.readAsDataURL(this.files[0]);

    reader.onload = function(){
        localStorage.setItem("pic", reader.result);
        message.innerHTML = "File successfully uploaded.";
        message.style.color = "green";
        btn.disabled = false;
        loader.style.display = "none";
    };
});


//Search for user account
function FindUserAccount( email ){

    var storedUsers = RetrieveUsers();
    //find corresponding user account
    for(let i = 0; i < storedUsers.length; i++)
    {
        if(storedUsers[i].email == email)
        { 
            sessionStorage.setItem("user", JSON.stringify(storedUsers[i]));
            sessionStorage.setItem("userIndex", i);
            return true;
        }
    }

    //No user account found
    return false;
}

//LogOut
function LogOut()
{
    sessionStorage.clear();
    window.location.href = "login.html";
}

/// Login and registration Ends here

///
/// Scrollers starts Here
///

function ScrollToLeft(divToScroll){
    const elem = document.getElementById(divToScroll);
    let scroller = elem.scrollLeft;
    let elemWidth = elem.clientWidth;
    let scrollableWidth = elem.scrollWidth;
    let total = scrollableWidth - scroller - elemWidth;
    
    if(total != elem.offsetWidth)
    {
        elem.scrollLeft += 200;
    }
}

function ScrollToRight(divToScroll) {

    const elem = document.getElementById(divToScroll);

    if( elem.scrollLeft != 0)
    {
        elem.scrollLeft -= 200;
    }
}

//Scroller ends here

function LoadBooks(){

    const book_count = 10;

    //Use only one loop because 10 books on each array
    for(i = 0; i < book_count; i++)
    {
        //Purchased books

        let mainDiv = document.getElementById('purchased-books');
        let small = "", infoClass = "";

        if(purchasedBooks[i]["read"] == true){
            infoClass = "reading_info";
            small = `${ purchasedBooks[i]['pages'] } Pages <i class="fas fa-circle"></i> Chapter ${ purchasedBooks[i]["chapter"] } <i class="fas fa-circle"></i> Last Read </small>`;
        }
        else{
            infoClass = "purchased_info";
            small = 'New purchase <i class="fas fa-circle"></i> Yet to read';
        }

        let card = document.createElement('div');
        card.className = "read_card";

        card.innerHTML = `
        <img class="book book_left" src="${ booksUrl + purchasedBooks[i]["cover"] }" />
        <div class="${infoClass}">
            <div class="book_info">
                <h3>${ purchasedBooks[i]["name"] }</h3>
                <small> ${ small }</small>
            </div>
        </div>`;

        mainDiv.appendChild(card);

        
        //Released books
        let mainRDiv = document.getElementById('new-books');

        let new_card = document.createElement('div');
        new_card.className = "new_card";
        new_card.setAttribute("onclick", `ShowBookDetails(${books[i]["id"]})`);
        new_card.innerHTML = `
        <img class="book" src="${ booksUrl + books[i]["cover"] }"/> 
        <div class="info">
            <h3>${ books[i]["name"] }</h3>
            <small>
                <p>${ books[i]["author"] }</p>
                <div class="category">${ books[i]["genre"] }</div>
            </small>
        </div>`;

        mainRDiv.appendChild(new_card);
    }
}
function LoadNavigation(){
    
}

function LoadDetails()
{
    //Load Navigators;
    LoadNavigators();

    if("user" in sessionStorage)
    {
        //load user info
        LoadUserDetails();

        //load books
        LoadBooks();

    }
    else
    {
        window.location.href = "login.html";
    }
}

function LoadUserDetails(){

    document.getElementById('profile-pic').src = (JSON.parse(sessionStorage.getItem("user"))).photo;
    document.getElementById('username').innerText = (JSON.parse(sessionStorage.getItem("user"))).name;
}

function LoadNavigators(){
    document.getElementById('side-nav').innerHTML = sideNav;
    document.getElementById('top-nav').innerHTML = topNav;
}

///
///Show and hide side navigator
///

function ShowHideSideNav(){
    let sidenav = document.getElementById("side-nav");
    let main = document.getElementById("main");

    if(sidenav.style.display === "none")
    {
        sidenav.style.display = "block";
        main.style.width = "75%";
    }
    else
    {
        sidenav.style.display = "none"
        main.style.width = "100%";   
    }
}

//Show Registration and Login
let card = document.getElementById('inner');

function FlipToLogin(){
    document.getElementById('alert-message').innerHTML = "";
    card.style.transform =  "rotateY(180deg)"; 
}
   
function FlipToRegister(){
    document.getElementById('alert-message').innerHTML = "";
    card.style.transform =  "rotateY(0deg)";
}

function ShowDropDown(){
    let dropdown = document.getElementById("dropdown-list");
    let icon = document.getElementById("toggle-icon");

    if(dropdown.style.display === "none")
    {
        dropdown.style.display = "block";
        icon.className = "fas fa-times fa-2x";
    }
    else
    {
        dropdown.style.display = "none";
        icon.className = "fas fa-bars fa-2x";
    }       
}


/*Save and Retrieve users from the localStorage*/
function StoreUsers(users){
    localStorage.setItem("users", JSON.stringify(users));
}

function RetrieveUsers(){
    return JSON.parse(localStorage.getItem("users"));
}