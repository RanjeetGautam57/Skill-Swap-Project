function login() {

    let email = document.getElementById("login").value.trim();
    let password = document.getElementById("password").value;

    // Registered users ko localStorage se get karo
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Email aur password match karo
    let user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (user) {

        alert("Login Successful! Welcome " + user.fullname);

        // Current logged-in user ko save karo
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Dashboard open karo
        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Email or Password!");

    }
}