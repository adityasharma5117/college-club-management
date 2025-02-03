// document.getElementById("loginForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     var registrationNo = document.getElementById("email").value;
//     var password = document.getElementById("password").value;

//     // Retrieve user data from localStorage
//     var userData = JSON.parse(localStorage.getItem(registrationNo));

//     if (userData && userData.password === password) {
//         // Successful login, redirect to main page
//         window.location.href = "userdashboard.html";
//     } else {
//         // Invalid registration number or password, show error message
//         alert("Invalid registration number or password. Please try again.");
//     }
// })

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click",(e)=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = {
        email : email,
        password : password,
    }

    const loginUser = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3000/login",{
            method : "POST",
            body : JSON.stringify(userData),
            headers : {
                "content-type" : "application/json"
            }
        })
        const RESPONSE = await response.json();
        if(RESPONSE.message === "User logged in successfully"){
            localStorage.setItem("email",email);
            console.log(RESPONSE);
            const userName = RESPONSE.user.name;
            const userEmail = RESPONSE.user.email;
            const userRegNumber = RESPONSE.user.regNumber;  
            const userClubPreference = RESPONSE.user.clubPreference;
            localStorage.setItem("userName",userName);
            localStorage.setItem("userEmail",userEmail)
            localStorage.setItem("userRegNumber",userRegNumber);
            localStorage.setItem("userClubPreference",userClubPreference);
            window.location = "http://127.0.0.1:5500/public/profile.html";
        }else if(RESPONSE.message === "Invalid or incorrect password"){
            alert("Invalid or incorrect password");
        }else{
            alert("User not signed up!");
            window.location = "http://127.0.0.1:5500/public/registerloc.html"

        }
    }

    loginUser(e);
})