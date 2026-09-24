

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    alert("Please login first!");
    window.location.href = "Login.html";
}



//  CURRENT USER ka detail dikhane ke liye 


document.getElementById("username").innerText = user.fullname;

document.getElementById("teachSkill").innerText = user.teachSkill;

document.getElementById("learnSkill").innerText = user.learnSkill;


// sabhi registered user dikhenge

let users = JSON.parse(localStorage.getItem("users")) || [];



// CURRENT USER KA SKILLS DIKHEGA


let myLearnSkill = user.learnSkill;
let myTeachSkill = user.teachSkill;



// SKILL PARTNER KA BOX


let skillPartners = document.getElementById("skillPartners");


// FIND SKILL PARTNERS


let matches = users.filter(function (otherUser) {

    // Current user ko list me show nahi karna
    if (otherUser.email === user.email) {
        return false;
    }

    // Kya ye person meri required skill sikha sakta hai?
    let canTeachMe =
        otherUser.teachSkill === myLearnSkill;

    // Kya ye person meri skill seekhna chahta hai?
    let wantsMySkill =
        otherUser.learnSkill === myTeachSkill;

    return canTeachMe || wantsMySkill;
});



// SHOW SKILL PARTNERS


if (matches.length === 0) {

    skillPartners.innerHTML = `
        <div class="col-12">
            <div class="alert alert-warning text-light  w-50" style="background:rgb(36, 95, 115)  !important;">
                <i class="fa-solid fa-circle-info"></i>
                No skill partners found yet.
            </div>
        </div>
    `;

} else {

    matches.forEach(function (partner) {

        let matchReason = "";

        if (
            partner.teachSkill === myLearnSkill &&
            partner.learnSkill === myTeachSkill
        ) {
            matchReason = "Perfect Skill Exchange";
        }
        else if (partner.teachSkill === myLearnSkill) {
            matchReason = "Can Teach You";
        }
        else if (partner.learnSkill === myTeachSkill) {
            matchReason = "Wants To Learn Your Skill";
        }


        skillPartners.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">

                <div class="card h-100 border-0 shadow-sm " >

                    <div class="card-body">

                        <div class="d-flex align-items-center mb-3">

                            <i class="fa-solid fa-circle-user fs-1 me-3"
                               style="color:#245F73;"></i>

                            <div>

                                <h5 class="mb-1">
                                    ${partner.fullname}
                                </h5>

                                <small class="text-muted">
                                    Skill Partner
                                </small>

                            </div>

                        </div>


                        <div class="mb-2">

                            <strong>
                                <i class="fa-solid fa-chalkboard-user"></i>
                                Can Teach:
                            </strong>

                            <span>
                                ${partner.teachSkill}
                            </span>

                        </div>


                        <div class="mb-3">

                            <strong>
                                <i class="fa-solid fa-book-open"></i>
                                Wants To Learn:
                            </strong>

                            <span>
                                ${partner.learnSkill}
                            </span>

                        </div>


                        <div class="alert alert-info py-2 text-center">

                            <i class="fa-solid fa-handshake"></i>

                            ${matchReason}

                        </div>


                        <button
                            class="btn custom-btn w-100"
                            onclick="connectWithUser('${partner.email}')">

                            <i class="fa-solid fa-user-plus"></i>

                            Connect

                        </button>

                    </div>

                </div>

            </div>
        `;
    });
}



// CONNECT BUTTON


function connectWithUser(email) {

    let partner = users.find(function (u) {
        return u.email === email;
    });

    if (!partner) {
        alert("User not found!");
        return;
    }


    // Existing connection requests
    let connectionRequests =
        JSON.parse(localStorage.getItem("connectionRequests")) || [];


    // Check already requested
    let existingRequest = connectionRequests.find(function (request) {

        return (
            request.from === user.email &&
            request.to === partner.email
        );

    });


    if (existingRequest) {

        alert("Connection request already sent!");

        return;
    }


    // Create new request
    let newRequest = {

        from: user.email,

        to: partner.email,

        status: "pending"

    };


    // Add request
    connectionRequests.push(newRequest);


    // Save request
    localStorage.setItem(
        "connectionRequests",
        JSON.stringify(connectionRequests)
    );


    alert(
        "Connection request sent to " +
        partner.fullname + "!"
    );
}




function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "Login.html";
}