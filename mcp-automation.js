#!/usr/bin/env node
/**
 * MCP Automation & Health Check System
 * ADHD-Optimized: Single-command execution and monitoring
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class MCPAutomation {
    constructor() {
        this.servers = {
            'github': '@modelcontextprotocol/server-github',
            'puppeteer': '@modelcontextprotocol/server-puppeteer', 
            'memory-bank': '@movibe/memory-bank-mcp',
            'context7': '@upstash/context7-mcp',
            'playwright': '@playwright/mcp',
            'magic': '@21st-dev/magic'
        };
        this.results = {};
    }

    async checkServerHealth(serverName, packageName) {
        console.log(`🔍 Checking ${serverName}...`);
        
        try {
            // Simple package availability check
            const result = execSync(`npm list -g ${packageName} --depth=0`, { 
                encoding: 'utf8', 
                timeout: 10000,
                stdio: 'pipe'
            });
            
            this.results[serverName] = {
                status: 'healthy',
                package: packageName,
                installed: true
            };
            
            console.log(`✅ ${serverName}: HEALTHY`);
            return true;
            
        } catch (error) {
            // Package not installed, try to check if it can be resolved
            try {
                execSync(`npx ${packageName} --help`, { 
                    encoding: 'utf8', 
                    timeout: 15000,
                    stdio: 'pipe'
                });
                
                this.results[serverName] = {
                    status: 'available',
                    package: packageName,
                    installed: false
                };
                
                console.log(`⚠️  ${serverName}: AVAILABLE (not installed)`);
                return true;
                
            } catch (npxError) {
                this.results[serverName] = {
                    status: 'unavailable',
                    package: packageName,
                    error: npxError.message.split('\n')[0]
                };
                
                console.log(`❌ ${serverName}: UNAVAILABLE`);
                return false;
            }
        }
    }

    async runHealthCheck() {
        console.log('🎯 MCP AUTOMATION SYSTEM');
        console.log('ADHD-Optimized Health Check Starting...\n');
        
        const startTime = Date.now();
        let healthyCount = 0;
        
        for (const [serverName, packageName] of Object.entries(this.servers)) {
            const isHealthy = await this.checkServerHealth(serverName, packageName);
            if (isHealthy) healthyCount++;
        }
        
        const duration = Math.round((Date.now() - startTime) / 1000);
        console.log(`\n⏱️  Health check completed in ${duration}s`);
        console.log(`📊 Status: ${healthyCount}/${Object.keys(this.servers).length} servers operational\n`);
        
        this.displayResults();
        return healthyCount >= 4; // Require at least 4/6 servers
    }

    displayResults() {
        console.log('📋 DETAILED STATUS REPORT:');
        console.log('=' .repeat(50));
        
        for (const [serverName, result] of Object.entries(this.results)) {
            const status = result.status.toUpperCase().padEnd(12);
            const icon = result.status === 'healthy' ? '✅' : 
                        result.status === 'available' ? '⚠️ ' : '❌';
            
            console.log(`${icon} ${serverName.padEnd(15)} ${status} ${result.package}`);
        }
        
        console.log('=' .repeat(50));
    }

    async autoInstallMissing() {
        console.log('\n🔧 AUTO-INSTALLATION MODE');
        
        const missing = Object.entries(this.results)
            .filter(([_, result]) => result.status === 'unavailable')
            .map(([serverName, _]) => serverName);
            
        if (missing.length === 0) {
            console.log('✅ No missing packages detected');
            return;
        }
        
        console.log(`📦 Installing ${missing.length} missing packages...`);
        
        for (const serverName of missing) {
            const packageName = this.servers[serverName];
            console.log(`📥 Installing ${packageName}...`);
            
            try {
                execSync(`npm install -g ${packageName}`, { 
                    encoding: 'utf8',
                    stdio: 'inherit'
                });
                console.log(`✅ ${serverName} installed successfully`);
            } catch (error) {
                console.log(`❌ Failed to install ${serverName}: ${error.message.split('\n')[0]}`);
            }
        }
    }

    generateAutomationScript() {
        const scriptContent = `#!/bin/bash
# MCP Automation Script - Generated ${new Date().toISOString()}
# ADHD-Optimized: Single command execution

echo "🎯 MCP Quick Health Check"
node "${__filename}" health

if [ $? -eq 0 ]; then
    echo "✅ MCP ecosystem ready for productive work"
else
    echo "⚠️  MCP ecosystem needs attention"
    echo "Run: node ${__filename} install"
fi
`;

        fs.writeFileSync(path.join(__dirname, 'mcp-quick-check.sh'), scriptContent);
        console.log('📝 Generated: mcp-quick-check.sh');
    }
}

// Command-line interface
async function main() {
    const mcp = new MCPAutomation();
    const command = process.argv[2] || 'health';
    
    switch (command) {
        case 'health':
        case 'check':
            const isHealthy = await mcp.runHealthCheck();
            process.exit(isHealthy ? 0 : 1);
            break;
            
        case 'install':
        case 'fix':
            await mcp.runHealthCheck();
            await mcp.autoInstallMissing();
            break;
            
        case 'generate':
        case 'script':
            mcp.generateAutomationScript();
            break;
            
        default:
            console.log('🎯 MCP Automation Commands:');
            console.log('  health  - Run health check');
            console.log('  install - Install missing packages');
            console.log('  script  - Generate automation script');
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = MCPAutomation;