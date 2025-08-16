/**
 * Animation Configuration Module
 * Centralized state management for the 3-state animation system
 * Author: Julian Gomez - AI-Human Collaboration
 */

export const ANIMATION_STATES = {
    NEUTRAL: 'neutral',
    STARS: 'stars', 
    TRAILS: 'trails'
};

export const ANIMATION_CONFIG = {
    // State transition settings
    forceReflow: true,
    atomicStateTransition: true,
    
    // Trail randomization
    trailPositions: [15, 35, 65, 85],
    trailRandomizationInterval: 10000, // 10 seconds
    
    // Animation timing
    cardAnimationDelay: 150,
    centerTitleDelay: 300,
    sequentialAnimationStart: 600,
    
    // Time update
    timeUpdateInterval: 1000,
    
    // Toggle configuration
    toggleZones: {
        leftThird: 1/3,
        rightThird: 2/3
    }
};

export const SELECTORS = {
    // Animation elements
    body: 'body',
    animationToggle: '#animationToggle',
    sliderIcon: '#sliderIcon',
    enterpriseTrails: '.enterprise-trail',
    
    // Project elements
    projectCards: '.project-card',
    centerTitle: '.center-title',
    
    // Cursor elements
    cursorBox: '#cursorBox',
    
    // Modal elements
    modal: '#modal',
    modalBody: '#modalBody',
    
    // Time elements
    liveTime: '#liveTime'
};

export const CSS_CLASSES = {
    // Animation states
    enableStars: 'enable-stars',
    enableTrails: 'enable-trails',
    
    // Toggle states
    stars: 'stars',
    neutral: 'neutral',
    trails: 'trails',
    
    // UI states
    animate: 'animate',
    active: 'active'
};

export const SLIDER_ICONS = {
    [ANIMATION_STATES.STARS]: '✨',
    [ANIMATION_STATES.NEUTRAL]: '○',
    [ANIMATION_STATES.TRAILS]: '⚡'
};

export const TOGGLE_SLIDER_POSITIONS = {
    [ANIMATION_STATES.STARS]: '2px',
    [ANIMATION_STATES.NEUTRAL]: '28px', 
    [ANIMATION_STATES.TRAILS]: '54px'
};