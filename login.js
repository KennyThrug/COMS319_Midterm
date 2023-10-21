function getUsers()
{
    fetch('./users.json')
    .then(res => res.json())
    .then(data => data.users.forEach(element => {
        console.log("User: " + element.username + " Password: " + element);
    }));
}

function getFirstUser()
{
    fetch('./users.json')
    .then(res => res.json())
    .then(data => console.log(data.users[0].username));
}

function logout()
{
    document.cookie = "authenticated=false; path=/;"
    setTimeout(() => {window.location.href = "./index.html";}, 1500);
}

function login_from_page()
{
    let username = document.getElementById("usernamebox").value;
    let password = document.getElementById("passwordbox").value;
    login(username, password, "/index.html");
}

function set_inner_html(id, ihtml)
{
    document.getElementById(id).innerHTML = ihtml;
}

function set_logged_in_message(id)
{
    console.log(id);
    if(is_logged_in())
    {
        set_inner_html(id, "Thank you for logging in!");
    }
}

function is_logged_in()
{
    return getCookieValue("authenticated").includes("true");
}

function getCookieValue(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            console.log(c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function login(username, password, redirect)
{
    fetch('./users.json')
    .then(res => res.json())
    .then(data => data.users.forEach(element => {
        if(element.username == username)
        {
            console.log("Found user " + element.username + " matches given user " + username);
            if(element.password == password)
            {
                console.log("Password authenticated");
                document.cookie = "authenticated=true; path=/;"
                setTimeout(() => {window.location.href = redirect;}, 1500);
            }
        }
    }));
}