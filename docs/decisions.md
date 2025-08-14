# Technical Decisions Log

## Animation System Architecture

### Decision: Atomic State Management
**Date**: 2025-01-14  
**Problem**: CSS conflicts causing animations to run in wrong states  
**Solution**: Explicit enable classes with atomic state clearing  
**Rationale**: Prevents cross-contamination, makes states predictable  
**Implementation**: 
```css
/* Clear all first */
body.classList.remove('enable-stars', 'enable-trails');
/* Then add only what's needed */
if (state === 'stars') body.classList.add('enable-stars');
```

### Decision: High-Specificity Selectors for Timing
**Date**: 2025-01-14  
**Problem**: Animation delays being overridden by base animation rules  
**Solution**: Use `body.enable-trails .enterprise-trail:nth-child(n)` specificity  
**Rationale**: Ensures staggered delays (0s,2s,4s,6s) are preserved  
**Critical**: Never modify - causes parallel animation bug  

### Decision: Spawn Position Outside Viewport
**Date**: 2025-01-14  
**Problem**: Trails appearing inside viewport instead of falling in  
**Solution**: Changed from `translateY(-120px)` to `translateY(-100vh)`  
**Rationale**: Ensures trails always spawn completely outside visible area  

### Decision: 50% Brightness Increase for Stars
**Date**: 2025-01-14  
**Problem**: Stars effect barely visible  
**Solution**: Increased opacity values by 50% (0.2→0.3, 0.8→1.0, etc.)  
**Result**: Stars effect clearly visible when toggled  

---

## Documentation System

### Decision: CLAUDE.md + Chronicler Agent
**Date**: 2025-01-14  
**Problem**: Session restarts lose project context  
**Solution**: Hybrid documentation with automated session summaries  
**Components**: 
- CLAUDE.md (project state, quick reference)
- docs/project-log.md (chronological history)
- docs/decisions.md (this file)
- Chronicler agent for automated updates

---

## Repository Structure

### Decision: Keep Advanced Version
**Date**: 2025-01-14  
**Options**: src/index.html (1,218 lines) vs Portfolio_2025_v4.html (562 lines)  
**Chosen**: Advanced version (src/index.html)  
**Rationale**: 
- More sophisticated animation system
- Better typography (Inter + Crimson Text)
- Professional business content
- Advanced CSS/JavaScript demonstrates skills