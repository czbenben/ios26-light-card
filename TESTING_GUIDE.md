# 🧪 iOS26 Light Card - 测试指南

## 📋 准备工作

### 1. 确认Home Assistant版本
你的版本：**2025.12** ✅ 完全支持（要求 >= 2021.12.0）

### 2. 确认有可控制的灯光
在Home Assistant中检查是否有灯光实体：
- 前往 **开发者工具** → **状态**
- 搜索 `light.`
- 确认至少有一个灯光实体（例如：`light.living_room`）

---

## 🚀 测试步骤

### 方法一：手动安装测试（推荐用于快速测试）

#### 步骤1：创建目录
```bash
# 在Home Assistant配置目录中创建文件夹
# 路径通常是：
# Windows: C:\Users\你的用户名\.homeassistant\
# Linux/Home Assistant OS: /config/

# 创建目录
config/www/ios26-light-card/
```

**通过Home Assistant文件管理器（推荐）：**
1. 打开Home Assistant
2. 左侧菜单 → **设置** → **系统**
3. 找到 **存储** 或 **文件编辑器**
4. 创建文件夹 `/www/ios26-light-card/`

#### 步骤2：复制核心文件
将 [ios26-light-card.js](ios26-light-card.js) 复制到刚创建的目录中：

```
config/www/ios26-light-card/ios26-light-card.js
```

#### 步骤3：配置Lovelace资源

**选项A：通过UI配置**
1. 打开Home Assistant
2. 左侧菜单 → **设置** → **仪表盘** → **Lovelace仪表盘**
3. 点击右上角 **⋮** → **编辑仪表盘**
4. 点击右上角 **⋮** → **编辑原始配置**
5. 在 `lovelace:` 部分添加：

```yaml
lovelace:
  mode: yaml
  resources:
    - url: /local/ios26-light-card/ios26-light-card.js
      type: module
```

如果已经有 `resources:`，只需添加 `- url: ...` 部分。

**选项B：通过configuration.yaml**
编辑 `configuration.yaml`，添加：

```yaml
lovelace:
  mode: yaml
  resources:
    - url: /local/ios26-light-card/ios26-light-card.js
      type: module
```

#### 步骤4：重启Home Assistant
```bash
# 通过UI：
设置 → 系统 → 右上角"重启服务器"

# 或通过命令行（如果是Docker/Supervised）
hassio homeassistant restart
```

#### 步骤5：添加卡片到仪表盘
1. 打开 **概览** 页面
2. 点击右上角 **⋮** → **编辑仪表盘**
3. 点击 **+ 添加卡片**
4. 右下角选择 **手动编辑**
5. 粘贴配置：

```yaml
type: custom:ios26-light-card
entity: light.your_light_name  # 替换为你的灯光实体ID
name: 测试灯光
icon: mdi:lightbulb
room: 测试房间
```

#### 步骤6：测试功能
- ✅ 点击卡片 → 灯光应该开关
- ✅ 再次点击 → 展开控制面板
- ✅ 拖动滑块 → 亮度应该变化
- ✅ 点击颜色按钮 → 颜色/色温应该改变

---

### 方法二：通过配置文件直接测试（最快）

#### 步骤1：编辑Lovelace配置

如果你的Lovelace使用YAML模式，编辑 `lovelace.yaml`（通常在 `config/` 目录）：

```yaml
title: 家
views:
  - title: 主页
    path: home
    icon: mdi:home
    cards:
      # 测试卡片
      - type: custom:ios26-light-card
        entity: light.your_light_name
        name: 测试灯光
        icon: mdi:lightbulb
        room: 测试房间
```

#### 步骤2：刷新浏览器
- 按 `Ctrl+Shift+R`（Windows/Linux）或 `Cmd+Shift+R`（Mac）硬刷新

---

## 🔍 调试技巧

### 1. 检查浏览器控制台
按 `F12` 打开开发者工具，查看控制台是否有错误：

**常见错误：**
```
❌ Failed to load resource: /local/ios26-light-card/ios26-light-card.js
解决：检查文件路径是否正确
```

```
❌ Custom element doesn't exist: ios26-light-card
解决：检查资源URL是否正确添加，或刷新浏览器
```

```
❌ Entity not found: light.xxx
解决：替换为你的实际灯光实体ID
```

### 2. 检查网络请求
在开发者工具的 **Network** 标签页：
- 刷新页面
- 搜索 `ios26-light-card.js`
- 确认状态码是 `200`（不是 `404`）

### 3. 验证灯光实体
在Home Assistant中：
1. **开发者工具** → **状态**
2. 搜索你的灯光实体
3. 检查属性：
   - `state`: "on" 或 "off"
   - `attributes.brightness`: 0-255（如果支持）
   - `attributes.rgb_color`: [r, g, b]（如果支持颜色）
   - `attributes.color_temp`: 153-500（如果支持色温）

---

## 📝 测试清单

### 基础功能
- [ ] 卡片正常显示
- [ ] 点击关闭的卡片能开灯
- [ ] 点击开启的卡片能关灯
- [ ] 状态指示灯正常工作

