document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "bt_sstorage-key"

    // fonction de récup du nom d'utilisateur
    const server = "http://greenvelvet.alwaysdata.net/bugTracker/api";

    // fonction de check si présence de token
    const isTokenSet = () => {
        return sessionStorage.getItem(STORAGE_KEY)? true : false;
    }

    // redirection si pas connecté
    if(!isTokenSet()){
        location.replace("../index.html")
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


    // fonction de récup de tous les bugs
    const getAllDevs = async (token) => {

        return await fetch(`${server}/users/${token}`)
        .then(response => response.json())

    }

    // fonction de récup de tous les bugs
    const getAllBugs = async (token, userId) => {
        return await fetch(`${server}/list/${token}/${userId}`)
            .then(response => response.json())
    }


    // récup du nom d'utilisateur


    // clic sur bouton deconnexion

    $('#logout').on('click', () => {
        removeToken()
        location.replace("../index.html")
    })

    const selectChange = async (e, token, bugId) => {

        try {
            const response = await updateOneBug(token, bugId, e.target.value)

            if(response.result.status === "done"){
                alert("Etat du bug mis à jour")
                location.replace("../page-main.html")
            }
            
            else{
                alert("Une erreur est survenue pendant la mise à jour du bug")
            }
        } 
        
        catch (error) {
            console.error(error);
        }

    }



    // clic sur bouton supprimer
    const btnDelClick = async (e, token, bugId) => {
        e.preventDefault()
        try {
            const response = await deleteOneBug(token, bugId)
            if(response.result.status === "done"){
                alert("Bug supprimé")
                location.replace("../page-main.html")
            }else{
                alert("Une erreur est survenue pendant la suppression du bug")
            }
        } catch (error) {
            console.error(error);
        }
    }
    // exécution de la requête et affichage de la liste des bugs
    try {
        const execAsync = async () => {

            const {token} = getToken()
            const bugResponse = await getAllBugs(token)
            const bugs = bugResponse.result.bug
            const devResponse = await getAllDevs(token)
            const devs = devResponse.result.user
            console.log(bugs);
            console.log(devs);




            // remplissage du tableau
            if(bugs.length > 0){
                bugs.forEach(bug => {
                    $("tbody").append(`
                        <tr id="tr-${bug.id}">
                            <td>${bug.title}</td>
                            <td>${new Date(bug.timestamp*1000).toLocaleDateString("fr-FR")}</td>
                            <td>${devs[1]}</td>
                            <td>
                                <select name="bug-state" class="bug-state">
                                    <option value="0">Non traité</option>
                                    <option value="1">En cours</option>
                                    <option value="2">Traité</option>
                                </select>
                            </td>
                            <td><button class="btn-del">Supprimer</button></td>
                        </tr>
                    `)
                    $(`#tr-${bug.id} select`).val(bug.state)
                    $(`#tr-${bug.id} select`).on("change", (e) => selectChange(e, token, bug.id))
                    $(`#tr-${bug.id} .btn-del`).on("click", (e) => btnDelClick(e, token, bug.id))
                });
            }else{
                $("#bugs-table").addClass("d-none")
                $(".no-bug").addClass("d-block")
            }  
            
            // mise à jour des stats
            $(".bugs-stats .total .number").text(bugs.filter)
            $(".bugs-stats .progress .number").text(bugs.filter(bug => bug.state === "1").length)
            $(".bugs-stats .treated .number").text(bugs.filter(bug => bug.state === "2").length)
        }
        execAsync()
    } catch (error) {
        console.log(error)
    }




})