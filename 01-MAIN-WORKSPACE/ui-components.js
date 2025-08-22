/**
 * UI Components Module
 * Handles cursor, modal, and time display functionality
 * Author: Julian Gomez - AI-Human Collaboration
 */

import { SELECTORS, CSS_CLASSES, ANIMATION_CONFIG } from './animation-config.js';

export class CursorSystem {
    constructor() {
        this.cursorBox = document.querySelector(SELECTORS.cursorBox);
        this.isOverProject = false;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.attachProjectCardHandlers();
    }
    
    handleMouseMove(e) {
        if (this.isOverProject && this.cursorBox) {
            this.cursorBox.style.left = (e.clientX + 15) + 'px';
            this.cursorBox.style.top = (e.clientY - 10) + 'px';
        }
    }
    
    attachProjectCardHandlers() {
        const projectCards = document.querySelectorAll(SELECTORS.projectCards);
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.isOverProject = true;
                this.cursorBox?.classList.add(CSS_CLASSES.active);
            });
            
            card.addEventListener('mouseleave', () => {
                this.isOverProject = false;
                this.cursorBox?.classList.remove(CSS_CLASSES.active);
            });
        });
    }
}

export class ModalSystem {
    constructor() {
        this.modal = document.querySelector(SELECTORS.modal);
        this.modalBody = document.querySelector(SELECTORS.modalBody);
        
        this.init();
    }
    
    init() {
        // Keyboard and click handlers
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
        
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }
    
    showProject(id) {
        const projects = this.getProjectData();
        const project = projects[id];
        
        if (!project || !this.modalBody) return;
        
        this.modalBody.innerHTML = `
            <h2 style="color: var(--color-accent); margin-bottom: 0.5rem;">${project.title}</h2>
            <p style="color: var(--color-text-dim); margin-bottom: 1.5rem; font-style: italic;">${project.subtitle}</p>
            <div style="line-height: 1.6;">${project.content}</div>
        `;
        
        this.modal?.classList.add(CSS_CLASSES.active);
    }
    
