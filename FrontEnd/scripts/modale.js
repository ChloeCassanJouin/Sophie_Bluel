import { getWorksAPI } from './api.js';
import { generateCategories } from './index.js';

const openModalBtn = document.getElementById('OpenModalBtn');
const modal = document.querySelector('.modal');
const modalGallery = document.querySelector(".modalGallery");
const closeModalBtn = document.getElementById('closeModal');
const titleModal = document.querySelector('.titleModal');
const Modal1SuppressProject = document.querySelector('.Modal1SuppressProject')
const BtnAddProject = document.querySelector('.addProjectsBtn');
const arrowBackToModale1 = document.querySelector('.arrowBackToModale1');
const formAddProject = document.getElementById("formAddProject");
const imageUrlupload = document.getElementById("imageUrl");
const mainGallery = document.querySelectorAll(".mainGallery");
const inputFieldsForm = document.querySelectorAll(".formField");
const formBtn = document.getElementById("boutonValidation");//bouton validation formulaire ajout
const popup = document.querySelector(".popup");
let projectElement; // utiliser dans fonction fetch


////////////////////////////////////////////////////////////////////////////////      TOKEN///////////////
const token = localStorage.getItem("token");
const isLogged = token ? true : false;// Vérifier si le token existe


///////////////////////////////////////////////////////////////////////////////      OUVERTURE-FERMETURE MODALE/
//ouverture modale1
function openModal1() {
openModalBtn.addEventListener("click", function() {
  modal.style.display = "flex";
  arrowBackToModale1.style.display= "none";
  formAddProject.style.display = "none";
  Modal1SuppressProject.style.display = "block";
});
}
openModal1()

//fermeture modale
closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Fermeture de la modale en cliquant en dehors
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});


///////////////////////////////////////////////////////////////////////////////      AFFICHAGE GALLERIE/
//affichage Gallerie modale
async function GetGalleryModal() {
  try {
    const dataWorksFromAPI = await getWorksAPI();
    modalGallery.innerHTML = "";
    formAddProject.style.display = "none";
    dataWorksFromAPI.forEach(project => {
      projectElement = document.createElement("article");

      const imageElement = document.createElement("img");
      imageElement.src = project.imageUrl;
      imageElement.alt = project.title;

      const idProjet = document.createElement("div");
      idProjet.classList.add("js-delete-work");
      idProjet.id = project.id;

      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fas", "fa-trash-alt"); 

      idProjet.appendChild(trashIcon);

      projectElement.appendChild(idProjet);
      projectElement.appendChild(imageElement);
      modalGallery.appendChild(projectElement);
    });
    deleteWork(); 

  } catch (error) {
    console.log("Une erreur est survenue lors de la récupération des catégories", error);
}
}
GetGalleryModal()


///////////////////////////////////////////////////////////////////////////////      AFFICHAGE FORMULAIRE/
//affichage modale 2
function Make2ndModalAppear() {
  BtnAddProject.addEventListener("click", function() {
    titleModal.textContent = "Ajout photo";
    Modal1SuppressProject.style.display = "none";
    formAddProject.style.display= "flex";
    arrowBackToModale1.style.display= "flex";
    formAddProject.reset();
    const imagePreview = document.getElementById('file-preview');
    imagePreview.src = ""; 
    const imageMiniature = document.querySelector(".imageMiniature"); 
    const greySquareModale2 = document.querySelector(".greySquareModale2");
    greySquareModale2.style.display = "flex";
    imageMiniature.style.display = "none"; 

  });
}
Make2ndModalAppear();

// faire réapparaître Modal1SuppressProject au click fleche
function ArrowBackToModale1() {
  arrowBackToModale1.addEventListener("click", function() {
        titleModal.textContent = "Galerie photo";
        formAddProject.style.display = "none";
        Modal1SuppressProject.style.display = "block";
    });
}
ArrowBackToModale1();

///////////////////////////////////////////////////////////////////////////////    STRUCTURE FORMULAIRE AJOUT PROJET/
//récupération des catégories dans formulaire
function fetchAndDisplayCategories() {
  fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(data => {
          const selectElement = document.getElementById('modalAddImageCategory');
          selectElement.innerHTML = ''; // Effacer les options existantes

          const blankOption = document.createElement('option');
            blankOption.value = ''; // La valeur vide
            blankOption.textContent = ''; // Texte affiché
            selectElement.appendChild(blankOption);

          data.forEach(category => {
              const optionElement = document.createElement('option');
              optionElement.value = category.id;
              optionElement.textContent = category.name;
              selectElement.appendChild(optionElement);
          });
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des catégories :', error);
      });
}
fetchAndDisplayCategories();


