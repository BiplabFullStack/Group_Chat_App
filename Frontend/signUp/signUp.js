async function mySignUpFunc(event){
    try{
    
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const password = document.getElementById('password').value;

    const myObj={ firstName, lastName, email, number, password };

    const response = await axios.post("http://localhost:8000/postdata",myObj);
        if(response.status == 201){
            alert("Account Successfully Created");
        }
    }
    catch(err){
        console.log(JSON.stringify(err));
    }
}