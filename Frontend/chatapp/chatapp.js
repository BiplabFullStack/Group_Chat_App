// Sample initial data for active users and chat messages
let activeUsers = ["User1", "User2", "User3"];
let chatMessages = [
    { user: "User1", message: "Hi, how are you?" },
    { user: "User2", message: "I'm doing great!" },
    { user: "User3", message: "Has anyone seen the movie?" },
];

function updateActiveUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = activeUsers.map(user => `<li class="list-group-item">${user}</li>`).join("");
}

function updateChatMessages() {
    const chatMessageList = document.getElementById("chat-messages");
    chatMessageList.innerHTML = chatMessages.map(msg => `<li class="list-group-item fade-in">${msg.user}: ${msg.message}</li>`).join("");
}

function sendMessage() {
    const inputElement = document.getElementById("message-input");
    const message = inputElement.value.trim();
    if (message) {
        const currentUser = "Current User"; // Replace with actual user authentication code
        chatMessages.push({ user: currentUser, message });
        inputElement.value = "";
        updateChatMessages();
    }
}

document.getElementById("send-btn").addEventListener("click", sendMessage);

// Initial update
updateActiveUsers();
updateChatMessages();
