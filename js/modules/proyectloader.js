// js/modules/projectLoader.js - Versión mejorada y robusta
// - Renderiza proyectos con imágenes siempre visibles (placeholders si faltan assets)
// - Incluye secciones de Tareas (scope) y Beneficios (impacto)
// - Mantiene microinteracciones y accesibilidad

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
  // Sustituir por tus imágenes reales cuando estén listas en assets/images/projects
  // Mientras, se usan placeholders consistentes (Picsum) para evitar 404s
  return [
    {
      id: 1,
      title: 'E-commerce Moderno',
      sponsor: 'Proyecto personal',
      role: 'Frontend + Arquitectura UI',
      description:
        'Plataforma de comercio electrónico con carrito, pagos y panel de administración. Diseño accesible y responsive.',
      imageThumb: 'https://picsum.photos/seed/ecommerce-thumb/640/420',
      imageFull: 'https://picsum.photos/seed/ecommerce-full/1600/1067',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      tasks: [
        'Implementación de carrito y checkout con validaciones',
        'Optimización de rendimiento (Code splitting, lazy loading)',
        'Diseño de componentes reutilizables (Design System)'
      ],
      benefits: [
        'Mejora de conversión +18%',
        'Reducción de TTI en 35%',
        'Accesibilidad AA'
      ],
      demoLink: '#',
      githubLink: 'https://github.com/DecemberCode95',
      category: 'fullstack',
      featured: true
    },
    {
      id: 2,
      title: 'App de Gestión de Tareas (PWA)',
      sponsor: 'Proyecto personal',
      role: 'Frontend',
      description:
        'PWA colaborativa con sincronización, notificaciones y modo offline-first.',
      imageThumb: 'https://picsum.photos/seed/tasks-thumb/640/420',
      imageFull: 'https://picsum.photos/seed/tasks-full/1600/1067',
      technologies: ['Vue.js', 'Firebase', 'PWA', 'CSS3'],
      tasks: [
        'Sincronización en tiempo real con Firestore',
        'Soporte offline y cacheo con Service Worker',
        'Notificaciones push'
      ],
      benefits: [
        'Retención de usuarios +22%',
        'Tiempo de carga < 2s en 3G',
        'Lighthouse 95+'
      ],
      demoLink: '#',
      githubLink: 'https://github.com/DecemberCode95',
      category: 'frontend',
      featured: true
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      sponsor: 'Proyecto personal',
      role: 'Frontend',
      description:
        'Panel interactivo con métricas en tiempo real y gráficos dinámicos.',
      imageThumb: 'https://picsum.photos/seed/analytics-thumb/640/420',
      imageFull: 'https://picsum.photos/seed/analytics-full/1600/1067',
      technologies: ['React', 'D3.js', 'Chart.js'],
      tasks: [
        'Componentes de gráficos custom y theming',
        'Gestión de estado eficiente para datos en vivo',
        'Exportación de reportes PDF'
      ],
      benefits: [
        'Toma de decisiones con datos en tiempo real',
        'Reducción de tiempo de análisis en 40%'
      ],
      demoLink: '#',
      githubLink: 'https://github.com/DecemberCode95',
      category: 'dashboard',
      featured: false
    },
    {   
      id: 4,
      title: 'API REST Segura',
      sponsor: 'Proyecto personal',
      role: 'Backend',
      description:
        'API RESTful con autenticación JWT, documentación Swagger y tests.',
      imageThumb: 'https://picsum.photos/seed/api-thumb/640/420',
      imageFull: 'https://picsum.photos/seed/api-full/1600/1067',
      technologies: ['Python', 'Django', 'JWT', 'Docker'],
      tasks: [
        'Autenticación y autorización por roles',
        'Pruebas de integración y contract testing',
        'Despliegue con Docker'
      ],
      benefits: [
        'Tiempo de onboarding de integraciones -30%',
        'Seguridad reforzada con mejores prácticas'
      ],
      demoLink: '#',
      githubLink: 'https://github.com/DecemberCode95',
      category: 'backend',
      featured: false
    }
  ];
}

function createProjectElement(project, index) {
  const article = document.createElement('article');
  article.className = `portfolio-item ${project.featured ? 'portfolio-item--featured' : ''}`;
  article.setAttribute('data-category', project.category);
  article.setAttribute('aria-labelledby', `project-title-${project.id}`);

  // Delay para animación escalonada
  article.style.animationDelay = `${index * 0.08}s`;

  const tasksHTML = project.tasks && project.tasks.length
    ? `<ul class="project__tasks">${project.tasks.map(t => `<li>✅ ${t}</li>`).join('')}</ul>`
    : '';
  const benefitsHTML = project.benefits && project.benefits.length
    ? `<ul class="project__benefits">${project.benefits.map(b => `<li>🚀 ${b}</li>`).join('')}</ul>`
    : '';

  article.innerHTML = `
    <div class="portfolio-item__image-container">
      <img src="${project.imageThumb}" 
           alt="${project.title}" 
           class="portfolio-item__img"
           width="640" height="420"
           loading="lazy" decoding="async"
           onerror="this.src='https://picsum.photos/seed/fallback-thumb/640/420'">
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
      <h3 class="portfolio-item__title" id="project-title-${project.id}">${project.title}</h3>
      <p class="portfolio-item__description">${project.description}</p>
      <div class="portfolio-item__meta">
        <span class="project__sponsor">👤 ${project.sponsor} • ${project.role}</span>
      </div>
      <div class="portfolio-item__technologies">
        ${project.technologies.map(tech => 
          `<span class="tech-tag" data-tech="${tech.toLowerCase()}">${tech}</span>`
        ).join('')}
      </div>
      <div class="project__details">
        ${tasksHTML}
        ${benefitsHTML}
      </div>
    </div>
  `;

  // Agregar microinteracciones
  addProjectInteractions(article);

  return article;
}

function addProjectInteractions(projectElement) {
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
  img.addEventListener('load', function () {
    this.style.opacity = '1';
    this.style.transform = 'scale(1)';
  });

  // Estado inicial de la imagen
  img.style.opacity = '0';
  img.style.transform = 'scale(1.02)';
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
