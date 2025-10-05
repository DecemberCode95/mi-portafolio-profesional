// js/modules/projectLoader.js - VERSIÓN NUEVA Y CORREGIDA
export function loadProjects() {
    console.log('📁 Cargando proyectos...');
    
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
    
    console.log(`✅ ${projects.length} proyectos cargados correctamente`);
}

function getProjectsData() {
    return [
        {
            id: 1,
            title: "E-commerce Moderno",
            description: "Plataforma completa de comercio electrónico con carrito de compras, pasarela de pagos y panel de administración. Desarrollada con React y Node.js.",
            image: "img/proyectos/proyecto1-mockup.jpg",
            technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
            demoLink: "#",
            githubLink: "#",
            category: "fullstack",
            featured: true
        },
        {
            id: 2,
            title: "App de Gestión de Tareas", 
            description: "Aplicación web progresiva para gestión de tareas con funcionalidades colaborativas, notificaciones y sincronización en la nube.",
            image: "img/proyectos/proyecto2-mockup.jpg",
            technologies: ["Vue.js", "Firebase", "PWA", "CSS3", "JavaScript"],
            demoLink: "#",
            githubLink: "#",
            category: "frontend",
            featured: true
        },
        {
            id: 3,
            title: "Dashboard Analytics",
            description: "Panel de control interactivo con métricas en tiempo real, gráficos dinámicos y reportes automatizados para toma de decisiones.",
            image: "img/proyectos/proyecto3-mockup.jpg",
            technologies: ["React", "D3.js", "Chart.js", "Express", "PostgreSQL"],
            demoLink: "#",
            githubLink: "#",
            category: "dashboard",
            featured: false
        },
        {
            id: 4,
            title: "API REST Segura",
            description: "API RESTful desarrollada con autenticación JWT, documentación Swagger completa y suite de tests de integración.",
            image: "img/proyectos/proyecto4-mockup.jpg",
            technologies: ["Python", "Django", "PostgreSQL", "JWT", "Docker"],
            demoLink: "#",
            githubLink: "#",
            category: "backend",
            featured: false
        }
    ];
}

function createProjectElement(project, index) {
    const article = document.createElement('article');
    article.className = `portfolio-item ${project.featured ? 'portfolio-item--featured' : ''}`;
    article.setAttribute('data-category', project.category);
    
    // Delay para animación escalonada
    article.style.animationDelay = `${index * 0.1}s`;
    
    article.innerHTML = `
        <div class="portfolio-item__image-container">
            <img src="${project.image}" 
                 alt="${project.title}" 
                 class="portfolio-item__img"
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vY2t1cCBkZSBwcm95ZWN0bzwvdGV4dD48L3N2Zz4='">
            <div class="portfolio-item__overlay">
                <div class="portfolio-item__actions">
                    <a href="${project.demoLink}" class="btn btn--primary btn--small" target="_blank" aria-label="Ver demo de ${project.title}">
                        <span>🌐 Ver Demo</span>
                    </a>
                    <a href="${project.githubLink}" class="btn btn--secondary btn--small" target="_blank" aria-label="Ver código de ${project.title}">
                        <span>💻 Código</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="portfolio-item__content">
            <h3 class="portfolio-item__title">${project.title}</h3>
            <p class="portfolio-item__description">${project.description}</p>
            <div class="portfolio-item__technologies">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag" data-tech="${tech.toLowerCase()}">${tech}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Agregar microinteracciones
    addProjectInteractions(article);
    
    return article;
}

function addProjectInteractions(projectElement) {
    const imageContainer = projectElement.querySelector('.portfolio-item__image-container');
    const overlay = projectElement.querySelector('.portfolio-item__overlay');
    const img = projectElement.querySelector('.portfolio-item__img');
    
    // Efectos hover
    projectElement.addEventListener('mouseenter', () => {
        projectElement.style.transform = 'translateY(-8px)';
        projectElement.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
    });
    
    projectElement.addEventListener('mouseleave', () => {
        projectElement.style.transform = 'translateY(0)';
        projectElement.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    });
    
    // Efecto de carga de imagen
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
    
    // Estado inicial de la imagen
    img.style.opacity = '0';
    img.style.transform = 'scale(1.1)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Click en los tags de tecnología
    const techTags = projectElement.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const tech = tag.getAttribute('data-tech');
            console.log(`🔍 Filtrar por tecnología: ${tech}`);
            // Aquí puedes agregar filtrado por tecnología
        });
    });
}

// Función adicional para filtrar proyectos (opcional)
export function filterProjects(category) {
    const projects = document.querySelectorAll('.portfolio-item');
    
    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
    
    console.log(`🎯 Proyectos filtrados por: ${category}`);
}