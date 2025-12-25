@echo off
REM iOS26 Light Card - Windows 快速安装脚本
REM 适用于Home Assistant 2025.12

echo ======================================
echo  iOS26 Light Card 快速安装
echo  版本: 1.0.0
echo  Home Assistant: 2025.12
echo ======================================
echo.

REM 检查HA配置目录
set HA_CONFIG=%USERPROFILE%\.homeassistant

if not exist "%HA_CONFIG%" (
    echo [错误] 未找到Home Assistant配置目录
    echo 预期位置: %HA_CONFIG%
    echo.
    echo 请手动指定配置目录位置，或检查HA是否已安装。
    pause
    exit /b 1
)

echo [✓] 找到HA配置目录: %HA_CONFIG%
echo.

REM 创建目标目录
set TARGET_DIR=%HA_CONFIG%\www\ios26-light-card

if not exist "%TARGET_DIR%" (
    echo [→] 创建目录: %TARGET_DIR%
    mkdir "%TARGET_DIR%"
) else (
    echo [✓] 目录已存在: %TARGET_DIR%
)

echo.
echo [→] 复制文件...

REM 复制核心JS文件
if exist "ios26-light-card.js" (
    copy /Y "ios26-light-card.js" "%TARGET_DIR%\ios26-light-card.js" >nul
    echo [✓] ios26-light-card.js
) else (
    echo [错误] 未找到 ios26-light-card.js
    echo 请确保在正确的目录运行此脚本。
    pause
    exit /b 1
)

echo.
echo ======================================
echo  安装完成！
echo ======================================
echo.
echo 下一步操作：
echo.
echo 1. 在Home Assistant中添加Lovelace资源：
echo    设置 → 仪表盘 → Lovelace仪表盘 → ⋮ → 编辑原始配置
echo.
echo 2. 添加以下内容：
echo.
echo    lovelace:
echo      mode: yaml
echo      resources:
echo        - url: /local/ios26-light-card/ios26-light-card.js
echo          type: module
echo.
echo 3. 重启Home Assistant或刷新浏览器
echo.
echo 4. 在仪表盘中添加卡片：
echo    type: custom:ios26-light-card
echo    entity: light.your_light_name
echo.
echo ======================================
echo.
pause
