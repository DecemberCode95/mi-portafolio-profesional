// Ejemplo de datos de proyectos
const proyectos = [
  { titulo: "Proyecto 1", imagenUrl: "assets/images/projects/proyecto-1.jpg", descripcion: "...", enlace: "#" },
  { titulo: "Proyecto 2", imagenUrl: "assets/images/projects/proyecto-2.jpg", descripcion: "...", enlace: "#" },
  // ... más proyectos
];

// Función para crear el HTML de un proyecto
function crearElementoProyecto(proyecto) {
  return `
    <div class="gallery-item">
      <img src="${proyecto.imagenUrl}" alt="${proyecto.titulo}" loading="lazy">
      <h3>${proyecto.titulo}</h3>
      <p>${proyecto.descripcion}</p>
    </div>
  `;
}

// Función para renderizar todos los proyectos en el contenedor
function renderizarGaleria(proyectos, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  const galeriaHTML = proyectos.map(crearElementoProyecto).join('');
  contenedor.innerHTML = galeriaHTML;
}

// Uso: renderizarGaleria(proyectos, 'portfolioGrid');
// js/modules/galleryManager.js - CON LIGHTGALLERY INTEGRADO
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

    getProjectsData() {
        return [
            {
                id: 1,
                title: "E-commerce Moderno",
                description: "Plataforma completa de comercio electrónico con carrito de compras, pasarela de pagos y panel de administración.",
                fullImage: "assets/images/projects/full/proyecto1-full.jpg",
                thumbImage: "assets/images/projects/thumbs/proyecto1-thumb.jpg",
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                demoLink: "#",
                githubLink: "#",
                category: "fullstack",
                size: "1600-1067", // Ancho-Alto para zoom
                responsive: [
                    { src: "assets/images/projects/responsive/proyecto1-375.jpg", width: 375 },
                    { src: "assets/images/projects/responsive/proyecto1-768.jpg", width: 768 },
                    { src: "assets/images/projects/responsive/proyecto1-1200.jpg", width: 1200 }
                ]
            },
            {
                id: 2,
                title: "App de Gestión de Tareas",
                description: "Aplicación web progresiva para gestión de tareas con funcionalidades colaborativas y sincronización en la nube.",
                fullImage: "assets/images/projects/full/proyecto2-full.jpg",
                thumbImage: "assets/images/projects/thumbs/proyecto2-thumb.jpg", 
                technologies: ["Vue.js", "Firebase", "PWA", "CSS3"],
                demoLink: "#",
                githubLink: "#",
                category: "frontend",
                size: "1600-1067",
                responsive: [
                    { src: "assets/images/projects/responsive/proyecto2-375.jpg", width: 375 },
                    { src: "assets/images/projects/responsive/proyecto2-768.jpg", width: 768 }
                ]
            }
            // Agrega más proyectos aquí...
        ];
    }

    renderGallery() {
        const gridContainer = document.getElementById('portfolio-gallery');
        if (!gridContainer) {
            console.error('❌ No se encontró el contenedor de la galería');
            return;
        }

        gridContainer.innerHTML = this.projects.map(project => 
            this.createGalleryItem(project)
        ).join('');

        console.log(`✅ ${this.projects.length} proyectos renderizados en la galería`);
    }

    createGalleryItem(project) {
        const responsiveAttr = project.responsive 
            ? `data-responsive="${project.responsive.map(r => `${r.src} ${r.width}`).join(', ')}"`
            : '';

        return `
            <div class="gallery-item" data-category="${project.category}">
                <a href="${project.fullImage}" 
                   ${responsiveAttr}
                   data-lg-size="${project.size}"
                   data-subhtml="<h4>${project.title}</h4><p>${project.description}</p>">
                    <img src="${project.thumbImage}" 
                         alt="${project.title}" 
                         class="portfolio-item__img"
                         loading="lazy" />
                    <div class="gallery-item__overlay">
                        <span class="gallery-item__zoom">🔍</span>
                    </div>
                </a>
                <div class="portfolio-item__content">
                    <h3 class="portfolio-item__title">${project.title}</h3>
                    <p class="portfolio-item__description">${project.description}</p>
                    <div class="portfolio-item__technologies">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag" data-tech="${tech.toLowerCase()}">${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="portfolio-item__links">
                        <a href="${project.demoLink}" class="btn btn--primary btn--small" target="_blank">Demo</a>
                        <a href="${project.githubLink}" class="btn btn--secondary btn--small" target="_blank">GitHub</a>
                    </div>
                </div>
            </div>
        `;
    }

    initLightGallery() {
        const galleryElement = document.getElementById('portfolio-gallery');
        if (!galleryElement) return;

        // Verificar que lightGallery esté disponible
        if (typeof lightGallery === 'undefined') {
            console.error('❌ lightGallery no está cargado. Verifica los scripts.');
            return;
        }

        this.galleryInstance = lightGallery(galleryElement, {
            plugins: [lgThumbnail, lgZoom],
            licenseKey: '0000-0000-000-0000', // Para desarrollo
            speed: 500,
            thumbnail: true,
            animateThumb: true,
            showThumbByDefault: false,
            download: false,
            autoplayVideoOnSlide: false,
            autoplayFirstVideo: false,
            mobileSettings: {
                controls: true,
                showCloseIcon: true,
                download: false
            }
        });

        console.log('🎨 lightGallery inicializado correctamente');
    }

    setupGalleryInteractions() {
        // Efectos hover personalizados
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px)';
                item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
                item.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Método para abrir la galería programáticamente
    openGallery(index = 0) {
        if (this.galleryInstance) {
            this.galleryInstance.openGallery(index);
        }
    }

    // Método para actualizar galería dinámicamente
    updateGallery(newProjects) {
        this.projects = newProjects;
        this.renderGallery();
        
        // Re-inicializar lightGallery con los nuevos elementos
        if (this.galleryInstance) {
            this.galleryInstance.destroy();
        }
        setTimeout(() => this.initLightGallery(), 100);
    }

    // Filtrar proyectos por categoría
    filterProjects(category) {
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

