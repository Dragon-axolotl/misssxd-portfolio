document.addEventListener("DOMContentLoaded", () => {
    
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle__icon');
    const htmlElement = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggleBtn.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // Бургер меню
    const burgerBtn = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');

    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Фильтрация
    const filterButtons = document.querySelectorAll('.header__link');
    const portfolioRows = document.querySelectorAll('.row'); 

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioRows.forEach(row => {
                if (filterValue === 'all' || row.getAttribute('data-category') === filterValue) {
                    row.classList.remove('hidden'); 
                } else {
                    row.classList.add('hidden'); 
                }
            });

            // Закрываем меню на телефоне после выбора
            if (window.innerWidth <= 900) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Анимация при скролле
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1 };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => { appearOnScroll.observe(fader); });

    // Лайтбокс (Просмотр картинок)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    const allImages = document.querySelectorAll('.row__img');
    let currentIndex = 0;

    allImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            if (img.closest('.row').classList.contains('hidden')) return;
            
            const visibleImages = Array.from(allImages).filter(image => 
                !image.closest('.row').classList.contains('hidden')
            );
            
            currentIndex = visibleImages.indexOf(img);
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function showImage(index) {
        const visibleImages = Array.from(allImages).filter(image => 
            !image.closest('.row').classList.contains('hidden')
        );
        
        if (index >= visibleImages.length) currentIndex = 0;
        if (index < 0) currentIndex = visibleImages.length - 1;
        
        lightboxImg.src = visibleImages[currentIndex].src;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        showImage(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        showImage(currentIndex);
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') {
            currentIndex++;
            showImage(currentIndex);
        }
        if (e.key === 'ArrowLeft') {
            currentIndex--;
            showImage(currentIndex);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        
        if (touchEndX < touchStartX - 50) {
            currentIndex++;
            showImage(currentIndex);
        }
        if (touchEndX > touchStartX + 50) {
            currentIndex--;
            showImage(currentIndex);
        }
    });
});
