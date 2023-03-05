document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "bt_sstorage-key"
    const USER_NAME_KEY = "bt_un_sstorage-key"

    const user_name = $('#user_name')
    const password = $('#password')
    const server = "http://greenvelvet.alwaysdata.net/bugTracker/api/login";


    const login = async (user_name, password) => {
        return await fetch(`${server}/${user_name}/${password}`)
            .then(response => response.json())
            .catch((err) => {
                console.log(err);
            });
    }

    // fonction d'ajout du token de session
    const setToken = (tokenObj) => {
        try {
            if(tokenObj){
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tokenObj))
            }else{
                throw new Error("Problème pendant l'ajout du token")
            }
        } catch (error) {
            console.error(error);
        }
    }


    const setUserName = (user_name) => {
        try {
            if(user_name){
                sessionStorage.setItem(USER_NAME_KEY, user_name)
            }else{
                throw new Error("Problème pendant l'ajout du nom d'utlisateur")
            }
        } catch (error) {
            console.error(error);
        }
    }



$('#login-form').on("submit", async (e) => {
    e.preventDefault();

    // connexion à l'appli
    try {
        const response = await login(user_name.val(), password.val());
        if(response.result.status == "done"){
            // set du token
            const tokenObj = {
                id: response.result.id,
                token: response.result.token
            }
            setToken(tokenObj)
            setUserName(user_name.val())

            // redirection page d'accueil
            location.replace("../page-main.html")

        }
            
        else{
                alert("Login ou mot de passe incorrects")
        }

    } 
        
    catch (error) {
        console.log(error);
    }

})

})