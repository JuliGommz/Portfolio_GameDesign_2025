/**
 * Portfolio Application - Main Entry Point
 * Clean modular architecture for Julian Gomez Portfolio
 * Author: Julian Gomez - AI-Human Collaboration
 */

import { AnimationSystem } from './animation-system.js';
import { CursorSystem, ModalSystem, TimeSystem } from './ui-components.js';
import { ANIMATION_CONFIG, SELECTORS, CSS_CLASSES } from './animation-config.js';

class PortfolioApp {
    constructor() {
        this.animationSystem = null;
        this.cursorSystem = null;
        this.modalSystem = null;
        this.timeSystem = null;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        // Initialize all systems
        this.animationSystem = new AnimationSystem();
        this.cursorSystem = new CursorSystem();
        this.modalSystem = new ModalSystem();
        this.timeSystem = new TimeSystem();
        
        // Setup initial UI state
        this.setupInitialState();
        
        // Setup sequential animations
        this.setupSequentialAnimations();
        
        // Setup global event handlers
        this.setupGlobalHandlers();
    }
    
    setupInitialState() {
        const centerTitle = document.querySelector(SELECTORS.centerTitle);
        if (centerTitle) {
            centerTitle.style.opacity = '0';
            centerTitle.style.transform = 'translateY(20px)';
            centerTitle.style.transition = 'all 0.8s ease';
        }
    }
    
    setupSequentialAnimations() {
        // Center title animation
        setTimeout(() => {
            const centerTitle = document.querySelector(SELECTORS.centerTitle);
            if (centerTitle) {
                centerTitle.style.opacity = '1';
                centerTitle.style.transform = 'translateY(0)';
            }
        }, ANIMATION_CONFIG.centerTitleDelay);
        
        // Project cards sequential animation
        setTimeout(() => {
            const projectCards = document.querySelectorAll(SELECTORS.projectCards);
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add(CSS_CLASSES.animate);
                }, index * ANIMATION_CONFIG.cardAnimationDelay);
            });
        }, ANIMATION_CONFIG.sequentialAnimationStart);
    }
    
    setupGlobalHandlers() {
        // Setup data attribute handlers for clean HTML
        this.setupDataAttributeHandlers();
        
        // Setup email handler
        this.setupEmailHandler();
    }
    
    setupDataAttributeHandlers() {
        // Handle project card buttons with data attributes
        const caseButtons = document.querySelectorAll('[data-project-id]');
        caseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = button.getAttribute('data-project-id');
                const action = button.getAttribute('data-action');
                const url = button.getAttribute('data-url');
                
                switch(action) {
                    case 'info':
                        this.modalSystem.showProject(projectId);
                        break;
                    case 'gallery':
                        this.modalSystem.showGallery(projectId);
                        break;
                    case 'external':
                        if (url && url !== '#') {
                            window.open(url, '_blank');
                        }
                        break;
                    case 'github':
                        // GitHub functionality would be implemented here
                        console.log(`Show GitHub for project ${projectId}`);
                        break;
                    case 'contact':
                        this.modalSystem.showContactForm();
                        break;
                }
            });
        });
        
        // Handle social links
        const socialLinks = document.querySelectorAll('[data-social]');
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                const url = link.getAttribute('data-url');
                if (url && url !== '#') {
                    window.open(url, '_blank');
                }
            });
        });
        
        // Handle contact links
        const contactLinks = document.querySelectorAll('[data-action="contact"]');
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.modalSystem.showContactForm();
            });
        });
        
        // Handle modal close
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.modalSystem.closeModal();
            });
        }
    }
    
    setupEmailHandler() {
        const emailElements = document.querySelectorAll('[data-email]');
        emailElements.forEach(element => {
            element.addEventListener('click', () => {
                const email = element.getAttribute('data-email');
                if (email) {
                    window.location.href = `mailto:${email}`;
                }
            });
        });
    }
    
    // Public API for external access
    getAnimationSystem() {
        return this.animationSystem;
    }
    
    getModalSystem() {
        return this.modalSystem;
    }
}

// Initialize the application
const portfolioApp = new PortfolioApp();

// Export for external access if needed
export default portfolioApp;