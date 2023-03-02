$('#btnConnexion').on('click',function login(){

    fetch('https://proxy-api-dm2.herokuapp.com/http://greenvelvet.alwaysdata.net/bugTracker/api/login/'+user_name+'/'+ password)

    .then((res) => res.json())
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.error(error));

    login();
})




