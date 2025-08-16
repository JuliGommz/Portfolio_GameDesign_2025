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
        // Make showProject and closeModal globally accessible for inline onclick handlers
        window.showProject = (id) => this.modalSystem.showProject(id);
        window.closeModal = () => this.modalSystem.closeModal();
        window.showContactForm = () => this.modalSystem.showContactForm();
        
        // Setup email handler
        this.setupEmailHandler();
    }
    
    setupEmailHandler() {
        const emailElements = document.querySelectorAll('[onmouseover*="Write Email"]');
        emailElements.forEach(element => {
            element.addEventListener('click', () => {
                window.location.href = 'mailto:juliangomez@gmx.de';
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