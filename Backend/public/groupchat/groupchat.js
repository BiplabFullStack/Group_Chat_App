

document.getElementById('invite-user-btn').addEventListener('click', addUser);
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("create-admin-btn").addEventListener('click', makeAdmin)
document.getElementById("uploadbtn").addEventListener('click', sendFile)


//-------------------------------------------- Socket ---------------------------------------------------------
const socket = io();
socket.on('received', (message) => {
    console.log('message -->', message);
    displayMessages(message);
})








// ----------------------------------------------  Send message  -------------------------------------------------------

async function sendMessage(e) {
    e.preventDefault();
    try {
        const message = document.getElementById("message-input").value.trim();
        const errmsg = document.getElementById("text-message")
        if(!message){
            errmsg.textContent="Please type message";
            setTimeout(()=> {
                errmsg.textContent=''
            },3000)
        }
        console.log(message);
        document.getElementById("message-input").value = "";

        const token = localStorage.getItem("token");
        const groupname = localStorage.getItem('groupname')
        const msgObj = { message, groupname };

        const response = await axios.post(`http://localhost:8000/message`, msgObj, {
            headers: { Authorization: token },

        });
        socket.emit('send-message', response.data);
        // displayMessages(response.data);
    } catch (err) {
        console.log(err.message);
    }
}


// ----------------------------------------------  Display message  -------------------------------------------------------

async function displayMessages(obj) {


    const ul = document.getElementById('chat-messages');
    const li = document.createElement('li');
    li.textContent = `${obj.username} : ${obj.message}`;
     li.style.color ='#eee2dd'
    ul.appendChild(li);
}


// ----------------------------------------------  Store message into localstorage  -------------------------------------------------------

window.addEventListener('DOMContentLoaded', () => {
    const h2 = document.getElementById('group-name');
    const groupname = localStorage.getItem('groupname');
    h2.innerHTML = `GroupName : ${groupname}`
    async function fetchChatData() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/show-all-chat/${groupname}`, { headers: { 'Authorization': token } });
            const chat = response.data.chat;

            localStorage.setItem('chatArray', JSON.stringify(chat));
            let chat2 = JSON.parse(localStorage.getItem('chatArray'))
            document.getElementById('chat-messages').innerHTML = " ";
            chat2.forEach(ele => {
                displayMessages(ele)
            })
        } catch (error) {
            console.log("Error fetching chat data:", error);
        }
    }
    const interval = setInterval(fetchChatData, 1000);
    fetchChatData();
    displayAllUsers();

    const stopCallingAfterDuration = 0.5 * 60 * 1000; // 0.5 minutes in milliseconds

    setTimeout(() => {
        clearInterval(interval);
        console.log('Stopped calling API.');
    }, stopCallingAfterDuration);

})


// --------------------------------------------------  Display all-Users  -------------------------------------------------------

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


// --------------------------------------------------- Admin User & Simple Users  -------------------------------------------------------


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

async function removeUserFromGroup(id) {
    const token = localStorage.getItem('token');
    const groupname = localStorage.getItem('groupname')
    try {
        if (confirm("Are you sure ?")) {
            const deleteItem = await axios.delete(`http://localhost:8000/delete-user/${id}`, { headers: { Authorization: token } });
            console.log('deleteItem', deleteItem);
            if (deleteItem.status == 200) {
                window.location.reload();
            }
        }
    }
    catch (err) {
        console.log(err.message);
        alert(err.message);
    }
}



// ------------------------------------------------- Invite to another User  -------------------------------------------------------

async function addUser() {
    try {
        const token = localStorage.getItem('token')
        const groupname = localStorage.getItem('groupname')
        const email = document.getElementById('invite-username').value.trim().toLowerCase();
        document.getElementById('invite-username').value = '';
        const obj = { email, groupname }
        const response = await axios.post(`http://localhost:8000/group/invite-friend`, obj, { headers: { Authorization: token } })
        console.log('response---->', response.data.id);
        //window.location.reload();
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


// -------------------------------------------------  Make admin  -------------------------------------------------------


async function makeAdmin() {
    try {
        const email = document.getElementById("admine").value.trim().toLowerCase();
        document.getElementById("admine").value = '';
        const token = localStorage.getItem('token');
        const groupname = localStorage.getItem('groupname')
        const response = await axios.post(`http://localhost:8000/make-admin`, { email, groupname }, { headers: { Authorization: token } })
        console.log(response);
        if (response.status == 200) {
            window.location.reload(1)
            alert("Successfully make admin")
        }
    }
    catch (err) {
        console.log(err);
        alert("Something went wrong please provide currect email")
    }
}



async function sendFile() {
    const file = document.getElementById('file');
   
    const groupname = localStorage.getItem('groupname')
    const token = localStorage.getItem('token')
   const uploadfile = file.files[0]
   // console.log(uploadfile);
    if (!uploadfile) {
        document.getElementById('message').textContent ='Please select a file'
        setTimeout(()=> {
            document.getElementById('message').textContent =''
        },3000)
    }else{
        const formData = new FormData();
        formData.append("file", uploadfile);
        const response = await axios.post(`http://localhost:8000/file/sendfile/${groupname}`,formData, { headers: { 'Authorization': token, "Content-Type": "multipart/form-data" } })
        console.log('response ---->', response);
        socket.emit('send-message', response.data);
        uploadfile.value = null;
        document.getElementById('file').value = null;
    }
    
  

}
