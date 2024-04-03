// appel API works et catégories pour récupération éléments

function getCategoryAPI() {
    fetch('http://localhost:5678/api/categories')
    .then((response) => {
        return response.json();
    })
    .then(data => {
        let allCategoriesAPI = data;
        console.log(allCategoriesAPI, "dans la fonction")
    })
    .catch(function(error) {
        console.log(error);
      });
}
getCategoryAPI();

function getWorksAPI() {
    fetch('http://localhost:5678/api/works')
    .then((response) => {
        return response.json();
      })
    .then(data => {
        let allWorksAPI = data;
        console.log(allWorksAPI, "dans la fonction")

    })
    .catch(function(error) {
        console.log(error);
      });
}
getWorksAPI()
