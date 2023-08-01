
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
    const msgObj = { message };

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
  //console.log("This is my message ", myObj.message);
  const ul = document.getElementById("chat-messages");

  const li = document.createElement("li");
  li.innerHTML = `msg: ${myObj.message}`;
  li.style.color = "Maroon";
  li.class = "list-group-item fade-in";
  ul.appendChild(li);
}

// Fetch message from db
async function callApi() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/getmessage", {
      headers: { Authorization: token },
    });
    // response.data.forEach(msg =>{
    //   displaychatMessages(msg);
    // })

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

    // Store new messages in local storage
    // filteredMessages.forEach((msg) => {
    //   storeMessageLocally(msg);
    // });
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





