let slideIndex = 0;
let slides;
let autoSlideInterval;

// Fonction pour obtenir les images du dossier
function fetchImages() {
    const imagePaths = [];
    const imagesFolder = 'images/';
    
    const imageFiles = [
        'IMG_0149.jpg',
        'IMG_0419.jpg',
        'IMG_0486.jpg',
        'IMG_0488.jpg',
        // Ajoutez ici toutes les autres images
    ];

    imageFiles.forEach(file => {
        imagePaths.push(imagesFolder + file);
    });

    return imagePaths;
}

// Fonction pour choisir 3 images aléatoires
function getRandomImages(imagesArray, num) {
    const shuffled = imagesArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

// Fonction pour générer le carrousel
function generateCarousel(imagesArray) {
    const carouselContainer = document.getElementById('carousel-images');
    imagesArray.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
        img.style.display = index === 0 ? 'block' : 'none'; // Affiche seulement la première image
        carouselContainer.appendChild(img);
    });
    slides = document.querySelectorAll('.carousel-images img');
    autoSlideInterval = setInterval(() => changeSlide(1), 7000); // Changer d'image toutes les 7 secondes
}

// Fonction pour générer la grille de photos
function generatePhotoGrid(imagesArray) {
    const photoGrid = document.getElementById('photo-grid');
    imagesArray.forEach((src, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Photo ${index + 1}`;
        img.onclick = function() {
            openModal(src, `Photo ${index + 1}`);
        };

        photoItem.appendChild(img);
        photoGrid.appendChild(photoItem);
    });
}

// Afficher le carrousel de manière dynamique
function changeSlide(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) { slideIndex = 0 }
    if (slideIndex < 0) { slideIndex = slides.length - 1 }
    slides.forEach(slide => slide.style.display = 'none');
    slides[slideIndex].style.display = 'block';
}

// Modal pour agrandir l'image
function openModal(src, caption) {
    clearInterval(autoSlideInterval); // Stopper le carrousel automatique quand la modal est ouverte
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-image");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = src;
    captionText.textContent = caption;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    autoSlideInterval = setInterval(() => changeSlide(1), 7000); // Relancer le carrousel après fermeture de la modal
}

// Exécution des fonctions après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    const images = fetchImages();
    const randomImages = getRandomImages(images, 3);

    generateCarousel(randomImages);
    generatePhotoGrid(images);
});
