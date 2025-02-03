// const email = localStorage.getItem("email");
// const getUserDetails = async (e)=>{
//     e.preventDefault();
//     const response = await fetch(`http://locahost:3000/user/mahendra@example.com`,{
//         method : "GET",
//     })
//     const RESPONSE = await response.json();
//     console.log(RESPONSE)
// }


// window.onbeforeunload = function(e){
//     getUserDetails(e);
// }

const nameField = document.getElementById("name");
const regNumberField = document.getElementById("registrationNumber");
const emailField = document.getElementById("email");
const editButton = document.getElementById("editProfile");
nameField.setAttribute('value', localStorage.getItem("userName"));
regNumberField.setAttribute('value', localStorage.getItem("userRegNumber"));
emailField.setAttribute('value', localStorage.getItem("userEmail"));

const selectedClubOption = document.getElementById("selectedOption");


const clubPreferenceField = document.getElementById("clubPreference")
selectedClubOption.setAttribute('value', localStorage.getItem("userClubPreference"))
selectedClubOption.innerText = localStorage.getItem("userClubPreference");
// clubPreferenceField.setAttribute('value',localStorage.getItem("userClubPreference"))

editButton.addEventListener("click", async (e) => {
    try {
        e.preventDefault();
        const requestBody = {
            email: emailField.value,
            clubPreference: clubPreferenceField.value,
        }
        const response = await fetch("http://localhost:3000/user/edit", {
            method: "PUT",
            headers : {
                "content-type" : "application/json",
            },
            body:JSON.stringify(requestBody)
        })
        const RESPONSE = response.json();
        console.log(RESPONSE);
        alert("Profile saved successfully!");
        localStorage.setItem("userClubPreference",clubPreferenceField.value);
      
    } catch (error) {
        console.log(error);
    }
})

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRegNumber");
    localStorage.removeItem("userClubPreference");
    localStorage.removeItem("userName");

    window.location = "http://127.0.0.1:5500/public/index.html"
})