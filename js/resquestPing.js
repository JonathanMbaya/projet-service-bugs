function ping(){

    fetch('http://greenvelvet.alwaysdata.net/bugTracker/api/ping', {
	method: 'get'
    })

    .then((res) => res.json())
    .then((response) => {
        console.log(response);
    })
    .catch((error) => console.error(error));
}

ping();