    showGallery(id) {
        if (!this.modalBody) return;
        
        const galleries = {
            1: {
                title: 'mind.set.play Gallery',
                images: [
                    { src: '../04-ASSETS/assets/Cases/1-mind-set-play/start.jpg', description: 'Project overview and initial concept design' },
                    { src: '../04-ASSETS/assets/Cases/1-mind-set-play/01.jpg', description: 'User interface design and interaction patterns' },
                    { src: '../04-ASSETS/assets/Cases/1-mind-set-play/02.jpg', description: 'Game mechanics and puzzle system design' },
                    { src: '../04-ASSETS/assets/Cases/1-mind-set-play/03.jpg', description: 'Visual design system and component library' },
                    { src: '../04-ASSETS/assets/Cases/1-mind-set-play/04.jpg', description: 'Development process and technical implementation' },
                    { src: '../04-ASSETS/assets/Cases/1-mind-set-play/05.jpg', description: 'Final implementation and user testing results' }
                ]
            },
            2: {
                title: 'Gourmet Invader Gallery',
                images: [
                    '../04-ASSETS/assets/Cases/2-Gourmet-Invader/start.jpg',
                    '../04-ASSETS/assets/Cases/2-Gourmet-Invader/01.jpg',
                    '../04-ASSETS/assets/Cases/2-Gourmet-Invader/02.jpg',
                    '../04-ASSETS/assets/Cases/2-Gourmet-Invader/03.jpg',
                    '../04-ASSETS/assets/Cases/2-Gourmet-Invader/04.jpg',
                    '../04-ASSETS/assets/Cases/2-Gourmet-Invader/05.jpg',
                    '../04-ASSETS/assets/Cases/2-Gourmet-Invader/06.jpg'
                ]
            },
            3: {
                title: 'Chess Quest Gallery',
                images: [
                    '../04-ASSETS/assets/Cases/3-Chest-Quest/start.jpg',
                    '../04-ASSETS/assets/Cases/3-Chest-Quest/01.jpg',
                    '../04-ASSETS/assets/Cases/3-Chest-Quest/02.jpg',
                    '../04-ASSETS/assets/Cases/3-Chest-Quest/03.jpg',
                    '../04-ASSETS/assets/Cases/3-Chest-Quest/04.jpg',
                    '../04-ASSETS/assets/Cases/3-Chest-Quest/05.jpg'
                ]
            },
            4: {
                title: 'Journey Gallery',
                images: [
                    '../04-ASSETS/assets/Cases/4-Journey/start.jpg',
                    '../04-ASSETS/assets/Cases/4-Journey/01.jpg',
                    '../04-ASSETS/assets/Cases/4-Journey/02.jpg',
                    '../04-ASSETS/assets/Cases/4-Journey/03.jpg',
                    '../04-ASSETS/assets/Cases/4-Journey/04.jpg',
                    '../04-ASSETS/assets/Cases/4-Journey/05.jpg',
                    '../04-ASSETS/assets/Cases/4-Journey/06.jpg'
                ]
            },
            5: {
                title: 'Portfolio Website Gallery',
                images: [
                    '../04-ASSETS/assets/Cases/5-Portfolio-Website/start.jpg'
                ]
            },
            6: {
                title: 'Small Projects & JULIAN\'S PROFILE Gallery',
                images: [
                    '../04-ASSETS/assets/Cases/6-Others/start.jpg'
                ]
            }
        };
        
        const gallery = galleries[id];
        if (!gallery) return;
        
        // Sort images chronologically by array index (preserve original order)
        const sortedImages = gallery.images.map((img, originalIndex) => {
            // Handle both string and object formats for backward compatibility
            if (typeof img === 'string') {
                return { src: img, description: '', originalIndex };
            }
            return { src: img.src, description: img.description || '', originalIndex };
        }).sort((a, b) => a.originalIndex - b.originalIndex);
        
        this.modalBody.innerHTML = `
            <h2 style="color: var(--color-accent); margin-bottom: 2rem;">${gallery.title}</h2>
            <div class="gallery-container">
                <div class="carousel-wrapper">
                    <div class="carousel-viewport" id="carouselViewport">
                        <div class="carousel-three-view" id="carouselThreeView">
                            <!-- Dynamic three-image view will be populated by JavaScript -->
                        </div>
                    </div>
                    <button class="carousel-btn carousel-prev" id="prevBtn" ${gallery.images.length <= 1 ? 'style="display: none;"' : ''}>‹</button>
                    <button class="carousel-btn carousel-next" id="nextBtn" ${gallery.images.length <= 1 ? 'style="display: none;"' : ''}>›</button>
                </div>
                <div class="carousel-description" id="carouselDescription">
                    <p class="description-text" id="descriptionText"></p>
                </div>
                <div class="carousel-indicators" id="carouselIndicators" ${gallery.images.length <= 1 ? 'style="display: none;"' : ''}>
                    ${sortedImages.map((_, index) => `
                        <button class="indicator ${index === 0 ? 'active' : ''}"></button>
                    `).join('')}
                </div>
            </div>
            
            <style>
                .gallery-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    position: relative;
                }
                
                .carousel-wrapper {
                    position: relative;
                    border-radius: 12px;
                    background: rgba(0,0,0,0.2);
                    overflow: hidden;
                    width: 100%;
                    min-height: 450px;
                    height: 450px;
                }
                
                .carousel-viewport {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    position: relative;
                }
                
                .carousel-three-view {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    width: 100%;
                    height: 100%;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }
                
                .carousel-image-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    background-color: #000000;
                }
                
                .carousel-image-container.center {
                    flex: 0 0 50%;
                    height: 100%;
                    z-index: 3;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                }
                
                .carousel-image-container.side {
                    flex: 0 0 30%;
                    height: 75%;
                    opacity: 0.7;
                    z-index: 1;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .carousel-image-container.side:hover {
                    opacity: 0.9;
                    transform: scale(1.02);
                }
                
                .gallery-image {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 12px;
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                }
                
                .carousel-image-container.single {
                    flex: 0 0 70%;
                    height: 90%;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                }
                
                .carousel-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(76, 99, 210, 0.8);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .carousel-btn:hover {
                    background: rgba(76, 99, 210, 1);
                    transform: translateY(-50%) scale(1.1);
                }
                
                .carousel-prev { left: 10px; }
                .carousel-next { right: 10px; }
                
                .carousel-description {
                    min-height: 60px;
                    max-height: 120px;
                    padding: 1rem 0;
                    text-align: center;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }
                
                .carousel-description.hidden {
                    min-height: 0;
                    max-height: 0;
                    padding: 0;
                    opacity: 0;
                }
                
                .description-text {
                    color: var(--color-text-dim);
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin: 0;
                    opacity: 1;
                    transition: opacity 0.3s ease;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .carousel-indicators {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 1rem;
                }
                
                .indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255,255,255,0.4);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .indicator.active {
                    background: var(--color-accent);
                    transform: scale(1.2);
                }
                
                @media screen and (max-width: 768px) {
                    .carousel-wrapper {
                        min-height: 350px;
                        height: 350px;
                    }
                    
                    .carousel-viewport {
                        height: 100%;
                        padding: 0.5rem;
                    }
                    
                    .carousel-three-view {
                        gap: 0.5rem;
                    }
                    
                    .carousel-image-container.center {
                        flex: 0 0 60%;
                    }
                    
                    .carousel-image-container.side {
                        flex: 0 0 25%;
                        height: 70%;
                    }
                    
                    .carousel-image-container.single {
                        flex: 0 0 85%;
                        height: 85%;
                    }
                    
                    .carousel-btn {
                        width: 35px;
                        height: 35px;
                        font-size: 1.2rem;
                    }
                    
                    .carousel-description {
                        min-height: 50px;
                        max-height: 100px;
                        padding: 0.75rem 0;
                    }
                    
                    .description-text {
                        font-size: 0.9rem;
                    }
                }
                
                @media screen and (max-width: 480px) {
                    .carousel-wrapper {
                        min-height: 280px;
                        height: 280px;
                    }
                    
                    .carousel-viewport {
                        height: 100%;
                    }
                    
                    .carousel-image-container.center {
                        flex: 0 0 70%;
                    }
                    
                    .carousel-image-container.side {
                        flex: 0 0 20%;
                        height: 65%;
                    }
                    
                    .carousel-three-view {
                        gap: 0.25rem;
                    }
                    
                    .carousel-description {
                        min-height: 40px;
                        max-height: 80px;
                        padding: 0.5rem 0;
                    }
                    
                    .description-text {
                        font-size: 0.85rem;
                    }
                }
            </style>
        `;
        
        // Initialize carousel
        this.initializeCarousel(sortedImages);
        
        this.modal?.classList.add(CSS_CLASSES.active);
    }
    
