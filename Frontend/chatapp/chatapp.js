``
document.getElementById("send-btn").addEventListener("click", sendMessage);

//Send message
async function sendMessage(e) {
    e.preventDefault();
    try{
    const inputElement = document.getElementById("message-input");
    const message = inputElement.value.trim();
    document.getElementById("message-input").value ="";
   
    const token = localStorage.getItem('token');
    const msgObj ={message};

    const response = await axios.post('http://localhost:8000/message',msgObj,{headers: {"Authorization": token}})
    displaychatMessages(msgObj);
    }
    catch(err){
        console.log(err.message);
    }
}


//Display function 
function displaychatMessages(myObj) {
    console.log("This is my message ",myObj.message);
    const ul = document.getElementById('chat-messages');

    const li = document.createElement('p');
    // li.innerHTML = `message : ${myObj.message}`;
    li.innerHTML = `msg : ${myObj.message}`;

    li.style.color = 'Maroon'
    ul.appendChild(li);

}


//Loaded function
window.addEventListener('DOMContentLoaded',async()=>{
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8000/getmessage', { headers: { "Authorization": token } });
    console.log("My response",response);
    response.data.forEach(msg => {
        displaychatMessages(msg)
    });
})