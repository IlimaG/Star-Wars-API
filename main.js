

fetch(`https://swapi.dev/api/people/`)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(person => {
            let info = document.querySelector("#character")
            let personaje = document.createElement(`div`)
            info.appendChild(personaje)

            personaje.innerHTML += `
            <h3>${person.name}</h3>
            <p>Height: ${person.height}</p>
            <p>Mass: ${person.mass}</p>
            <p>Gender: ${person.gender}</p>
            <h5> Vehicles:</h5>
            `

            let vehicleOBJ = document.createElement(`div`)
            info.appendChild(vehicleOBJ)

            person.vehicles?.forEach(vehicle => {
                fetch(vehicle)
                    .then(response => response.json())
                    .then(vehi => {
                        vehicleOBJ.innerHTML += `
                        <p>Name: ${vehi.name} </p>
                        <p>Model: ${vehi.model} </p>
                        <p>Manufacturer: ${vehi.manufacturer} </p>
                        `

                        let pilotos = document.createElement(`ul`)
                        pilotos.innerHTML = `<h5>Pilots:</h5>`
                        vehicleOBJ.appendChild(pilotos)

                        vehi.pilots.forEach(pilot => {
                            fetch(pilot) 
                            .then(response => response.json())
                            .then(pil =>{
                                if (pil.name.length == 0) {
                                    pilotos.innerHTML = ``
                                } else {
                                pilotos.innerHTML += `
                                <li>${pil.name} </li>                              
                                `}
                            })   
                        })                        
                    })

                let starshipsOBJ = document.createElement(`div`)
                info.appendChild(starshipsOBJ)

                person.starships?.forEach(starships => {
                    fetch(starships)
                        .then(response => response.json())
                        .then(stars => {
                            starshipsOBJ.innerHTML += `
                            <h5>Starship:</h5>
                            <p>Name: ${stars.name}</p>
                            `

                        let pilotosStars = document.createElement(`ul`)
                        pilotosStars.innerHTML = `<h5>Pilots:</h5>`
                        starshipsOBJ.appendChild(pilotosStars)

                        stars.pilots.forEach(pilot => {
                            fetch(pilot) 
                            .then(response => response.json())
                            .then(pil =>{
                                    pilotosStars.innerHTML += `
                                <li>${pil.name} </li>                              
                                `
                            })   
                        })
                        })
                })

            })
        })    
    })
