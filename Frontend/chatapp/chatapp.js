  // Add event listener to the send button
  document.getElementById("send-btn").addEventListener("click", sendMessage);

  
  // Send message
  async function sendMessage(e) {
    e.preventDefault();
    try {
      const inputElement = document.getElementById("message-input");
      const message = inputElement.value.trim();
      document.getElementById("message-input").value = "";
  
      const token = localStorage.getItem('token');
      const msgObj = { message };
  
      const response = await axios.post('http://localhost:8000/message', msgObj, { headers: { "Authorization": token } });
      displaychatMessages(msgObj);
    } catch (err) {
      console.log(err.message);
    }
  }
  
  // Display function
  function displaychatMessages(myObj) {
    console.log("This is my message ", myObj.message);
    const ul = document.getElementById('chat-messages');
  
    const li = document.createElement('p');
    li.innerHTML = `msg: ${myObj.message}`;
    li.style.color = 'Maroon';
    ul.appendChild(li);
  }
  
  //Fetch message from db
  async function callApi() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/getmessage', { headers: { "Authorization": token } });
  
      // Loop through the new messages and display them
      response.data.forEach(msg => {
        displaychatMessages(msg);
      });
    } catch (err) {
      console.log(err.message);
    }
  }


  // Loaded function
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/getmessage', { headers: { "Authorization": token } });
      console.log("My response", response);
      response.data.forEach(msg => {
        displaychatMessages(msg);
      });
    } catch (err) {
      console.log(err.message);
    }
  
    // Call the API every 1 second using setInterval
    const interval = setInterval(callApi, 1000);
  
    // Stop calling the API after a specific duration 
    const stopCallingApiAfterDuration = 0.5 * 60 * 1000; // 0.5 minutes in milliseconds
  
    setTimeout(() => {
      clearInterval(interval);
      console.log('Stopped calling API.');
    }, stopCallingApiAfterDuration);
  });
  

  
  