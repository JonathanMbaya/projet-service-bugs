$('#btnSignUp').on('click',function signUp(){

    fetch('https://proxy-api-dm2.herokuapp.com/http://greenvelvet.alwaysdata.net/bugTracker/api/signup/'+user_name+'/'+password, {
	method: 'get'
    })

    .then((res) => res.json())
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.error(error));

    signUp();
})