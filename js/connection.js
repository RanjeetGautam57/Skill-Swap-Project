// Get logged in user
let user = JSON.parse(localStorage.getItem("loggedInUser"));


// Check login
if (!user) {

    alert("Please login first!");

    window.location.href = "Login.html";
}


// Get all users
let users =
    JSON.parse(localStorage.getItem("users")) || [];


// Get connection requests
let connectionRequests =
    JSON.parse(localStorage.getItem("connectionRequests")) || [];


// HTML elements
let requestsContainer =
    document.getElementById("connectionRequests");

let connectionsContainer =
    document.getElementById("myConnections");


// Display Connection Requests
function showRequests() {

    requestsContainer.innerHTML = "";

    let requests = connectionRequests.filter(function (request) {

        return (
            request.to === user.email &&
            request.status === "pending"
        );

    });


    if (requests.length === 0) {

        requestsContainer.innerHTML = `
            <div class="col-12">

                <div class="alert alert-secondary text-center">

                    <i class="fa-solid fa-circle-info"></i>

                    No pending connection requests.

                </div>

            </div>
        `;

        return;
    }


    requests.forEach(function (request) {

        let sender = users.find(function (u) {

            return u.email === request.from;

        });


        if (!sender) {
            return;
        }


        requestsContainer.innerHTML += `

            <div class="col-12 col-md-6 col-lg-4">

                <div class="card border-0 shadow-sm h-100">

                    <div class="card-body">

                        <div class="d-flex align-items-center mb-3">

                            <i class="fa-solid fa-circle-user fs-1 me-3"
                               style="color:#245F73;"></i>

                            <div>

                                <h5 class="mb-1">
                                    ${sender.fullname}
                                </h5>

                                <small class="text-muted">
                                    ${sender.email}
                                </small>

                            </div>

                        </div>


                        <p class="text-muted">
                            Wants to connect with you for skill exchange.
                        </p>


                        <div class="d-flex gap-2">

                            <button
                                class="btn btn-success flex-fill"
                                onclick="acceptRequest('${sender.email}')">

                                <i class="fa-solid fa-check"></i>
                                Accept

                            </button>


                            <button
                                class="btn btn-danger flex-fill"
                                onclick="rejectRequest('${sender.email}')">

                                <i class="fa-solid fa-xmark"></i>
                                Reject

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

}


// Accept Request
function acceptRequest(senderEmail) {

    let request = connectionRequests.find(function (request) {

        return (
            request.from === senderEmail &&
            request.to === user.email &&
            request.status === "pending"
        );

    });


    if (!request) {
        return;
    }


    // Change status
    request.status = "accepted";


    // Save
    localStorage.setItem(
        "connectionRequests",
        JSON.stringify(connectionRequests)
    );


    alert("Connection request accepted!");


    // Refresh page data
    showRequests();
    showConnections();

}


// Reject Request
function rejectRequest(senderEmail) {

    let requestIndex = connectionRequests.findIndex(
        function (request) {

            return (
                request.from === senderEmail &&
                request.to === user.email &&
                request.status === "pending"
            );

        }
    );


    if (requestIndex === -1) {
        return;
    }


    // Remove request
    connectionRequests.splice(requestIndex, 1);


    // Save
    localStorage.setItem(
        "connectionRequests",
        JSON.stringify(connectionRequests)
    );


    alert("Connection request rejected!");


    // Refresh
    showRequests();

}


// Show My Connections
function showConnections() {

    connectionsContainer.innerHTML = "";


    let connections = connectionRequests.filter(
        function (request) {

            return (
                request.status === "accepted" &&
                (
                    request.from === user.email ||
                    request.to === user.email
                )
            );

        }
    );


    if (connections.length === 0) {

        connectionsContainer.innerHTML = `
            <div class="col-12">

                <div class="alert alert-secondary text-center">

                    <i class="fa-solid fa-users"></i>

                    You don't have any connections yet.

                </div>

            </div>
        `;

        return;
    }


    connections.forEach(function (connection) {

        let connectionEmail;


        if (connection.from === user.email) {

            connectionEmail = connection.to;

        } else {

            connectionEmail = connection.from;

        }


        let connectedUser = users.find(function (u) {

            return u.email === connectionEmail;

        });


        if (!connectedUser) {
            return;
        }


        connectionsContainer.innerHTML += `

            <div class="col-12 col-md-6 col-lg-4">

                <div class="card border-0 shadow-sm h-100">

                    <div class="card-body">

                        <div class="d-flex align-items-center mb-3">

                            <i class="fa-solid fa-circle-user fs-1 me-3"
                               style="color:#245F73;"></i>

                            <div>

                                <h5 class="mb-1">
                                    ${connectedUser.fullname}
                                </h5>

                                <small class="text-muted">
                                    ${connectedUser.email}
                                </small>

                            </div>

                        </div>


                        <div class="mb-2">

                            <strong>
                                <i class="fa-solid fa-chalkboard-user"></i>
                                Can Teach:
                            </strong>

                            ${connectedUser.teachSkill}

                        </div>


                        <div class="mb-3">

                            <strong>
                                <i class="fa-solid fa-book-open"></i>
                                Wants To Learn:
                            </strong>

                            ${connectedUser.learnSkill}

                        </div>


                        <div class="alert alert-success text-center py-2">

                            <i class="fa-solid fa-circle-check"></i>

                            Connected

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

}


// Logout
function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "Login.html";
}


// Load data
showRequests();
showConnections();