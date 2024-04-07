// appel API works et catégories pour récupération éléments




export async function getWorksAPI() {
    try {
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) {
            throw new Error('Erreur lors de la requête.');
        }
        const allWorksAPI = await response.json();
        return allWorksAPI;

    } catch (error) {
        console.log('Une erreur est survenue :', error);
    }
}

export async function getCategoryAPI() {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        if (!response.ok) {
            throw new Error('Erreur lors de la requête.');
        }
        const allCategoriesAPI= await response.json();
        return allCategoriesAPI;

    } catch (error) {
        console.log('Une erreur est survenue :', error);
    }
}