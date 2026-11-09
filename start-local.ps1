$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$portableNodePath = Join-Path $PSScriptRoot '.tools\node-v22.16.0-win-x64'
if (Test-Path -LiteralPath (Join-Path $portableNodePath 'node.exe')) {
    $env:PATH = "$portableNodePath;$env:PATH"
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Node.js 22.16+ is required. Install Node.js, then run this script again. See README.md.'
}
if (-not (Test-Path -LiteralPath (Join-Path $PSScriptRoot 'node_modules'))) {
    & npm.cmd ci
    if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
}
$env:NEXT_TELEMETRY_DISABLED = '1'
& npm.cmd run dev
