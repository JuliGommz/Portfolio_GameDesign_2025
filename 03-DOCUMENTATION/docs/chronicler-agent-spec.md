# Project Chronicler Agent Specification

## Purpose
Automated session documentation to maintain project continuity across Claude Code sessions.

## Trigger
Execute before session end when user requests documentation or session closure.

## Core Functions

### 1. Session Summary Generation
- Extract completed tasks from conversation
- Identify technical challenges encountered
- Capture key decisions made
- Analyze code changes and commits
- Identify pending tasks for next session

### 2. CLAUDE.md Update
- Update "Last Session" timestamp
- Refresh "Current Status" 
- Add critical information to "Quick Reference"
- Update "Next Priority" section

### 3. Project Log Entry
- Append chronological entry to docs/project-log.md
- Include technical achievements and challenges
- Document lessons learned

### 4. Decision Capture
- Extract technical decisions from session
- Append to docs/decisions.md with rationale
- Flag critical decisions (marked "NEVER MODIFY")

## Implementation Approaches

### Option A: Task Tool Integration
Execute chronicler agent via Task tool before session end with specialized prompt for documentation tasks.

### Option B: Manual Workflow
User executes: "document session and update project state" before closing.

### Option C: Automated Script
Create batch script that calls Claude with chronicler instructions.

## Data Sources
- Git commit history
- Session conversation content  
- File modification timestamps
- Current project state in CLAUDE.md

## Output Format
- Structured markdown updates
- Consistent terminology
- Critical information flagged
- Next session preparation

## Success Criteria
- Zero context loss between sessions
- Quick project state recovery
- Historical decision tracking
- Reduced debugging time