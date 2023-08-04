
// Add event listener to the send button
document.getElementById("send-btn").addEventListener("click", sendMessage);

// Send message
async function sendMessage(e) {
  e.preventDefault();
  try {
    const inputElement = document.getElementById("message-input");
    const message = inputElement.value.trim();
    document.getElementById("message-input").value = "";

    const token = localStorage.getItem("token");
    const groupname = localStorage.getItem('groupname')
    const msgObj = { message , groupname };

    const response = await axios.post("http://localhost:8000/message", msgObj, {
      headers: { Authorization: token },
    });
    //displaychatMessages(msgObj);

    // Store the message in local storage
    //storeMessageLocally(msgObj);
  } catch (err) {
    console.log(err.message);
  }
}

// Display function
function displaychatMessages(myObj) {
  const ul = document.getElementById("chat-messages");
  const li = document.createElement("li");
  li.innerHTML = `msg: ${myObj.message}`;
  li.style.color = "Maroon";
  li.class = "list-group-item fade-in";
  ul.appendChild(li);
}

function displaycurrentUser(myObj){
  const activeUser = document.getElementById("user-list");
  const activeli = document.createElement('li');
  activeli.innerHTML =`${myObj.data.firstName}`;
  activeli.style.color = 'rgb(0,0,0,0, 2)';
  activeUser.appendChild(activeli);
}

// Fetch message from db
async function callApi() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/getmessage", {
      headers: { Authorization: token },
    });

    const newMessages = response.data;
    const localMessages = getLocalMessages();

    // Filter out messages that are already in local storage
    const filteredMessages = newMessages.filter(
      (newMsg) =>
        !localMessages.some((localMsg) => localMsg.message === newMsg.message)
    );

    // Display new messages
    filteredMessages.forEach((msg) => {
      console.log("message2",msg.message);
      displaychatMessages(msg);
      storeMessageLocally(msg);
    });

  } catch (err) {
    console.log(err.message);
  }
}

// Loaded function
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/getmessage", {
      headers: { Authorization: token },
    });

    const username = await axios.get("http://localhost:8000/getusername",{headers: { Authorization: token },})
    //console.log("Username---->",username);
    displaycurrentUser(username);
    // Display messages from local storage
    const localMessages = getLocalMessages();
    localMessages.forEach((msg) => {
      displaychatMessages(msg);
    });

    // Call the API every 1 second using setInterval
    const interval = setInterval(callApi, 1000);

    // Stop calling the API after a specific duration
    const stopCallingApiAfterDuration = 0.5 * 60 * 1000; // 0.5 minutes in milliseconds

    setTimeout(() => {
      clearInterval(interval);
      console.log("Stopped calling API.");
    }, stopCallingApiAfterDuration);
  } catch (err) {
    console.log(err.message);
  }
});

// ---------------------------------------  Group and User-Group -------------------------------------
document.addEventListener("DOMContentLoaded", ()=> {
  const createGroupBtn = document.getElementById("create-group-btn");
  const inviteUserBtn = document.getElementById('invite-user-btn');
  const UserGroupDiv = document.getElementById('user-groups');
  const groupMessageDiv = document.getElementById('group-messages')


  createGroupBtn.addEventListener('click',createGroup)
  //inviteUserBtn.addEventListener('click',inviteUser)


  async function createGroup(e) {
    e.preventDefault();
    try{
    const groupname = document.getElementById('group-name').value.trim();
    //console.log(groupname);
    document.getElementById('group-name').value = '';
    const token = localStorage.getItem("token");
    const groupName = await axios.post('http://localhost:8000/create-group',{groupname},{headers: { Authorization: token }})
    //console.log(groupName.data.creategroup.groupname);
    if(groupName.status == 201){
      localStorage.setItem('groupname', groupName.data.creategroup.groupname)
      alert("Group created successfully")
    }
    if(groupName.status == 200){
      alert("This Group-name already created ")
    }
    
    if(!groupName){
      alert("Please enter a valid group name");
    }
    }
    catch(err){
      console.log(err.message);
      alert("Something went Wrong")
    }
  }
})



