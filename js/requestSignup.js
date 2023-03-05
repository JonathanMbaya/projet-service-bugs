document.addEventListener("DOMContentLoaded", () => {
    const usernameSub = $('#signUpUserName')
    const passwordSub = $('#signUpPassword')
    const server = "http://greenvelvet.alwaysdata.net/bugTracker/api/signup";


    const login = async (usernameSub, passwordSub) => {

        return await fetch(`${server}/${usernameSub}/${passwordSub}`)

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



$('#subscribe-form').on("submit", async (e) => {
    e.preventDefault();

    // connexion à l'appli
    try {
        const response = await login(usernameSub.val(), passwordSub.val());
        if(response.result.status === "done"){
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
            alert("Nom d'utilisateur indisponible")
        }

    } 
        
    catch (error) {
        console.log(error);
    }

})

})