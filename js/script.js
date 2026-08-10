document.addEventListener('DOMContentLoaded', function() {
  setupScriptDemos();
});

function setupScriptDemos() {
  const demoLinks = document.querySelectorAll('.link-demo[data-script]');
  
  demoLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const scriptName = this.getAttribute('data-script');
      showScriptDemo(scriptName);
    });
  });
}

function showScriptDemo(scriptName) {
  const demos = {
    ping: {
      title: 'ping_continuous.ps1',
      description: 'Parallel ping testing with timestamped logging',
      snippet: `# Simplified demo of continuous ping script
$targets = @('8.8.8.8', 'cloudflare.com', '1.1.1.1')
$logPath = 'C:\\pingtest'

foreach ($target in $targets) {
  Start-Job -ScriptBlock {
    param($t, $p)
    while ($true) {
      $ping = Test-Connection -ComputerName $t -Count 1 -ErrorAction SilentlyContinue
      $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
      $result = if ($ping) { "SUCCESS" } else { "FAILED" }
      
      "$timestamp | $result | $($ping.ResponseTime)ms" | Out-File -Append -FilePath "$p\\$t.log"
      Start-Sleep -Seconds 10
    }
  } -ArgumentList $target, $logPath
}

Write-Host "Ping tests running in background jobs"
Get-Job | Format-Table -AutoSize`
    },
    config: {
      title: 'Configuration Management Script',
      description: 'Cross-profile configuration synchronization',
      snippet: `# Simplified demo of config sync across user profiles
$configPath = "servers.xml"
$profiles = @(
  "$env:ProgramData\\AppData",
  "$env:LOCALAPPDATA\\AppData"
)

function Sync-Config {
  param(
    [string]$sourceConfig,
    [string]$profilePath
  )
  
  [xml]$configXml = Get-Content $sourceConfig
  
  foreach ($server in $configXml.servers.server) {
    Write-Host "Syncing $($server.name) to profile"
    Copy-Item -Path $sourceConfig -Destination $profilePath -Force
  }
  
  Write-Host "Configuration synchronized to all profiles"
}

Sync-Config -sourceConfig $configPath -profilePath $profiles[0]`
    }
  };

  const demo = demos[scriptName];
  if (!demo) return;

  const modal = createDemoModal(demo);
  document.body.appendChild(modal);
  
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
}

function createDemoModal(demo) {
  const modal = document.createElement('div');
  modal.className = 'script-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3>${demo.title}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">
        <p class="demo-description">${demo.description}</p>
        <div class="code-block">
          <pre><code>${escapeHtml(demo.snippet)}</code></pre>
        </div>
        <p class="demo-note">
          <strong>→ View the full script in the 
          <a href="https://github.com/Nex-01/powershell-scripts" target="_blank">GitHub repository</a></strong>
        </p>
      </div>
    </div>
  `;

  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 200);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 200);
    }
  });

  return modal;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Add modal styles dynamically
const style = document.createElement('style');
style.textContent = `
  .script-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 14, 39, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.2s ease;
    backdrop-filter: blur(4px);
  }

  .script-modal.active {
    opacity: 1;
  }

  .modal-content {
    background-color: var(--bg-secondary, #141829);
    border: 1px solid var(--border-color, #2d3748);
    border-radius: 8px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    width: 90%;
    box-shadow: 0 20px 60px rgba(230, 57, 70, 0.2);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 2px solid var(--accent-crimson, #E63946);
  }

  .modal-header h3 {
    margin: 0;
    color: var(--accent-crimson, #E63946);
    font-size: 1.25rem;
  }

  .modal-close {
    background: none;
    border: none;
    color: var(--text-secondary, #a8b2bf);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }

  .modal-close:hover {
    color: var(--accent-crimson, #E63946);
  }

  .modal-body {
    padding: 2rem;
  }

  .demo-description {
    margin-bottom: 1.5rem;
    color: var(--text-secondary, #a8b2bf);
  }

  .code-block {
    background-color: var(--bg-dark, #0a0e27);
    border: 1px solid var(--border-color, #2d3748);
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    overflow-x: auto;
  }

  .code-block pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: var(--accent-crimson, #E63946);
    line-height: 1.5;
  }

  .demo-note {
    font-size: 0.9rem;
    color: var(--text-muted, #6b7280);
    padding-top: 1rem;
    border-top: 1px solid var(--border-color, #2d3748);
    margin: 0;
  }

  .demo-note a {
    color: var(--accent-blue, #5B7EFF);
  }

  .demo-note a:hover {
    color: var(--accent-crimson, #E63946);
  }
`;
document.head.appendChild(style);
