/* Registration and Login */

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
            photo: rform["photo"].value, 
            password : rform["password"].value 
        }

        userProfiles.push(newUser);
        rform.reset();
        document.getElementById('alert-message').innerHTML = "SignUp successful. Sign In to your account.";
        lform["email"].value = newUser["email"];
        
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

/*LogOut*/
function LogOut()
{
    sessionStorage.clear();
    window.location.href = "login.html";
}