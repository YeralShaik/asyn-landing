const API = `https://thronesapi.com/api/v2/Characters`;

//aqui agregaremos la iteracion de cada elemento(referencia)
const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'Accept': 'application/json'
}
};

async function fetchData(urlApi){
    const response = await fetch(urlApi, options)
    const data = await response.json();
    return data; 
}

//funcion que se autoinvoca
//cuando cargue el archivo se va a ejecutar
(async () =>{
    try {
        const characters = await fetchData(API);
        //crearemos un template en html para que itere por los elementos de la respuesta
        //view es esa porcion de html
        //usamos js para iterar 
        //en esta API , para acceder a los videos, se refiere a items, se hace un map para devolver un nuevo arreglo con el template por cada resultado
		let view = `
        ${characters.map(character =>`
            <div class="group relative">
            <div
                class="w-80 bg-gray-100 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none  ">
                <img src="${character.imageUrl}" alt="${character.title}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-100">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${character.firstName} ${character.lastName} 
                </h4>
            </div>
            </div>
        `).slice(20).join('')}    
        `;
	content.innerHTML = view;
    } catch (error) {
		console.log(error);
	}
})();