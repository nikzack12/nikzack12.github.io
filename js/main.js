document.addEventListener('DOMContentLoaded', () => {
    const setupList = document.getElementById('setupList');
    const galleryImages = document.getElementById('galleryImages');
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.getElementsByClassName('close')[0];

    let setups = [];
    let gallery = [];

    // Fetch setups and gallery data
    fetch('assets/setups.json')
        .then(response => response.json())
        .then(data => {
            setups = data.setups;
            gallery = data.gallery;
            displaySetups(setups);
            displayGallery(gallery);
        })
        .catch(error => console.error('Error fetching setup data:', error));

    // Display setups
    function displaySetups(setups) {
        setupList.innerHTML = '';
        setups.forEach(setup => {
            const setupDiv = document.createElement('div');
            setupDiv.classList.add('setup');
            
            const setupImg = document.createElement('img');
            setupImg.src = `assets/img/${setup.image}`;
            setupImg.alt = setup.name;
            setupImg.addEventListener('click', () => openModal(setup.image));
            
            const setupName = document.createElement('h3');
            setupName.textContent = setup.name;
            
            const setupDesc = document.createElement('p');
            setupDesc.textContent = setup.description;
            
            const setupLink = document.createElement('a');
            setupLink.href = setup.affiliateLink;
            setupLink.target = '_blank';
            setupLink.textContent = 'View on Shopee'; // Replace with appropriate text
            setupLink.classList.add('affiliate-link');

            setupDiv.appendChild(setupImg);
            setupDiv.appendChild(setupName);
            setupDiv.appendChild(setupDesc);
            setupDiv.appendChild(setupLink);
            
            setupList.appendChild(setupDiv);
        });
    }

    // Display gallery
    function displayGallery(images) {
        galleryImages.innerHTML = '';
        images.forEach(image => {
            const img = document.createElement('img');
            img.src = `assets/img/${image}`;
            img.alt = 'Gallery Image';
            img.addEventListener('click', () => openModal(image));
            galleryImages.appendChild(img);
        });
    }

    // Open modal
    function openModal(image) {
        modalImg.src = `assets/img/${image}`;
        imageModal.style.display = 'block';
    }

    // Close modal
    closeModal.onclick = () => {
        imageModal.style.display = 'none';
    }

    // Close modal when clicking outside of the image
    window.onclick = (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});