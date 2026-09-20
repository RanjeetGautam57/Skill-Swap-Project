

let user = JSON.parse(localStorage.getItem("loggedInUser"));


// login cheak karega //
if (!user) {

    alert("Please login first!");

    window.location.href = "Login.html";

}


// user ka profile dikhegaa 


document.getElementById("profileName").innerText =
    user.fullname || "User Name";

document.getElementById("profileEmail").innerText =
    user.email || "user@email.com";

document.getElementById("profileBio").innerText =
    user.bio || "No bio added yet.";

document.getElementById("profileTeachSkill").innerText =
    user.teachSkill || "Not specified";

document.getElementById("profileLearnSkill").innerText =
    user.learnSkill || "Not specified";

document.getElementById("profileExperience").innerText =
    user.experience || "Not specified";


// PROFILE PHOTO


if (user.profilePhoto) {

    document.getElementById("profileImage").src =
        user.profilePhoto;

}



// EDIT PROFILE kr sakta hai 


function editProfile() {

    window.location.href = "edit-profile.html";

}


// LOGOUT krne ke liye


function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "Login.html";

}