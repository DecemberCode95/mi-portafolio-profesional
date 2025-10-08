// js/modules/galleryManager.js - Versión optimizada y lista para producción
// - Limpia código duplicado/obsoleto
// - Usa imágenes de placeholder estables (Picsum seed) hasta que agregues tus imágenes reales
// - Inicializa lightGallery (CDN) con plugins y opciones responsables
// - Expone métodos para filtrar/actualizar la galería en el futuro

export class GalleryManager {
  constructor() {
    this.galleryInstance = null;
    this.projects = this.getProjectsData();
  }

  init() {
    this.renderGallery();
    this.initLightGallery();
    this.setupGalleryInteractions();
    console.log('🖼️ Gallery Manager con lightGallery inicializado');
  }

  // Sustituye por tus imágenes reales cuando estén listas: assets/images/{full,thumbs,proyects}
  // Para ahora, usamos placeholders deterministas por seed para evitar 404s
  getProjectsData() {
    return [
      {
        id: 1,
        title: 'E-commerce Moderno',
        description:
          'Plataforma de e-commerce con carrito, pagos y panel admin. Arquitectura modular y accesible.',
        fullImage: 'https://picsum.photos/seed/ecommerce-full/1600/1067',
        thumbImage: 'https://picsum.photos/seed/ecommerce-thumb/600/400',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        demoLink: '#',
        githubLink: '#',
        category: 'fullstack',
        size: '1600-1067',
        responsive: [
          { src: 'https://picsum.photos/seed/ecommerce-375/375/250', width: 375 },
          { src: 'https://picsum.photos/seed/ecommerce-768/768/512', width: 768 },
        ],
      },
      {
        id: 2,
        title: 'App de Gestión de Tareas',
        description:
          'PWA colaborativa con sincronización en la nube, notificaciones y offline-first.',
        fullImage: 'https://picsum.photos/seed/tasks-full/1600/1067',
        thumbImage: 'https://picsum.photos/seed/tasks-thumb/600/400',
        technologies: ['Vue.js', 'Firebase', 'PWA', 'CSS3'],
        demoLink: '#',
        githubLink: '#',
        category: 'frontend',
        size: '1600-1067',
        responsive: [
          { src: 'https://picsum.photos/seed/tasks-375/375/250', width: 375 },
          { src: 'https://picsum.photos/seed/tasks-768/768/512', width: 768 },
        ],
      },
      {
        id: 3,
        title: 'Dashboard Analytics',
        description:
          'Panel interactivo con métricas en tiempo real y gráficos dinámicos para decisiones.',
        fullImage: 'https://picsum.photos/seed/analytics-full/1600/1067',
        thumbImage: 'https://picsum.photos/seed/analytics-thumb/600/400',
        technologies: ['React', 'D3.js', 'Chart.js'],
        demoLink: '#',
        githubLink: '#',
        category: 'dashboard',
        size: '1600-1067',
        responsive: [
          { src: 'https://picsum.photos/seed/analytics-375/375/250', width: 375 },
          { src: 'https://picsum.photos/seed/analytics-768/768/512', width: 768 },
        ],
      },
      {
        id: 4,
        title: 'API REST Segura',
        description:
          'API con autenticación JWT, documentación Swagger y baterías de tests automatizados.',
        fullImage: 'https://picsum.photos/seed/api-full/1600/1067',
        thumbImage: 'https://picsum.photos/seed/api-thumb/600/400',
        technologies: ['Python', 'Django', 'JWT', 'Docker'],
        demoLink: '#',
        githubLink: '#',
        category: 'backend',
        size: '1600-1067',
        responsive: [
          { src: 'https://picsum.photos/seed/api-375/375/250', width: 375 },
          { src: 'https://picsum.photos/seed/api-768/768/512', width: 768 },
        ],
      },
      {
        id: 5,
        title: 'Landing Animada',
        description:
          'Landing con microinteracciones, optimizada en Core Web Vitals y SEO.',
        fullImage: 'https://picsum.photos/seed/landing-full/1600/1067',
        thumbImage: 'https://picsum.photos/seed/landing-thumb/600/400',
        technologies: ['TypeScript', 'GSAP', 'SEO'],
        demoLink: '#',
        githubLink: '#',
        category: 'frontend',
        size: '1600-1067',
        responsive: [
          { src: 'https://picsum.photos/seed/landing-375/375/250', width: 375 },
          { src: 'https://picsum.photos/seed/landing-768/768/512', width: 768 },
        ],
      },
      {
        id: 6,
        title: 'Microservicios',
        description:
          'Arquitectura de microservicios con mensajería, observabilidad y CI/CD.',
        fullImage: 'https://picsum.photos/seed/microservices-full/1600/1067',
        thumbImage: 'https://picsum.photos/seed/microservices-thumb/600/400',
        technologies: ['Node.js', 'Kafka', 'Kubernetes'],
        demoLink: '#',
        githubLink: '#',
        category: 'backend',
        size: '1600-1067',
        responsive: [
          { src: 'https://picsum.photos/seed/microservices-375/375/250', width: 375 },
          { src: 'https://picsum.photos/seed/microservices-768/768/512', width: 768 },
        ],
      },
    ];
  }

