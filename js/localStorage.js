const STORAGE_KEY = "bt_sstorage-key"
const USER_NAME_KEY = "bt_un_sstorage-key"

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

// fonction d'ajout du token de session
const getToken = () => {
    try {
        if(sessionStorage.getItem(STORAGE_KEY)){
            return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
        }else{
            throw new Error("Problème pendant la lecture du token")
        }
    } catch (error) {
        console.error(error);
    }
}

// fonction de suppression du token
const removeToken = () => {
    try {
        if(sessionStorage.getItem(STORAGE_KEY)){
            sessionStorage.removeItem(STORAGE_KEY)
        }else{
            throw new Error("Problème pendant la suppression du token")
        }
    } catch (error) {
        console.error(error);
    }
}

// fonction de check si présence de token
const isTokenSet = () => {
    return sessionStorage.getItem(STORAGE_KEY)? true : false;
}

// fonction de sauvegarde du nom d'utilisateur
const setUserName = (userName) => {
    try {
        if(userName){
            sessionStorage.setItem(USER_NAME_KEY, userName)
        }else{
            throw new Error("Problème pendant l'ajout du nom d'utlisateur")
        }
    } catch (error) {
        console.error(error);
    }
}

// fonction de récup du nom d'utilisateur
const getUserName = () => {
    try {
        if(sessionStorage.getItem(USER_NAME_KEY)){
            return sessionStorage.getItem(USER_NAME_KEY)
        }else{
            throw new Error("Problème pendant la lecture du nom d'utlisateur")
        }
    } catch (error) {
        console.error(error);
    }
}