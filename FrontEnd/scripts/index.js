import { getWorksAPI, getCategoryAPI } from './api.js';

const sectionButtons = document.querySelector(".buttonsFilter");
const buttonAll = document.querySelector(".btn-filter_all");
const mainGallery = document.querySelector(".mainGallery");
const ModalBtn = document.getElementById("OpenModalBtn");
const logLink = document.getElementById("logLink");

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

//affichage galerie
async function generateProjects(projects) {
    try {
        mainGallery.innerHTML = "";
        projects.forEach(project => {
            const projectElement = document.createElement("article");
            const imageElement = document.createElement("img");
            imageElement.src = project.imageUrl;
            const titleElement = document.createElement("h3");
            titleElement.innerText = project.title;

            projectElement.appendChild(imageElement);
            projectElement.appendChild(titleElement);
            mainGallery.appendChild(projectElement);
        });
    } catch (error) {
        console.log("Une erreur est survenue lors de la récupération des projets", error);
    }
}


// Affichage boutons filtre catégories
export async function generateCategories() {
    try {
        const dataCategoriesFromAPI = await getCategoryAPI();
         let allProjects = [];
         allProjects = await getWorksAPI(); // Stocker tous les projets initialement

        if (isLogged === true) {
            buttonAll.remove();
            generateProjects(allProjects);
        } else {
            generateProjects(allProjects);// bouton tous
            ModalBtn.remove();
            sectionButtons.innerHTML = '';

            dataCategoriesFromAPI.forEach(category => {
                const projectCategoriesElement = document.createElement("button");
                projectCategoriesElement.classList.add("buttonCategories");
                projectCategoriesElement.textContent = category.name;
                projectCategoriesElement.addEventListener('click', function () {
                    const projectsForCategory = allProjects.filter(project => project.category.name === category.name);
                    generateProjects(projectsForCategory);
                });
                sectionButtons.appendChild(projectCategoriesElement);
            });
            buttonAll.addEventListener('click', function() { 
                generateProjects(allProjects);// bouton tous
            });
        }
    } catch (error) {
        console.log("Une erreur est survenue lors de la récupération des catégories", error);
    }
}
generateCategories();