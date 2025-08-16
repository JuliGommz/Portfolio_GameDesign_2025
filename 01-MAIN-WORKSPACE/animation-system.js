/**
 * Animation System Module
 * Handles the 3-state animation toggle system with atomic state management
 * Author: Julian Gomez - AI-Human Collaboration
 */

import { 
    ANIMATION_STATES, 
    ANIMATION_CONFIG, 
    SELECTORS, 
    CSS_CLASSES, 
    SLIDER_ICONS 
} from './animation-config.js';

export class AnimationSystem {
    constructor() {
        this.currentState = ANIMATION_STATES.NEUTRAL;
        this.body = document.querySelector(SELECTORS.body);
        this.toggle = document.querySelector(SELECTORS.animationToggle);
        this.sliderIcon = document.querySelector(SELECTORS.sliderIcon);
        
        this.init();
    }
    
    init() {
        // Initialize Superman Trails
        this.randomizeTrailPositions();
        setInterval(() => this.randomizeTrailPositions(), ANIMATION_CONFIG.trailRandomizationInterval);
        
        // Initialize Animation Toggle
        this.toggle?.addEventListener('click', (e) => this.handleToggleClick(e));
        
        // Start with neutral state - polka dots always visible
        this.setAnimationState(ANIMATION_STATES.NEUTRAL);
    }
    
    /**
     * Core 3-State Toggle System
     * CRITICAL: Never modify this logic - causes animation conflicts
     * LEFT (✨): enable-stars class → stars animation
     * MIDDLE (○): no classes → base grid only  
     * RIGHT (⚡): enable-trails class → superman trails
     */
    setAnimationState(newState) {
        if (!this.body || !this.toggle || !this.sliderIcon) return;
        
        // Double loop prevention: Force animation completion before state change
        if (ANIMATION_CONFIG.forceReflow) {
            const animatedElements = document.querySelectorAll('.bg-dots::before, .enterprise-trail');
            animatedElements.forEach(el => {
                if (el.style.animation) el.style.animationPlayState = 'paused';
            });
        }
        
        // Atomic state: Clear all, then add only what's needed
        this.body.classList.remove(CSS_CLASSES.enableStars, CSS_CLASSES.enableTrails);
        this.toggle.classList.remove(CSS_CLASSES.stars, CSS_CLASSES.neutral, CSS_CLASSES.trails);
        
        // Force reflow: Ensure DOM updates before new animations
        if (ANIMATION_CONFIG.atomicStateTransition) {
            this.body.offsetHeight;
        }
        
        this.currentState = newState;
        
        switch (newState) {
            case ANIMATION_STATES.STARS:
                // LEFT: Stars twinkling (50% brighter)
                this.body.classList.add(CSS_CLASSES.enableStars);
                this.toggle.classList.add(CSS_CLASSES.stars);
                this.sliderIcon.textContent = SLIDER_ICONS[ANIMATION_STATES.STARS];
                break;
                
            case ANIMATION_STATES.TRAILS:
                // RIGHT: Superman trails (staggered delays, spawn -100vh)
                this.body.classList.add(CSS_CLASSES.enableTrails);
                this.toggle.classList.add(CSS_CLASSES.trails);
                this.sliderIcon.textContent = SLIDER_ICONS[ANIMATION_STATES.TRAILS];
                break;
                
            case ANIMATION_STATES.NEUTRAL:
            default:
                // MIDDLE: Base grid only (no effects)
                this.toggle.classList.add(CSS_CLASSES.neutral);
                this.sliderIcon.textContent = SLIDER_ICONS[ANIMATION_STATES.NEUTRAL];
                break;
        }
    }
    
    handleToggleClick(e) {
        const rect = this.toggle.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        
        if (x < width * ANIMATION_CONFIG.toggleZones.leftThird) {
            // Left third - Stars
            this.setAnimationState(ANIMATION_STATES.STARS);
        } else if (x > width * ANIMATION_CONFIG.toggleZones.rightThird) {
            // Right third - Trails
            this.setAnimationState(ANIMATION_STATES.TRAILS);
        } else {
            // Middle third - Neutral
            this.setAnimationState(ANIMATION_STATES.NEUTRAL);
        }
    }
    
    /**
     * Superman Trail Randomization
     * Randomly repositions trails every 10 seconds
     */
    randomizeTrailPositions() {
        const trails = document.querySelectorAll(SELECTORS.enterpriseTrails);
        const positions = [...ANIMATION_CONFIG.trailPositions];
        
        trails.forEach((trail) => {
            const randomIndex = Math.floor(Math.random() * positions.length);
            trail.style.left = positions[randomIndex] + '%';
            positions.splice(randomIndex, 1);
        });
    }
    
    getCurrentState() {
        return this.currentState;
    }
}