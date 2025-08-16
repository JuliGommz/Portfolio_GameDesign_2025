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
            <p style="line-height: 1.6;">${project.content}</p>
        `;
        
        this.modal?.classList.add(CSS_CLASSES.active);
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