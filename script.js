// Espera até que o documento seja totalmente carregado | Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVEGAÇÃO E HEADER ========== | ========== NAVIGATION AND HEADER ==========
    
    // Seleciona elementos relevantes | Select relevant elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links li a');
    
    /**
     * Alterna o menu móvel quando o hamburguer é clicado | Toggle mobile menu when hamburger is clicked
     */
    hamburger.addEventListener('click', function() {
        // Alterna a classe 'active' para animar o ícone do hamburguer | Toggle 'active' class to animate hamburger icon
        hamburger.classList.toggle('active');
        // Alterna a classe 'active' para mostrar/esconder o menu | Toggle 'active' class to show/hide the menu
        navLinks.classList.toggle('active');
    });
    
    /**
     * Fecha o menu móvel quando um item é clicado | Close mobile menu when an item is clicked
     */
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    /**
     * Adiciona sombra ao cabeçalho quando a página é rolada | Add shadow to header when the page is scrolled
     */
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Atualiza o link ativo na navegação | Update active link in navigation
        updateActiveNavLink();
    });
    
    /**
     * Atualiza o link ativo na navegação com base na secção visível | Update nav active link based on visible section
     */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                // Remove a classe 'active' de todos os links | Remove 'active' class from all links
                navLinkItems.forEach(link => link.classList.remove('active'));
                
                // Adiciona a classe 'active' ao link correspondente à secção atual | Add 'active' to current section's link
                document.querySelector(`.nav-links a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // ========== EFEITO DE DIGITAÇÃO ========== | ========== TYPING EFFECT ==========
    
    /**
     * Cria um efeito de digitação para o texto especificado | Creates a typing effect for the specified text
     */
    function typeWriterEffect() {
        const words = ['Web', 'Frontend', 'HTML', 'CSS', 'JavaScript'];
        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;
        const typingElement = document.querySelector('.typing');
        
        // Se o elemento não existir, retorna | Return if element does not exist
        if (!typingElement) return;
        
        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Deletar letras | Delete letters
                typingElement.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                // Escrever letras | Type letters
                typingElement.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }
            
            // Velocidade da digitação (mais rápido para deletar) | Typing speed (faster for deleting)
            let typeSpeed = isDeleting ? 80 : 150;
            
            // Quando terminar de digitar a palavra | When word is fully typed
            if (!isDeleting && letterIndex === currentWord.length) {
                typeSpeed = 2000; // Pausa antes de apagar | Pause before deleting
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Próxima palavra | Next word
                typeSpeed = 500; // Pausa antes de digitar | Pause before typing
            }
            
            setTimeout(type, typeSpeed);
        };
        
        // Inicia o efeito de digitação | Start typing effect
        setTimeout(type, 1000);
    }
    
    typeWriterEffect(); // Inicia o efeito | Starts effect
    
    // ========== FILTRO DE PROJETOS ========== | ========== PROJECT FILTER ==========
    
    // Seleciona os botões de filtro e os cartões de projetos | Select filter buttons and project cards
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    /**
     * Filtra os projetos quando um botão de filtro é clicado | Filter projects when a filter button is clicked
     */
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe 'active' de todos os botões | Remove 'active' from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado | Add 'active' to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter'); // Categoria a filtrar | Filter category
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block'; // Mostrar | Show
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0'; // Ocultar | Hide
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ========== FORMULÁRIO DE CONTACTO ========== | ========== CONTACT FORM ==========
    
    // Seleciona o formulário e o elemento de status | Select the form and status element
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    /**
     * Processa o envio do formulário de contacto | Handle contact form submission
     */
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Em um projeto real, aqui seria feito o envio dos dados do formulário | Normally you'd send data to a server
            formStatus.textContent = "Enviando mensagem..."; // Sending message...
            formStatus.className = '';
            formStatus.style.display = 'block';
            
            // Simulação de envio | Simulated submission
            setTimeout(() => {
                formStatus.textContent = "Mensagem enviada com sucesso! Entraremos em contacto em breve."; // Message sent successfully
                formStatus.className = 'success';
                contactForm.reset(); // Limpa formulário | Clear form
                
                setTimeout(() => {
                    formStatus.style.display = 'none'; // Esconde status | Hide status
                }, 5000);
            }, 1500);
            
            /*
            // Para simular um erro, descomente estas linhas | To simulate an error, uncomment this
            setTimeout(() => {
                formStatus.textContent = "Erro ao enviar a mensagem. Por favor, tente novamente."; // Error message
                formStatus.className = 'error';
            }, 1500);
            */
        });
    }
    
    // ========== ANIMAÇÕES AO ROLAR ========== | ========== SCROLL ANIMATIONS ==========
    
    /**
     * Adiciona animação de entrada aos elementos visíveis | Add entrance animation to visible elements
     */
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-title, .skill-card, .timeline-item, .project-card, .about-content, .contact-content');
        
        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight - 150) {
                element.classList.add('animated'); // Ativa animação | Activate animation
            }
        });
    }
    
    window.addEventListener('load', animateOnScroll); // Ao carregar | On load
    window.addEventListener('scroll', animateOnScroll); // Ao rolar | On scroll
    
    // ========== INICIALIZAÇÃO INICIAL ========== | ========== INITIAL SETUP ==========
    
    updateActiveNavLink(); // Define link ativo | Set active nav link
});

/**
 * Adiciona uma classe CSS para animações ao documento | Add animation CSS to the document
 */
(function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animações para elementos | Animations for elements */
        .section-title, .skill-card, .timeline-item, .project-card, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Atraso para elementos sequenciais | Delay for sequential elements */
        .skill-card:nth-child(2) { transition-delay: 0.2s; }
        .skill-card:nth-child(3) { transition-delay: 0.3s; }
        .skill-card:nth-child(4) { transition-delay: 0.4s; }
        .skill-card:nth-child(5) { transition-delay: 0.5s; }
        .skill-card:nth-child(6) { transition-delay: 0.6s; }
        
        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.4s; }
        
        .project-card:nth-child(2) { transition-delay: 0.1s; }
        .project-card:nth-child(3) { transition-delay: 0.2s; }
        .project-card:nth-child(4) { transition-delay: 0.3s; }
        .project-card:nth-child(5) { transition-delay: 0.4s; }
        .project-card:nth-child(6) { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
})();
