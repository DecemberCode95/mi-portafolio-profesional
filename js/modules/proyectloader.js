// js/modules/projectLoader.js - Cargador de Proyectos Bento Grid

export function loadProjects() {
    const projects = getProjectsData();
    const gridContainer = document.getElementById('portfolioGrid');
    
    if (!gridContainer) {
        console.error('❌ No se encontró el contenedor de proyectos');
        return;
    }
    
    // Limpiar contenedor
    gridContainer.innerHTML = '';
    
    // Crear y agregar cada proyecto
    projects.forEach((project, index) => {
        const projectElement = createProjectElement(project, index);
        gridContainer.appendChild(projectElement);
    });
    
    console.log(`✅ ${projects.length} proyectos cargados`);
}

function getProjectsData() {
    return [
        {
            id: 1,
            title: "E-commerce Moderno",
            description: "Plataforma de comercio electrónico desarrollada con React y Node.js, featuring carrito de compras, pasarela de pago y panel de administración.",
            image: "img/project1.jpg",
            technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
            link: "#",
            github: "#",
            category: "fullstack",
            featured: true
        },
        {
            id: 2,
            title: "App de Gestión de Tareas", 
            description: "Aplicación web progresiva para gestión de tareas con funcionalidades offline, notificaciones y sincronización en la nube.",
            image: "img/project2.jpg",
            technologies: ["JavaScript", "CSS3", "HTML5", "PWA", "IndexedDB"],
            link: "#",
            github: "#",
            category: "frontend",
            featured: false
        },
        {
            id: 3,
            title: "Dashboard Analytics",
            description: "Panel de control interactivo con gráficos en tiempo real, métricas de negocio y reporting avanzado para toma de decisiones.",
            image: "img/project3.jpg",
            technologies: ["Vue.js", "D3.js", "Firebase", "Chart.js", "Sass"],
            link: "#",
            github: "#",
            category: "dashboard",
            featured: true
        },
        {
            id: 4,
            title: "API REST Segura",
            description: "API RESTful desarrollada con autenticación JWT, documentación Swagger y tests de integración completos.",
            image: "img/project1.jpg", // Usar misma imagen temporal
            technologies: ["Python", "Django", "PostgreSQL", "JWT", "Docker"],
            link: "#",
            github: "#",
            category: "backend",
            featured: false
        }
    ];
}

function createProjectElement(project, index) {
    const article = document.createElement('article');
    article.className = `portfolio-item ${project.featured ? 'portfolio-item--featured' : ''}`;
    article.setAttribute('data-category', project.category);
    
    // Añadir delay para animación escalonada
    article.style.animationDelay = `${index * 0.1}s`;
    
    article.innerHTML = `
        <div class="portfolio-item__image-container">
            <img src="${project.image}" 
                 alt="${project.title}" 
                 class="portfolio-item__img"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBkZSBwcm95ZWN0bzwvdGV4dD48L3N2Zz4='">
            <div class="portfolio-item__overlay">
                <div class="portfolio-item__actions">
                    <a href="${project.link}" class="btn btn--primary btn--small" target="_blank">Ver Demo</a>
                    <a href="${project.github}" class="btn btn--secondary btn--small" target="_blank">GitHub</a>
                </div>
            </div>
        </div>
        <div class="portfolio-item__content">
            <h3 class="portfolio-item__title">${project.title}</h3>
            <p class="portfolio-item__desc">${project.description}</p>
            <div class="portfolio-item__tech">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Añadir microinteracciones hover
    addProjectInteractions(article);
    
    return article;
}

function addProjectInteractions(projectElement) {
    const imageContainer = projectElement.querySelector('.portfolio-item__image-container');
    const overlay = projectElement.querySelector('.portfolio-item__overlay');
    
    // Efecto hover suave
    projectElement.addEventListener('mouseenter', () => {
        projectElement.style.transform = 'translateY(-8px)';
        projectElement.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        overlay.style.opacity = '1';
    });
    
    projectElement.addEventListener('mouseleave', () => {
        projectElement.style.transform = 'translateY(0)';
        projectElement.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
        overlay.style.opacity = '0';
    });
    
    // Efecto de carga de imagen
    const img = projectElement.querySelector('img');
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
}