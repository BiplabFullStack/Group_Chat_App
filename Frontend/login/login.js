

async function myloginFunc(event){
    try{
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        event.target.reset()
        const myObj = { username,password };
        const response = await axios.post("http://localhost:8000/login",myObj);
       // console.log(response.data.token);
        if(response.status == 200){
            alert("login Successfully")
            localStorage.setItem('token',response.data.token);
            window.location.href ="../chatapp/chatapp.html";
        }

    }
    catch(err){
        console.log(err.message);
        alert("Invalid Username and Password")
        
    }
}