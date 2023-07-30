async function myloginFunc(event){
    try{
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const myObj = { username,password };
        const response = await axios.post("http://localhost:8000/login",myObj);
        if(response.status == 201){
            alert("login Successfully")
        }

    }
    catch(err){
        console.log(err.message);
    }
}