document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
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

    // 2. ФИЛЬТРАЦИЯ РАБОТ
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
        });
    });

    // 3. АНИМАЦИЯ ПРИ СКРОЛЛЕ
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
});