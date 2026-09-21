document.getElementById("registrationForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let fullname = document.getElementById("i1").value.trim();
    let email = document.getElementById("i2").value.trim();
    let password = document.getElementById("i3").value;
    let confirmPassword = document.getElementById("i4").value;

    let teachSkill = document.getElementById("teachSkill").value;
    let learnSkill = document.getElementById("learnSkill").value;

    // password   ko cheak krne ke liye
    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match!");
        return;
    }

   
    let users = JSON.parse(localStorage.getItem("users")) || [];

    //  email ko cheak krne ke liye li  already registered hai ya  nahi
    let existingUser = users.find(function (user) {
        return user.email === email;
    });

    if (existingUser) {
        alert("This email is already registered!");
        return;
    }

    // Create new user
    let user = {
        fullname: fullname,
        email: email,
        password: password,
        teachSkill: teachSkill,
        learnSkill: learnSkill
    };

    //user ko add krne ke liye
    users.push(user);

    // users  ko save karane ke liye
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    // Go to login page
    window.location.href = "Login.html";


//     function goToLogin() {

//     window.location.href = "Login.html";

// }


// // Close success alert
// function closeAlert() {

//     document
//         .getElementById("successAlert")
//         .classList
//         .add("d-none");



});