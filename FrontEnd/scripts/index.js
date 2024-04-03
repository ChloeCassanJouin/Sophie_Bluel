import { getCategoryAPI } from './api.js';

getCategoryAPI()
console.log(getCategoriesAPI)

const sectionButtons = document.querySelector(".buttonsFilter");
const buttonAll = document.querySelector(".btn-filter_all");
const mainGallery = document.querySelector(".mainGallery");
const ModalBtn = document.getElementById("OpenModalBtn");
const logLink = document.getElementById("logLink");
let btnDeleteList = document.querySelectorAll(".js-delete-work");


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

//;
//affichage boutons filtre catégories
function generateCategories() {

    allCategoriesAPI.forEach(category => {
        projectsByCategory[category.name] = architectProjects.filter(project => project.category.name === category.name);// souci appel
    });

    if (isLogged === true) {
        buttonAll.remove();
    }

    if (isLogged === false) {
        ModalBtn.remove();
        sectionButtons.innerHTML = '';
        allCategoriesAPI.forEach(category => {
            const projectCategoriesElement = document.createElement("button");
            projectCategoriesElement.classList.add("buttonHighlight");
            projectCategoriesElement.textContent = category.name;
            projectCategoriesElement.addEventListener('clic', function () {
                generateProjects(projectsByCategory[category.name]);
            });
            sectionButtons.appendChild(projectCategoriesElement);
        });
    }
}
generateCategories();
    /*.catch(error => {
        console.error('Une erreur est survenue lors de la récupération des catégories :', error);
    });*/




//affichage gallerie
export  function generateProjets() {

        allWorksAPI.forEach(project => {
        const projectElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        const titleElement = document.createElement("h3");
        titleElement.innerText = project.title;

        projectElement.appendChild(imageElement);
        projectElement.appendChild(titleElement);
        mainGallery.appendChild(projectElement);
    
    btnDeleteList.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault(); 
            projectElement.id.remove();
        });
    });
    });
} 
generateProjets()


export function testExport() {
    console.log("j'ai bien été exporté")
}