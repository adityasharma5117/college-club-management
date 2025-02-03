const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async (e) => {
    const userName = document.getElementById("name").value;
    const registrationNo = document.getElementById("registration_no").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const clubPreference = document.getElementById("clubPreference").value;

    const userData = {
        name: userName,
        regNumber: registrationNo,
        email: email,
        password: password,
        clubPreference: clubPreference,
    };

    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Confirm password and password did not match");
        return;
    }
    const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const RESPONSE = await response.json();
    if (RESPONSE.message === "User signed up successfully") {
        alert("User signed up successfully"); // Show success alert
        window.location = "http://127.0.0.1:5500/public/loginloc.html";
    } else {
        alert("User already signed up"); // Show failure alert
        window.location = "http://127.0.0.1:5500/public/loginloc.html";
    }
    localStorage.setItem("email", email);
});
