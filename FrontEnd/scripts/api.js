// appel API works et catégories pour récupération éléments

export let allCategoriesAPI; 
export let allWorksAPI;


export async function getCategoryAPI() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error('Erreur lors de la requête.');
        }
        const data = await response.json();
        allCategoriesAPI = data;
        console.log(allCategoriesAPI, "categories source");
    } catch (error) {
        console.log('Une erreur est survenue :', error);
    }
}


export async function getWorksAPI() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error('Erreur lors de la requête.');
        }
        const data = await response.json();
        allWorksAPI = data;
        console.log(allWorksAPI, "works source");
    } catch (error) {
        console.log('Une erreur est survenue :', error);
    }
}