    initializeCarousel(images) {
        // Store carousel state
        this.currentSlide = 0;
        this.totalSlides = images.length;
        this.galleryImages = images;
        
        // Render initial view
        this.renderThreeImageView();
        this.updateDescription();
        this.updateIndicators();
        
        // Setup navigation handlers
        this.setupCarouselNavigation();
        
        // Setup keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    setupCarouselNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.moveCarousel(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.moveCarousel(1));
        }
        
        // Setup indicator clicks
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
    }
    
    setupKeyboardNavigation() {
        // Add keyboard event listener for carousel navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal?.classList.contains(CSS_CLASSES.active)) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.moveCarousel(-1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.moveCarousel(1);
                } else if (e.key === 'Escape') {
                    this.closeModal();
                }
            }
        });
    }
    
    moveCarousel(direction) {
        if (!this.totalSlides) return;
        
        // Pause all videos before navigation
        this.pauseAllVideos();
        
        this.currentSlide = (this.currentSlide + direction + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(slideIndex) {
        // Pause all videos before direct navigation
        this.pauseAllVideos();
        
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.renderThreeImageView();
        this.updateIndicators();
        this.updateDescription();
    }
    
    isVideoFile(src) {
        const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.ogg'];
        return videoExtensions.some(ext => src.toLowerCase().includes(ext));
    }
    
    createMediaElement(src, description, isCenter = false, isPreview = false) {
        const isVideo = this.isVideoFile(src);
        
        if (isVideo) {
            return `
                <video 
                    ${isCenter ? 'controls' : 'muted'} 
                    ${isCenter && !isPreview ? 'autoplay' : ''} 
                    preload="metadata"
                    class="gallery-video ${isCenter ? 'center-video' : 'side-video'}"
                    style="width: 100%; height: 100%; object-fit: contain; border-radius: 12px; background-color: #000000;"
                    ${isPreview ? 'loop' : ''}
                    onloadedmetadata="this.currentTime = 1"
                >
                    <source src="${src}" type="video/mp4">
                    <source src="${src}" type="video/webm">
                    <p style="color: white; text-align: center; padding: 20px;">Your browser doesn't support video playback.</p>
                </video>
            `;
        } else {
            return `
                <img src="${src}" alt="${description || 'Gallery image'}" class="gallery-image" loading="lazy">
            `;
        }
    }
    
    pauseAllVideos() {
        const videos = document.querySelectorAll('.gallery-video');
        videos.forEach(video => {
            if (!video.paused) {
                video.pause();
            }
        });
    }
    
    optimizeVideoPerformance() {
        const videos = document.querySelectorAll('.gallery-video');
        videos.forEach((video, index) => {
            // Preload only metadata for side videos to save bandwidth
            if (video.closest('.carousel-image-container.side')) {
                video.preload = 'metadata';
                video.muted = true;
            } else if (video.closest('.carousel-image-container.center')) {
                video.preload = 'auto';
            }
            
            // Error handling for unsupported formats
            video.addEventListener('error', function() {
                const container = this.parentElement;
                container.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px; background-color: #000;">
                        <p>Video format not supported<br><small>Please try MP4, WebM, or MOV format</small></p>
                    </div>
                `;
            });
        });
    }
    
    renderThreeImageView() {
        const viewport = document.getElementById('carouselThreeView');
        if (!viewport || !this.galleryImages) return;
        
        // Pause all videos before switching
        this.pauseAllVideos();
        
        const totalImages = this.galleryImages.length;
        
        // Handle single media case
        if (totalImages === 1) {
            const mediaElement = this.createMediaElement(this.galleryImages[0].src, this.galleryImages[0].description, true);
            viewport.innerHTML = `
                <div class="carousel-image-container single">
                    ${mediaElement}
                </div>
            `;
            // Apply performance optimizations after rendering
            setTimeout(() => this.optimizeVideoPerformance(), 100);
            return;
        }
        
        // Calculate previous, current, and next indices
        const prevIndex = (this.currentSlide - 1 + totalImages) % totalImages;
        const currentIndex = this.currentSlide;
        const nextIndex = (this.currentSlide + 1) % totalImages;
        
        // Create three-media layout with mixed content support
        const prevMedia = this.createMediaElement(this.galleryImages[prevIndex].src, this.galleryImages[prevIndex].description, false, true);
        const currentMedia = this.createMediaElement(this.galleryImages[currentIndex].src, this.galleryImages[currentIndex].description, true);
        const nextMedia = this.createMediaElement(this.galleryImages[nextIndex].src, this.galleryImages[nextIndex].description, false, true);
        
        viewport.innerHTML = `
            <div class="carousel-image-container side" data-index="${prevIndex}">
                ${prevMedia}
            </div>
            <div class="carousel-image-container center" data-index="${currentIndex}">
                ${currentMedia}
            </div>
            <div class="carousel-image-container side" data-index="${nextIndex}">
                ${nextMedia}
            </div>
        `;
        
        // Add click handlers to side containers
        const sideContainers = viewport.querySelectorAll('.carousel-image-container.side');
        sideContainers[0].addEventListener('click', () => this.moveCarousel(-1));
        sideContainers[1].addEventListener('click', () => this.moveCarousel(1));
        
        // Apply performance optimizations after rendering
        setTimeout(() => this.optimizeVideoPerformance(), 100);
    }
    
    updateDescription() {
        const descriptionContainer = document.getElementById('carouselDescription');
        const descriptionText = document.getElementById('descriptionText');
        
        if (!descriptionContainer || !descriptionText || !this.galleryImages) return;
        
        const currentImage = this.galleryImages[this.currentSlide];
        const description = currentImage.description;
        
        if (description && description.trim()) {
            // Show description with smooth transition
            descriptionText.textContent = description;
            descriptionContainer.classList.remove('hidden');
        } else {
            // Hide description area
            descriptionContainer.classList.add('hidden');
            descriptionText.textContent = '';
        }
    }
    
    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    showContactForm() {
        if (!this.modalBody) return;
        
        this.modalBody.innerHTML = `
            <h2 style="color: var(--color-accent); margin-bottom: 2rem;">Get in Touch</h2>
            <form style="max-width: 400px;">
                <div style="margin-bottom: 1.5rem;">
                    <input type="text" placeholder="Name" style="width: 100%; padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(76,99,210,0.3); border-radius: 8px; color: var(--color-text);">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <input type="email" placeholder="Email" style="width: 100%; padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(76,99,210,0.3); border-radius: 8px; color: var(--color-text);">
                </div>
                <div style="margin-bottom: 2rem;">
                    <textarea placeholder="Message" rows="4" style="width: 100%; padding: 1rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(76,99,210,0.3); border-radius: 8px; color: var(--color-text); resize: vertical;"></textarea>
                </div>
                <button type="submit" style="background: linear-gradient(135deg, var(--color-accent), var(--color-energy)); color: white; padding: 1rem 2rem; border: none; border-radius: 8px; cursor: pointer;">Send Message</button>
            </form>
        `;
        
        this.modal?.classList.add(CSS_CLASSES.active);
    }
    
    closeModal() {
        this.modal?.classList.remove(CSS_CLASSES.active);
    }
    
    getProjectData() {
        return {
            1: { 
                title: 'mind.set.play', 
                subtitle: 'Corporate Culture Transformation Game', 
                content: `
                    <div style="margin-bottom: 2rem;">
                        <h3 style="color: var(--color-accent); margin-bottom: 0.8rem; font-size: 1.1rem;">The Challenge</h3>
                        <p style="margin-bottom: 1rem; line-height: 1.6;">How do you make clients experience the transformative power of VORSPRUNGatwork's approach to corporate culture? The challenge was creating a tangible demonstration of how personal work attitudes directly influence team processes and organizational effectiveness.</p>
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <h3 style="color: var(--color-accent); margin-bottom: 0.8rem; font-size: 1.1rem;">Solo Design Leadership</h3>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;"><strong>Duration:</strong> 6-month development with one student assistant</p>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;"><strong>Core Innovation:</strong> Role-switching mechanics combining hierarchy levels (responsibility ranges) with attitude presets (enthusiastic, skeptical, passive, solution-oriented)</p>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;"><strong>Learning Engine:</strong> Players directly experience how attitude changes impact individual work, collaboration, and overall team processes</p>
                        <p style="margin-bottom: 1rem; line-height: 1.6;"><strong>Partnership:</strong> Deployed through Schirmmacher Group collaboration</p>
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <h3 style="color: var(--color-accent); margin-bottom: 0.8rem; font-size: 1.1rem;">Impact & Results</h3>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;">• <strong>Measurable Change:</strong> Visible improvements in team dynamics and work efficiency post-gameplay</p>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;">• <strong>Knowledge Transfer:</strong> Successful translation of abstract concepts into experiential learning</p>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;">• <strong>Corporate Impact:</strong> Transferable framework applicable to real workplace situations</p>
                        <p style="margin-bottom: 1rem; line-height: 1.6;">• <strong>Client Success:</strong> Enhanced VORSPRUNGatwork's ability to demonstrate their methodology effectiveness</p>
                    </div>

                    <div style="background: rgba(76, 99, 210, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--color-accent);">
                        <h3 style="color: var(--color-accent); margin-bottom: 0.5rem; font-size: 1rem;">Skills Demonstrated</h3>
                        <p style="font-size: 0.9rem; line-height: 1.5; margin: 0;">Solo project leadership • Gamification design • Corporate stakeholder management • Behavioral psychology application • Small team coordination • Business process analysis</p>
                    </div>
                ` 
            },
            2: { 
                title: 'Gourmet Invader', 
                subtitle: 'Agile Team Leadership in Game Development', 
                content: `
                    <div style="margin-bottom: 2rem;">
                        <h3 style="color: var(--color-accent); margin-bottom: 0.8rem; font-size: 1.1rem;">The Challenge</h3>
                        <p style="margin-bottom: 1rem; line-height: 1.6;">Leading my first game development team while implementing agile methodologies in a traditional educational environment. The goal: create a complete JavaScript game in 4 weeks while proving that playful interventions can ease change processes.</p>
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <h3 style="color: var(--color-accent); margin-bottom: 0.8rem; font-size: 1.1rem;">Team Leadership Approach</h3>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;"><strong>Role:</strong> Team Lead, Animation, Documentation (4-person team: Dev-Lead, Art-Lead, Music & Level Design)</p>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;"><strong>Game Concept:</strong> "Gourmet's Intergalactic Taste Journey" - maze exploration with resource management and puzzle-solving mechanics</p>
                        <p style="margin-bottom: 1rem; line-height: 1.6;"><strong>Innovation:</strong> Implemented gamified check-ins/check-outs using game superpowers metaphors to improve team dynamics</p>
                    </div>

                    <div style="margin-bottom: 2rem;">
                        <h3 style="color: var(--color-accent); margin-bottom: 0.8rem; font-size: 1.1rem;">Results & Impact</h3>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;">• <strong>Successful Delivery:</strong> Complete playable JavaScript game with WASD controls, multiple scenes, and structured project documentation</p>
                        <p style="margin-bottom: 0.8rem; line-height: 1.6;">• <strong>Team Performance:</strong> Maintained work-life balance, met all deadlines, achieved positive peer feedback</p>
                        <p style="margin-bottom: 1rem; line-height: 1.6;">• <strong>Process Innovation:</strong> Demonstrated how gamification can improve team collaboration and reduce change resistance</p>
                    </div>

                    <div style="background: rgba(76, 99, 210, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--color-accent);">
                        <h3 style="color: var(--color-accent); margin-bottom: 0.5rem; font-size: 1rem;">Skills Demonstrated</h3>
                        <p style="font-size: 0.9rem; line-height: 1.5; margin: 0;">Agile team leadership • JavaScript game development • Animation implementation • Project documentation • Gamified process design • Cross-functional coordination</p>
                    </div>
                ` 
            },
            3: { 
                title: 'Chess Quest', 
                subtitle: '2D Game Development', 
                content: 'Solo 2D game development with AI-assisted innovation. Creative problem-solving methodology.' 
            },
            4: { 
                title: 'Journey', 
                subtitle: 'Narrative UX Mapping', 
                content: 'Persönliche Herausforderungen in operative Lösungen übersetzen. Narrative User Experience Mapping.' 
            },
            5: { 
                title: 'This Website', 
                subtitle: 'Portfolio Development', 
                content: 'Meta-Case: Customer & Developer Journey of this portfolio website. Transparent Human-AI Collaboration.' 
            }
        };
    }
}

export class TimeSystem {
    constructor() {
        this.liveTimeElement = document.querySelector(SELECTORS.liveTime);
        this.init();
    }
    
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), ANIMATION_CONFIG.timeUpdateInterval);
    }
    
    updateTime() {
        if (!this.liveTimeElement) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('de-DE', {
            timeZone: 'Europe/Berlin',
            hour12: false
        });
        
        this.liveTimeElement.textContent = timeString;
    }
}