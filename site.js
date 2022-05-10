const profilesUrl = "images/user_images/";
const booksUrl = "images/site_images/";


let userProfiles = [{ name: "Dummy", email: "dummy@gmail.com", phone : "0789345236", photo: "profile.jpg", password :"pass123" }];

const purchasedBooks = [
    {name : "The Island of Doctor Moreau", cover: "the_Island_Of_DrMoreau.jpg", pages: 95, chapter: 4, read: true},
    {name : " The Hunger Games", cover: "the_hunger_games.jpg", pages: 25, chapter: 1, read: true},
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
    {name : "Against Heresies", cover: "against_heresies.jpg", author: "Irenaeus of Lyons", genre: "Theology"},
    {name : "The Day I Met BigFoot" , cover: "the_day_i_met_bigfoot.jpg" , author: "D.L. Miller", genre: "Fantacy"},
    {name : "Dark Things I Adore", cover: "dark_things_i_adore.jpg", author: "Katie Lattari", genre: "Thriller"},
    {name : "Viral", cover: "viral.jpeg", author: "Robin Cook" , genre: "Mystery" },
    {name : "A Brush with Love: A Novel", cover: "a_brush_with_love.jpg", author: "Mazey Eddings", genre: " Fiction"},
    {name : "Chicken Pox", cover: "chicken_pox.jpg", author: "Bernard Demaere", genre: "Children's Liteture"},
    {name : "The House Across the Lake", cover: "the_house_across_the_lake.jpg", author:"Riley Sager" , genre: "Mystery"},
    {name : "The Red Palace", cover:"the_red_palace.jpg" , author: "June Hur" , genre:  "Historical Fiction"},
    {name : "Kaikeyi", cover: "kaikeyi.jpg" , author: "Vaishnavi Patel" , genre: "Fantasy"},
    {name : "The Book of Cold Cases", cover: "the_book_of_cold_cases.jpg", author: "Simone St. James", genre: "Thriller"}
];


/* Registration and Login*/
///
/// Starts here
///

let sessionUser;

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

    if(found)
    {
        if(lform["password"].value == sessionUser["password"])
        {
            //redirect to landing page
            window.location.href = "index.html";

            //load user info
            document.getElementById('profile-pic').src = profilesUrl + sessionUser["photo"];
            document.getElementById('username').innerText = sessionUser["name"];
        }
    }
    else
    {
        //Return error message
        document.getElementById('alert-message').innerText = "You have entered invalid credentails!";
        lform.reset();
    }

});

//Registration

let rform = document.getElementById("registerForm");

rform.addEventListener('submit', function(event){
    event.preventDefault();
    
    let email = lform;//FIX get email field
    let found = FindUserAccount(email);

    if(!found)
    {
        //Add user
        let newUser = {
            name: rform["name"].value, 
            email: rform["email"].value, 
            phone : rform["phone"].value, 
            photo: rform["photo"].files[0].name, 
            password : rform["password"].value 
        }

        userProfiles.push(newUser);
        rform.reset();
        document.getElementById('alert-message').innerHTML = "SignUp successful. Sign In to your account.";
        lform["email"].value = newUser["email"];

        let newFile = new File();
        
    }
    else
    {
        //User email already used
        document.getElementById('alert-message').innerText = "Email address has already been used. Try different email or if you already have an account login.";
        rform.reset();
    }

});


//Search for user account
function FindUserAccount( email ){

    //find corresponding user account
    for(let i = 0; i < userProfiles.length; i++)
    {
        if(userProfiles[i]["email"] == email)
        { 
            //user account found
            sessionStorage.setItem("name", userProfiles[i]["name"]);
            sessionStorage.setItem("photo", userProfiles[i]["photo"]);

            sessionUser = userProfiles[i];
            
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

/*let body = document.getElementById("landing-page");

body.addEventListener('load', function(event){
    LoadDetails();
});*/

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

function LoadDetails()
{
    if("name" in sessionStorage)
    {
        //load user info
        document.getElementById('profile-pic').src = profilesUrl + sessionStorage.getItem("photo");
        document.getElementById('username').innerText = sessionStorage.getItem("name");

        //load books
        LoadBooks();

    }
    else
    {
        window.location.href = "login.html"
    }
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
function FlipToLogin(){
    let card = document.getElementById('inner');
    card.style.transform =  "rotateY(180deg)";
   
   }
   
   function FlipToRegister(){
    let card = document.getElementById('inner');
    card.style.transform =  "rotateY(0deg)";
   }