//popup
function showPopupModalAlert(message) {
  
  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");
  popupContent.innerHTML = `<p>${message}</p>`;

  popup.appendChild(popupContent);
  popup.style.display = "block";

document.addEventListener("click", closePopup);

function closePopup(event) {
  if (!popup.contains(event.target)) {
    popupContent.remove();
    popup.style.display = "none";
    document.removeEventListener("click", closePopup);
  }
}
}


//changement couleur bouton VALIDER formulaire ajout projet
inputFieldsForm.forEach(field => {
  field.addEventListener('input', () => {
    const isFormValid = Array.from(inputFieldsForm).every(field => field.value.trim() !== ''); 

    if (isFormValid) {
      formBtn.classList.add('active');
  } else {
    formBtn.classList.remove('active');
  }

  });
});


///////////////////////////////////////////////////////////////////////////////    AJOUT PROJET - ENVOI API/
// Ajouter un projet 
async function ajoutListenerAjoutProjet() {
  formBtn.addEventListener("click", async function(event) {
      event.preventDefault();
      Modal1SuppressProject.style.display = "block";
      titleModal.textContent = "Galerie photo";

      const token = localStorage.getItem("token");
      const photo = document.getElementById("imageUrl").files[0];
      const title = document.querySelector("input[name='title']").value;
      const category = document.querySelector("select[name='category.name']").value;

      try {
          const formData = new FormData();
          formData.append('image', photo);
          formData.append('title', title);
          formData.append('category', category);

          const response = await fetch("http://localhost:5678/api/works", {
              method: "POST",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              body: formData,
          });
          if (response.status === 201|| response.status === 200) {
            modalGallery.innerHTML = ""; 
            mainGallery.innerHTML = "";
            GetGalleryModal();
            generateCategories();
            formAddProject.reset();
            modal.style.display = "none";
            return
          }
          if (response.status === 400 || response.status === 500) {
            showPopupModalAlert("Veuillez remplir tous les champs du formulaire.");
            Modal1SuppressProject.style.display = "none";

            return;        
        } 
          if (response.status === 401) {
            showPopupModalAlert("Veuillez enregistrer à nouveau vos identifiants.");
            Modal1SuppressProject.style.display = "none";
            return;        
        }         
      } catch (error) {
          console.log(error);
      }      
  });
}
ajoutListenerAjoutProjet()




//  Afficher la miniature de l'image dans la deuxième modale
function displayImage() {
  const previewPhoto = () => {
    const file = imageUrlupload.files;
    if (file) {
      const fileReader = new FileReader();
      const preview = document.getElementById('file-preview');
      fileReader.onload = function (event) {
        preview.setAttribute('src', event.target.result);
      }
      fileReader.readAsDataURL(file[0]); 
    }
  }
  imageUrlupload.addEventListener("change", previewPhoto);

  imageUrlupload.addEventListener("click", function() {
    const imageMiniature = document.querySelector(".imageMiniature"); 
    const greySquareModale2 = document.querySelector(".greySquareModale2");
    greySquareModale2.style.display = "none";
    imageMiniature.style.display = "flex"; 
  });
}
displayImage();
                                                                                                                                    

////////////////////////////////////////////////////////////////////////////////////      SUPRESSION PROJET/
// click poubelle
function deleteWork() {
  let btnDeleteList = document.querySelectorAll(".js-delete-work");
  btnDeleteList.forEach(function(item) {
      item.addEventListener("click", function(event) {
          event.preventDefault(); 
          const projectId = this.id; 
          deleteProjets(projectId); 

      });
  });
}

//suppression de projets
async function deleteProjets(id) {
  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: { 
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.status === 204 || response.status == 200 ) {
      modalGallery.innerHTML = ""; 
      mainGallery.innerHTML = "";
      GetGalleryModal();
      generateCategories();

    }
    if (response.status === 500) {
      showPopupAlertAddProject('Une erreur technique est survenu-500, veuillez réessayer.');
    } 
  })
  .catch(error => {
    console.error('Une erreur est survenue lors de la suppression du projet !', error);
  });
}