### 视觉效果
- [ ] 激活状态：高亮磨砂玻璃背景
- [ ] 激活状态：动态光流边框在旋转
- [ ] 激活状态：图标发光并放大
- [ ] 静默状态：卡片变暗半透明

### 亮度控制
- [ ] 点击展开控制面板
- [ ] 拖动滑块能调节亮度
- [ ] 亮度显示数字正确（0-100%）
- [ ] 滑块位置与实际亮度同步

### 颜色控制
- [ ] 白光按钮能切换到中性白
- [ ] 暖光按钮能切换到暖色温
- [ ] 彩色按钮能切换到彩色模式
- [ ] 颜色预览条显示当前颜色

### 多灯控制（如果有多个灯）
- [ ] 添加多个灯光实体
- [ ] 点击主卡片能控制所有灯
- [ ] 单独点击每个灯能独立控制
- [ ] 每个灯的状态正确显示

---

## 🎯 快速测试配置

### 最简配置（5秒测试）
```yaml
type: custom:ios26-light-card
entity: light.your_first_light
```

### 完整功能测试
```yaml
type: custom:ios26-light-card
entity: light.your_first_light
name: 全屋测试
icon: mdi:lightbulb-on
room: 测试区域
gradient: from-amber-200 via-orange-400 to-rose-600
```

### 多灯组测试
```yaml
type: custom:ios26-light-card
entities:
  - light.living_room
  - light.bedroom
  - light.kitchen
name: 全屋灯光
icon: mdi:lightbulb-group
room: 全屋
```

### 网格布局测试
```yaml
type: grid
columns: 2
square: false
cards:
  - type: custom:ios26-light-card
    entity: light.living_room
    name: 客厅

  - type: custom:ios26-light-card
    entity: light.bedroom
    name: 卧室
```

---

## ⚠️ 常见问题排查

### 问题1：卡片显示空白或报错

**症状：** 卡片区域空白或显示"自定义元素未找到"

**解决方案：**
1. 检查资源URL是否正确添加到Lovelace配置
2. 硬刷新浏览器（Ctrl+Shift+R）
3. 清除浏览器缓存
4. 检查浏览器控制台是否有错误信息
5. 确认文件路径：`/local/ios26-light-card/ios26-light-card.js`

### 问题2：实体未找到

**症状：** 显示"Entity not found"

**解决方案：**
1. 前往 **开发者工具** → **状态**
2. 搜索 `light.`
3. 复制实际的实体ID
4. 替换配置中的 `entity: light.xxx`

### 问题3：样式显示异常

**症状：** 卡片显示但不美观，缺少动画效果

**解决方案：**
1. 确认使用现代浏览器（Chrome 53+, Firefox 63+, Safari 10+）
2. 检查是否启用了浏览器的硬件加速
3. 清除浏览器缓存并硬刷新

### 问题4：功能不工作

**症状：** 卡片显示正常但点击没反应

**解决方案：**
1. 检查浏览器控制台是否有JavaScript错误
2. 确认灯光实体在Home Assistant中可以正常控制
3. 检查是否有足够的权限（admin用户）
4. 尝试在浏览器无痕模式下测试

---

## 🎨 视觉调试

如果需要调整样式，可以修改 `ios26-light-card.js` 中的CSS部分：

```javascript
// 在 shadowRoot.innerHTML 的 <style> 标签中
.ios26-card {
  /* 调整圆角 */
  border-radius: 2rem; /* 原来是 3rem */

  /* 调整模糊 */
  backdrop-filter: blur(50px); /* 原来是 100px */

  /* 调整阴影 */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); /* 减弱阴影 */
}
```

修改后记得刷新浏览器！

---

## 📊 性能测试

### 检查资源占用
在浏览器开发者工具中：
1. **Performance** 标签页
2. 点击录制按钮
3. 与卡片交互（点击、拖动滑块等）
4. 停止录制
5. 查看是否有性能瓶颈

### 预期性能
- **首次渲染**：< 100ms
- **点击响应**：< 50ms
- **滑块拖动**：60fps流畅
- **内存占用**：< 5MB

---

## ✅ 测试通过标准

如果以下所有项都正常，说明测试通过：

1. ✅ 卡片在仪表盘中正常显示
2. ✅ 点击能开关灯光
3. ✅ iOS 26视觉效果正确（磨砂、光流、动画）
4. ✅ 亮度滑块工作正常
5. ✅ 颜色按钮响应正常
6. ✅ 无浏览器控制台错误
7. ✅ 多灯模式下能独立控制

---

## 🎉 测试成功后

### 下一步：
1. ✅ 测试通过
2. 📸 截图保存效果
3. 🔄 根据需要微调样式
4. 🚀 准备上传到GitHub/HACS

### 生产部署：
1. 将文件放到正式位置
2. 配置所有需要的灯光卡片
3. 创建完整的仪表盘布局
4. 备份配置文件

---

## 📞 获取帮助

如果测试中遇到问题：

1. **查看浏览器控制台**（F12）的错误信息
2. **检查Home Assistant日志**：设置 → 系统 → 日志
3. **参考完整文档**：[README.md](README.md)
4. **查看常见问题**：[README.md#常见问题](README.md#-常见问题)

---

**祝测试顺利！** 🎯

有任何问题随时告诉我！
