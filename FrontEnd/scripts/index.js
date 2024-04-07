import { getWorksAPI, getCategoryAPI } from './api.js';

const sectionButtons = document.querySelector(".buttonsFilter");
const buttonAll = document.querySelector(".btn-filter_all");
const mainGallery = document.querySelector(".mainGallery");
const ModalBtn = document.getElementById("OpenModalBtn");
const logLink = document.getElementById("logLink");
let btnDeleteList = document.querySelectorAll(".js-delete-work");
const allFilteredButtons = document.querySelectorAll(".buttonCategories");

// Récupérer le token depuis le stockage local
const token = localStorage.getItem("token");
const isLogged = token ? true : false;


//affichage mot login ou logout
function loggedState() {
    if(isLogged) { 
    logLink.textContent = "logout";
    }
    return
}
loggedState()


//suppression du token dans le localStorage selon login ou logout
function logLinkRoad() {
    logLink.addEventListener('click', function () {
        if (isLogged) {
            localStorage.removeItem("token");
            window.location.href = "../../FrontEnd/index.html";
        } else { 
            window.location.href = "../../FrontEnd/assets/HTML/login.html";
        }
    });
}
logLinkRoad()

        /*btnDeleteList.forEach(function(item) {
            item.addEventListener("click", function(event) {
                event.preventDefault(); 
                projectElement.id.remove();
            });
        })*/
        

//affichage des projets
export async function generateProjects() {
    try {
        const dataWorksFromAPI = await getWorksAPI();
        mainGallery.innerHTML = "";
        dataWorksFromAPI.forEach(project => {
            const projectElement = document.createElement("article");
            const imageElement = document.createElement("img");
            imageElement.src = project.imageUrl;
            const titleElement = document.createElement("h3");
            titleElement.innerText = project.title;

            projectElement.appendChild(imageElement);
            projectElement.appendChild(titleElement);
            mainGallery.appendChild(projectElement);
        });

    }
    catch (error) {
        console.log("Une erreur est survenue lors de la récupération des catégories", error);
    }
}





//affichage boutons filtre catégories
async function generateCategories() {
    try {
        const dataCategoriesFromAPI = await getCategoryAPI();
        const dataWorksFromAPI = await getWorksAPI();
        const projectsByCategory = {};
        console.log(projectsByCategory)
        dataCategoriesFromAPI.forEach(category => {
            projectsByCategory[category.name] = dataWorksFromAPI.filter(project =>project.category.name === category.name);
        });

        if (isLogged === true) {
            buttonAll.remove();
        } 
    
        else {
            ModalBtn.remove();
            sectionButtons.innerHTML = '';

            dataCategoriesFromAPI.forEach(category => {
                    const projectCategoriesElement = document.createElement("button");
                    console.log(projectCategoriesElement)
                    projectCategoriesElement.classList.add("buttonCategories");
                    projectCategoriesElement.textContent = category.name;
                    console.log("la") 
                    projectCategoriesElement.addEventListener('click', function () {
                        console.log("la") 
                        generateProjects(projectsByCategory[category.name]); // probleme lecture de ce code
                    });
                    sectionButtons.appendChild(projectCategoriesElement);
                });
                buttonAll.addEventListener('click', function() { // bouton tous
                });
            }
    } catch (error) {
        console.log("Une erreur est survenue lors de la récupération des catégories", error);
    }
}

generateCategories();
generateProjects();