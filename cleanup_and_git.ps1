$ErrorActionPreference = "Stop"
Start-Transcript -Path "cleanup_log.txt" -Force
try {
    Write-Host "Starting operations..."
    
    if (Test-Path "node_modules_backup") {
        Write-Host "Removing node_modules_backup..."
        Remove-Item -Recurse -Force "node_modules_backup"
    }
    
    if (Test-Path "node_modules_backup_20260129-010847") {
        Write-Host "Removing node_modules_backup_20260129-010847..."
        Remove-Item -Recurse -Force "node_modules_backup_20260129-010847"
    }

    Write-Host "Creating branch v0.01..."
    # If branch exists, this might fail, so we wrap it
    try { git branch v0.01 } catch { Write-Warning "Branch v0.01 might already exist" }
    
    Write-Host "Adding files..."
    git add .
    
    Write-Host "Committing..."
    git commit -m "Release v0.02: Instalação limpa de dependências, fixação do package-lock.json. Reestruturação dos componentes e adição da página de cadastro"
    
    Write-Host "Pushing main..."
    git push origin main
    
    Write-Host "Pushing v0.01..."
    git push origin v0.01
    
    Write-Host "OPERATIONS COMPLETED SUCCESSFULLY"
} catch {
    Write-Error "An error occurred: $_"
} finally {
    Stop-Transcript
}
