# Active Directory User Search Script
# Query AD users by company, department, or custom filter
# Usage: .\Search-ADUsersByCompany.ps1 -Company "MyCompany" -Export

param(
    [string]$Company,
    [string]$Department,
    [string]$SearchBase,
    [switch]$Export,
    [string]$ExportPath = "C:\temp\AD_Export_$(Get-Date -Format 'yyyy-MM-dd_HHmmss').csv"
)

function Search-ADUsers {
    param(
        [string]$Company,
        [string]$Department,
        [string]$SearchBase
    )
    
    $filter = "(objectClass=user) -and (objectCategory=person)"
    
    if ($Company) {
        $filter += " -and (Company -like '*$Company*')"
    }
    
    if ($Department) {
        $filter += " -and (Department -like '*$Department*')"
    }
    
    $searchParams = @{
        Filter       = $filter
        Properties   = @('samAccountName', 'DisplayName', 'Email', 'Company', 'Department', 'Title', 'Enabled', 'LastLogonDate')
        ResultSetSize = $null
    }
    
    if ($SearchBase) {
        $searchParams['SearchBase'] = $SearchBase
    }
    
    try {
        $users = Get-ADUser @searchParams | Sort-Object DisplayName
        return $users
    }
    catch {
        Write-Error "Failed to query Active Directory: $($_.Exception.Message)"
        return $null
    }
}

function Format-ADUserOutput {
    param(
        [PSObject[]]$Users
    )
    
    if (-not $Users) {
        Write-Host "No users found matching criteria" -ForegroundColor Yellow
        return
    }
    
    Write-Host "Found $($Users.Count) user(s):" -ForegroundColor Green
    Write-Host ""
    
    $Users | Select-Object @(
        'samAccountName',
        'DisplayName',
        'Email',
        'Company',
        'Department',
        'Title',
        @{Name='Enabled'; Expression={$_.Enabled}},
        @{Name='LastLogon'; Expression={$_.LastLogonDate -f 'yyyy-MM-dd HH:mm:ss'}}
    ) | Format-Table -AutoSize
}

# Main execution
Write-Host "Active Directory User Search" -ForegroundColor Cyan
Write-Host ""

$users = Search-ADUsers -Company $Company -Department $Department -SearchBase $SearchBase

if ($users) {
    Format-ADUserOutput -Users $users
    
    if ($Export) {
        try {
            $exportDir = Split-Path $ExportPath
            if (-not (Test-Path $exportDir)) {
                New-Item -ItemType Directory -Path $exportDir -Force | Out-Null
            }
            
            $users | Export-Csv -Path $ExportPath -NoTypeInformation -Encoding UTF8
            Write-Host "Exported to: $ExportPath" -ForegroundColor Green
        }
        catch {
            Write-Error "Failed to export: $($_.Exception.Message)"
        }
    }
}
