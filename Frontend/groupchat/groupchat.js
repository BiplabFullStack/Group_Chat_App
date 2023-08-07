// 
document.getElementById('invite-user-btn').addEventListener('click', addUser);
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("create-admin-btn").addEventListener('click', makeAdmin)

// --------------------------------------
window.addEventListener('DOMContentLoaded', () => {
    const h2 = document.getElementById('group-name');
    const groupname = localStorage.getItem('groupname');
    h2.innerHTML = `GroupName : ${groupname}`
    displayAllUsers()


})

//Invite
async function addUser() {
    try {
        const token = localStorage.getItem('token')
        const groupname = localStorage.getItem('groupname')
        const email = document.getElementById('invite-username').value.trim().toLowerCase();
        document.getElementById('invite-username').value ='';
        const obj = { email, groupname }
        const response = await axios.post('http://localhost:8000/group/invite-friend', obj, { headers: { Authorization: token } })
        window.location.reload();
        console.log(response.Error);
        if (response.status == 201) {
            window.location.reload()
            alert("User added Successfully")
            
        }
      
    }
    catch (err) {
        console.log(err);
        alert("Something went wrong")
    }


}


//Send message

async function sendMessage(e) {
    e.preventDefault();
    try {
        const message = document.getElementById("message-input").value.trim();;
        console.log(message);
        document.getElementById("message-input").value = "";

        const token = localStorage.getItem("token");
        const groupname = localStorage.getItem('groupname')
        const msgObj = { message, groupname };

        const response = await axios.post("http://localhost:8000/message", msgObj, {
            headers: { Authorization: token },
        });
        displayMessages(response);
        console.log(response.data.username);
    } catch (err) {
        console.log(err.message);
    }
}

//Display on screen the message
async function displayMessages(obj) {
    const ul = document.getElementById('chat-messages');
    const li = document.createElement('li');
    li.textContent = `${obj.data.username = 'you'} : ${obj.data.message}`;
    ul.appendChild(li);
}
//Display 
async function displayAllUsers() {
    try {
        const token = localStorage.getItem('token');
        const groupname = localStorage.getItem('groupname')
        const userDetails = await axios.get(`http://localhost:8000/get-all-username/${groupname}`, { headers: { Authorization: token } })
        userDetails.data.forEach((user) => {
            if (user.isAdmine == true) {
                showAdminUser(user.id, user.name);
            }
            else {
                showUser(user.id, user.name)
            }
        })
    }
    catch (err) {
        console.log(err.message);
    }
}
//Admin user
function showAdminUser(id, name) {
    const ul = document.getElementById("user-list");
    const newUser = `
            <div>
                <li style ="display:inline-block" id=${id}>Name : ${name} : <li style ="display:inline-block"> Admine</li>
                    <button style ="padding:3px; margin:4px" onclick =removeUserFromGroup(${id}) class ='btn btn-danger'>Remove</button>
                </li>
            </div>`;
    ul.innerHTML += newUser
}

//Normal User
function showUser(id, name) {
    const ul = document.getElementById("user-list");
    const newUser = `
            <div>
                <li style ="display:inline-block" id=${id}>Name : ${name}
                    <button style ="padding:3px; margin:4px" onclick =removeUserFromGroup(${id}) class ='btn btn-danger'>Remove</button>
                </li>
            </div>`;
    ul.innerHTML += newUser
}


async function makeAdmin() {
    try {
        const email = document.getElementById("admine").value.trim().toLowerCase();
        document.getElementById("admine").value ='';
        const token = localStorage.getItem('token');
        const groupname = localStorage.getItem('groupname')
        const response = await axios.post('http://localhost:8000/make-admin', { email , groupname}, { headers: { Authorization: token } })
        console.log(response);
        if(response.status == 200){
            window.location.reload(1)
            alert("Successfully make admin")
        }
    }
    catch (err) {
        console.log(err);
        alert("Something went wrong please provide currect email")
    }
}



