@echo off
REM Convert all markdown files to UTF-8 with BOM
REM This ensures Chinese characters display correctly on GitHub

echo Converting files to UTF-8 with BOM...
echo.

powershell -Command "$files = @('README.md', 'info.md', 'INSTALL.md', 'QUICKSTART.md', 'TESTING_GUIDE.md', 'MIGRATION.md', 'PROJECT_SUMMARY.md', 'FILE_CHECKLIST.md', 'GITHUB_SETUP.md', 'UPLOAD_CHECKLIST.md', 'CHANGELOG.md'); foreach ($file in $files) { if (Test-Path $file) { $content = Get-Content -Path $file -Encoding UTF8; $utf8WithBom = New-Object System.Text.UTF8Encoding $true; [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content, $utf8WithBom); Write-Host '[OK]' $file } }"

echo.
echo All files converted to UTF-8 with BOM!
echo You can now upload to GitHub.
pause
