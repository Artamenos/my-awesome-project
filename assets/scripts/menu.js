document.addEventListener('DOMContentLoaded', function() {
    // ===== ВЫПАДАЮЩЕЕ МЕНЮ =====
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navOverlay = document.getElementById('navOverlay');
    
    if (menuToggle && mainNav && navOverlay) {
        // Функция переключения меню
        function toggleMenu() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Переключаем классы
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            // Блокируем скролл на body при открытом меню
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        }
        
        // Функция закрытия меню
        function closeMenu() {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        
        // События для меню
        menuToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', closeMenu);
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.header__menu-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    closeMenu();
                }
            });
        });
        
        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767) {
                closeMenu();
            }
        });
        
        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // ===== КНОПКА "НАВЕРХ" =====
    const scrollTopButton = document.getElementById('scrollTop');
    
    if (scrollTopButton) {
        // Показываем/скрываем кнопку при скролле
        function handleScroll() {
            if (window.scrollY > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        }
        
        // Плавная прокрутка к началу
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Добавляем анимацию на иконку
            const icon = scrollTopButton.querySelector('i');
            icon.style.transform = 'translateY(-4px)';
            setTimeout(() => {
                icon.style.transform = 'translateY(0)';
            }, 300);
        });
        
        // Обработчик скролла
        window.addEventListener('scroll', handleScroll);
        
        // Проверяем сразу при загрузке
        handleScroll();
        
        // Клавиатурная навигация для кнопки
        scrollTopButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollTopButton.click();
            }
        });
    }
});