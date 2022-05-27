let sideNav = `
    <div class ="right"><i class="far fa-times-circle fa-2x close" onclick="ShowHideSideNav()"></i></div>
    <div class="profile_card" id="profile-details">
        <img id="profile-pic" class="profile_img" src="" alt="profile image">
        <div>Welcome Back</div>
        <h2 id="username"></h2>
    </div>

    <div class="nav_links">
        <a><i class="fab fa-kickstarter yellow"></i>&emsp;My Kindle Board</a><br>
        <a><i class="fas fa-box"></i>&emsp;Collections</a><br>
        <a><i class="fa fa-bookmark"></i>&emsp;Saved</a><br>
        <a><i class="fa fa-user"></i>&emsp;Profile</a><br>
        <a id="logout" onclick="LogOut();"><i class="fas fa-sign-out-alt"></i>&emsp;Logout</a>
    </div>

    <div class="logo_container">
        <h1>Product of</h1>
        <img class="side_logo" src="images/site_images/amazon_logo.svg"/>
    </div>`;

let topNav = `
    <a class = "logo" href="index.html">
        <h1><i class="fab fa-kickstarter yellow fa-2x"></i><span class="heading">Kindle<span class="yellow">.</span></span></h1>
    </a>
    <div class="nav_tabs right">
    <a onclick="ShowDropDown();" class="toggle_btn"><i class="fas fa-bars fa-2x" id="toggle-icon"></i></a>
    <div class="nav_content" id="dropdown-list">
        <span class="search_bar"><input type="text" placeholder="Search your books"><i class="fa fa-search"></i></span>
        <a class="links">New Release<sup><i class="fas fa-circle yellow"></i></sup></a>
        <a class ="links">Featured</a>
        <a class ="links" href="cart.html">
            <i class="fas fa-shopping-cart"></i>
            <sup><i class="badge badge-light cart_badge" id="item-count"></i></sup>
            
        </a>
        
        <a class ="links" onclick="ShowHideSideNav()"><span hidden> Main Menu</span><i class="fas fa-th-large icon"></i></a>
    </div>
    </div>
`;
