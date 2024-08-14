// Variables globales pour le carrousel
let slideIndex = 0;

// Fonction pour obtenir les images du dossier
function fetchImages() {
    const imagePaths = [];
    const imagesFolder = 'images/';
    
    // Ici, vous devez lister manuellement les images ou utiliser un mécanisme de serveur
    // pour générer cette liste dynamiquement. En mode client pur, cela doit être manuel.
    const imageFiles = [
        'photo1.jpg',
        'photo2.jpg',
        'photo3.jpg',
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

        const title = document.createElement('h3');
        title.textContent = `Photo ${index + 1}`;

        photoItem.appendChild(img);
        photoItem.appendChild(title);
        photoGrid.appendChild(photoItem);
    });
}

// Afficher le carrousel de manière dynamique
function changeSlide(n) {
    let slides = document.querySelectorAll('.carousel-images img');
    slideIndex += n;
    if (slideIndex >= slides.length) { slideIndex = 0 }
    if (slideIndex < 0) { slideIndex = slides.length - 1 }
    slides.forEach(slide => slide.style.display = 'none');
    slides[slideIndex].style.display = 'block';
}

// Modal pour agrandir l'image
function openModal(src, caption) {
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
}

// Exécution des fonctions après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    const images = fetchImages();
    const randomImages = getRandomImages(images, 3);

    generateCarousel(randomImages);
    generatePhotoGrid(images);
});