  renderGallery() {
    const gridContainer = document.getElementById('portfolio-gallery');
    if (!gridContainer) {
      console.error('❌ No se encontró el contenedor de la galería');
      return;
    }

    gridContainer.innerHTML = this.projects
      .map((project) => this.createGalleryItem(project))
      .join('');

    console.log(`✅ ${this.projects.length} proyectos renderizados en la galería`);
  }

  createGalleryItem(project) {
    const responsiveAttr = project.responsive
      ? `data-responsive="${project.responsive
          .map((r) => `${r.src} ${r.width}`)
          .join(', ')}"`
      : '';

    return `
      <div class="gallery-item" data-category="${project.category}">
        <a
          href="${project.fullImage}"
          ${responsiveAttr}
          data-lg-size="${project.size}"
          data-subhtml="<h4>${project.title}</h4><p>${project.description}</p>"
        >
          <img
            src="${project.thumbImage}"
            alt="${project.title}"
            class="portfolio-item__img"
            loading="lazy"
          />
          <div class="gallery-item__overlay">
            <span class="gallery-item__zoom">🔍</span>
          </div>
        </a>
        <div class="portfolio-item__content">
          <h3 class="portfolio-item__title">${project.title}</h3>
          <p class="portfolio-item__description">${project.description}</p>
          <div class="portfolio-item__technologies">
            ${project.technologies
              .map((tech) => `<span class=\"tech-tag\" data-tech=\"${tech.toLowerCase()}\">${tech}</span>`)
              .join('')}
          </div>
          <div class="portfolio-item__links">
            <a href="${project.demoLink}" class="btn btn--primary btn--small" target="_blank" rel="noopener">Demo</a>
            <a href="${project.githubLink}" class="btn btn--secondary btn--small" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
    `;
  }

  initLightGallery() {
    const galleryElement = document.getElementById('portfolio-gallery');
    if (!galleryElement) return;

    // Verificar que lightGallery esté disponible desde CDN
    if (typeof window.lightGallery === 'undefined') {
      console.error('❌ lightGallery no está cargado. Verifica los scripts CDN en index.html.');
      return;
    }

    this.galleryInstance = window.lightGallery(galleryElement, {
      plugins: [window.lgThumbnail, window.lgZoom],
      licenseKey: '0000-0000-000-0000', // Para desarrollo/local
      speed: 500,
      thumbnail: true,
      animateThumb: true,
      showThumbByDefault: false,
      download: false,
      selector: 'a',
      mobileSettings: {
        controls: true,
        showCloseIcon: true,
        download: false,
      },
    });

    console.log('🎨 lightGallery inicializado correctamente');
  }

  setupGalleryInteractions() {
    // Efectos hover personalizados
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-6px)';
        item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      });
    });

    // Click en tags de tecnología
    document.querySelectorAll('.gallery-item .tech-tag').forEach((tag) => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const tech = tag.getAttribute('data-tech');
        console.log(`🔍 Filtrar por tecnología: ${tech}`);
      });
    });
  }

  // Abrir la galería programáticamente en el índice indicado
  openGallery(index = 0) {
    if (this.galleryInstance && typeof this.galleryInstance.openGallery === 'function') {
      this.galleryInstance.openGallery(index);
    }
  }

  // Reemplazar proyectos y re-renderizar
  updateGallery(newProjects) {
    this.projects = newProjects;
    this.renderGallery();

    if (this.galleryInstance) {
      this.galleryInstance.destroy();
    }
    setTimeout(() => this.initLightGallery(), 100);
  }

  // Filtrar proyectos por categoría (simple)
  filterProjects(category) {
    const items = document.querySelectorAll('.gallery-item');

    items.forEach((item) => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
}
// js/libs/lightgallery-adapter.js
import { ensureLightGallery } from './vendors.js';
export function initLG(root, options = {}) {
  if (!ensureLightGallery()) return null;
  return window.lightGallery(root, {
    plugins: [window.lgThumbnail, window.lgZoom],
    speed: 500,
    download: false,
    ...options,
  });
}