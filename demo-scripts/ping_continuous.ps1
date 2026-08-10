# Continuous Ping Test Script
# Monitors multiple targets in parallel with timestamped logging
# Usage: .\ping_continuous.ps1 -Targets 8.8.8.8, cloudflare.com -LogPath C:\pingtest

param(
    [string[]]$Targets = @('8.8.8.8', '1.1.1.1', 'cloudflare.com'),
    [string]$LogPath = 'C:\pingtest',
    [int]$Interval = 10
)

# Create log directory if it doesn't exist
if (-not (Test-Path $LogPath)) {
    New-Item -ItemType Directory -Path $LogPath -Force | Out-Null
}

Write-Host "Starting continuous ping tests..."
Write-Host "Targets: $($Targets -join ', ')"
Write-Host "Log directory: $LogPath"
Write-Host ""

# Create a job for each target
$jobs = @()
foreach ($target in $Targets) {
    $logFile = Join-Path $LogPath "$target.log"
    
    $job = Start-Job -ScriptBlock {
        param($computerName, $filePath, $sleepInterval)
        
        while ($true) {
            try {
                $ping = Test-Connection -ComputerName $computerName -Count 1 -ErrorAction SilentlyContinue
                $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss.fff'
                
                if ($ping) {
                    $result = "SUCCESS`tResponseTime: $($ping.ResponseTime)ms"
                } else {
                    $result = "FAILED`tNo response"
                }
                
                $logEntry = "$timestamp`t$computerName`t$result"
                $logEntry | Out-File -Append -FilePath $filePath -Encoding UTF8
            }
            catch {
                $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss.fff'
                $errorEntry = "$timestamp`t$computerName`tERROR: $($_.Exception.Message)"
                $errorEntry | Out-File -Append -FilePath $filePath -Encoding UTF8
            }
            
            Start-Sleep -Seconds $sleepInterval
        }
    } -ArgumentList $target, $logFile, $Interval
    
    $jobs += $job
}

Write-Host "Spawned $($jobs.Count) background jobs"
Write-Host "Press Ctrl+C to stop all tests"
Write-Host ""

# Wait for user to stop
try {
    Get-Job | Wait-Job
}
catch [System.Management.Automation.PipelineStoppedException] {
    Write-Host "`nStopping all ping tests..."
    Get-Job | Stop-Job
    Get-Job | Remove-Job
    Write-Host "All jobs terminated. Logs saved to $LogPath"
}
