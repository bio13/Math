// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Sistema de navegação
    initializeNavigation();
    
    // Inicializar quizzes
    initializeQuizzes();
    
    // Inicializar lições
    initializeLessons();
    
    // Animações de progresso
    animateProgressBars();
    
    // Inicializar marcadores de conteúdo
    initializeContentChecks();
});

// Sistema de navegação entre páginas
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            // Esconder todas as páginas
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Mostrar a página alvo
            document.getElementById(target).classList.add('active');
            
            // Atualizar a navegação
            navLinks.forEach(nav => {
                nav.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    });
    
    // Botão de começar aprendizado
    document.getElementById('start-learning').addEventListener('click', function() {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById('lessons').classList.add('active');
        
        // Atualizar navegação
        navLinks.forEach(nav => {
            nav.parentElement.classList.remove('active');
            if (nav.getAttribute('data-target') === 'lessons') {
                nav.parentElement.classList.add('active');
            }
        });
    });
    
    // Função para carregar progresso salvo
function loadLessonProgress() {
    const savedProgress = JSON.parse(localStorage.getItem('lessonProgress')) || {};
    const startLessonButtons = document.querySelectorAll('.start-lesson');

    startLessonButtons.forEach(button => {
        const lessonId = button.getAttribute('data-lesson');
        if (savedProgress[lessonId]) {
            button.classList.add('checked');
            button.innerHTML = "✔️ Concluído";
        }
    });
}

// Botões de começar lição
const startLessonButtons = document.querySelectorAll('.start-lesson');
startLessonButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const lessonId = this.getAttribute('data-lesson');

        // Marcar como concluído
        this.classList.add('checked');
        this.innerHTML = "✔️ Concluído";

        // Atualizar progresso do usuário
        updateProgress('lesson', true);

        // Salvar no localStorage
        let savedProgress = JSON.parse(localStorage.getItem('lessonProgress')) || {};
        savedProgress[lessonId] = true;
        localStorage.setItem('lessonProgress', JSON.stringify(savedProgress));

        // Redirecionar para a lição
        window.location.href = `lesson${lessonId}.html`;
    });
});

// Carregar progresso ao abrir a página
document.addEventListener('DOMContentLoaded', loadLessonProgress);


    
    // Botão de voltar nas lições (se ainda existir a página interna)
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById('home').classList.add('active');
            
            // Atualizar navegação
            navLinks.forEach(nav => {
                nav.parentElement.classList.remove('active');
                if (nav.getAttribute('data-target') === 'home') {
                    nav.parentElement.classList.add('active');
                }
            });
        });
    }
}

// Novo sistema de checks em conteúdos
function initializeContentChecks() {
    const contentLinks = document.querySelectorAll('.content-link'); // links dos conteúdos
    
    contentLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Marcar visualmente com um check
            this.classList.add('checked');
            this.innerHTML = "✔️ " + this.textContent;
            
            // Atualizar progresso
            updateProgress('content', true);
        });
    });
}

// Atualizar progresso do usuário
function updateProgress(type, success) {
    if (success) {
        // Atualizar barras de progresso
        const progressBars = document.querySelectorAll('.chart-fill');
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width);
            if (currentWidth < 100) {
                const newWidth = Math.min(currentWidth + 10, 100);
                bar.style.width = newWidth + '%';
                
                // Atualizar texto de porcentagem
                const percentElement = bar.closest('.chart-bar').querySelector('.chart-percent');
                if (percentElement) {
                    percentElement.textContent = newWidth + '%';
                }
            }
        });
        
        // Atualizar estatísticas do perfil
        const pointsElement = document.querySelector('.stat-value:nth-child(2)');
        if (pointsElement) {
            const currentPoints = parseInt(pointsElement.textContent);
            pointsElement.textContent = currentPoints + 25;
        }
    }
}

// Animar barras de progresso
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
    
    const chartBars = document.querySelectorAll('.chart-fill');
    chartBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 800);
    });
}
