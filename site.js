/* Registration and Login*/
///
/// Starts here
///

const profilesUrl = "images/user_images/";
const booksUrl = "images/site_images/";

let userProfiles = new Array();
let sessionUser;
let dummyUser = { name: "Dummy", email: "dummy@gmail.com", phone : "0789345236", photo: "profile.jpg", password :"pass123" };
userProfiles.push(dummyUser);

//Login Fundtion
let lform = document.getElementById("loginForm");

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

function LoadDetails()
{
    if("name" in sessionStorage)
    {
        //load user info
        document.getElementById('profile-pic').src = profilesUrl + sessionStorage.getItem("photo");
        document.getElementById('username').innerText = sessionStorage.getItem("name");
    }
    else
    {
        window.location.href = "login.html"
    }
}

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
        elem.scrollLeft += 150;
    }  
}

function ScrollToRight(divToScroll) {

    const elem = document.getElementById(divToScroll);

    if( elem.scrollLeft != 0)
    {
        elem.scrollLeft -= 150;
    }
}

//Scroller ends here


let books = [
    {name : "Against Heresies", cover: "againnst_heresies.jpg", author: "Irenaeus of Lyons", genre: "Theology"},
    {name : "The Day I Met BigFoot" , cover: "D.L. Miller" , author: "the_day_i_met_bigfoot.jpg", genre: "Fantacy"},
    {name : "Dark Things I Adore", cover: "dark_things_i_adore.jpg", author: "Katie Lattari", genre: "Thriller"},
    {name : "Viral", cover: "viral.jpeg", author: "Robin Cook" , genre: "Mystery" },
    {name : "A Brush with Love: A Novel", cover: , author: "Mazey Eddings", genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: }
];

let purchasedBooks = [
    {name : , cover: "", pages: , chapter: , last:},
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: },
    {name : , cover: , author: , genre: }
];