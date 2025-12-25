# iOS26 Light Card

<div align="center">

![iOS26 Light Card](https://img.shields.io/badge/iOS26-Light%20Card-blue?style=for-the-badge)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2021.12.0%2B-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

**完全还原iOS 26未来主义风格的Home Assistant灯光卡片**

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [配置示例](#-配置示例) • [安装指南](#-安装)

</div>

---

## ✨ 功能特性

### 🎨 iOS 26设计语言（100%还原）
- ✨ **液态磨砂玻璃效果** - `backdrop-blur-[100px]` 极致模糊
- 🌈 **动态渐变光流边框** - 旋转的彩虹光晕动画
- 📐 **超大圆角设计** - 48px (3rem) 完美圆角
- 🎭 **深度立体阴影** - 多层阴影创造空间感
- 💫 **平滑过渡动画** - 700ms贝塞尔曲线
- 🔘 **点击缩放反馈** - 自然的交互体验
- 💡 **呼吸状态指示** - 实时显示灯光状态
- 🎨 **图标发光效果** - 激活状态下的视觉冲击

### 🎛️ 完整功能支持
- 💡 **基础开关控制** - 一键开关，即时响应
- 🌟 **亮度调节** - 0-100%平滑滑块控制
- 🎨 **颜色/色温控制** - 白光、暖光、彩色模式
- 🔀 **多灯控组** - 同时控制多个灯光或房间
- 🎯 **独立控制** - 多灯模式下可单独控制每个灯
- 📊 **实时状态同步** - 自动同步Home Assistant状态
- 🚀 **零依赖轻量** - 纯原生JavaScript，仅18KB

---

## 🚀 快速开始

### 1️⃣ 安装卡片

**HACS安装（推荐）：**
1. HACS → Frontend → 点击 "+" 搜索 "iOS26 Light Card"
2. 点击下载安装

**手动安装：**
```bash
# 下载文件到 config/www/ios26-light-card/
# 在 Lovelace 资源中添加：
- url: /local/ios26-light-card/ios26-light-card.js
  type: module
```

### 2️⃣ 添加卡片

```yaml
type: custom:ios26-light-card
entity: light.living_room
name: 客厅主灯
icon: mdi:lightbulb
room: 客厅
```

### 3️⃣ 享受！

✨ 欣赏你的iOS 26风格灯光卡片！

---

## 🎨 配置示例

### 单个灯光

```yaml
type: custom:ios26-light-card
entity: light.bedroom
name: 睡眠环境
icon: mdi:moon-waning-crescent
room: 卧室
gradient: from-sky-300 via-indigo-500 to-emerald-500
```

### 多灯控组

```yaml
type: custom:ios26-light-card
entities:
  - light.living_room_main
  - light.living_room_side
  - light.living_room_ambient
name: 客厅灯光组
icon: mdi:lightbulb-group
room: 客厅
```

### 网格布局（推荐）

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

  - type: custom:ios26-light-card
    entity: light.kitchen
    name: 厨房

  - type: custom:ios26-light-card
    entity: light.bathroom
    name: 浴室
```

---

## 📋 配置参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `entity` | string | 否* | - | 单个灯光实体ID |
| `entities` | list | 否* | - | 多个灯光实体ID列表 |
| `name` | string | 否 | 实体名称 | 卡片显示名称 |
| `icon` | string | 否 | `mdi:lightbulb` | Material Design图标 |
| `room` | string | 否 | `未分类` | 房间/区域标签 |
| `gradient` | string | 否 | 默认渐变 | 光流边框渐变色 |

*注：`entity` 和 `entities` 必须提供其中一个

---

## 🎭 预设渐变方案

```yaml
# 暖色调（客厅、餐厅）
gradient: from-amber-200 via-orange-400 to-rose-600

# 冷色调（卧室、浴室）
gradient: from-sky-300 via-indigo-500 to-emerald-500

# 自然色（厨房、书房）
gradient: from-emerald-300 via-teal-500 to-cyan-600

# 神秘色（娱乐室）
gradient: from-cyan-300 via-blue-500 to-purple-600

# 浪漫色（卧室）
gradient: from-violet-300 via-purple-500 to-fuchsia-600

# 活力色（游戏室）
gradient: from-rose-300 via-pink-500 to-red-600
```

---

## 🎮 操作说明

| 操作 | 效果 |
|------|------|
| 点击关闭的卡片 | 🔌 开灯 |
| 点击开启的卡片 | 📂 展开/收起控制面板 |
| 拖动亮度滑块 | 💡 调节亮度（0-100%） |
| 点击"白光"按钮 | ⚪ 切换到中性白光 |
| 点击"暖光"按钮 | 🟡 切换到暖光模式 |
| 点击"彩色"按钮 | 🌈 切换到彩色模式 |
| 多灯模式下点击单个灯 | 🎯 单独开关该灯 |

---

## 📸 效果预览

### 激活状态
- ✅ 高亮磨砂玻璃背景
- ✅ 动态渐变光流边框（旋转动画）
- ✅ 图标发光并放大10%
- ✅ 呼吸灯状态指示
- ✅ 展开控制面板（亮度、颜色）

### 静默状态
- ✅ 半透明背景
- ✅ 图标变暗
- ✅ 状态指示灯隐藏
- ✅ 控制面板收起

---

## 🔧 技术细节

### 核心技术
- **Web Components** - 原生浏览器标准
- **Shadow DOM** - 完全样式隔离
- **Vanilla JavaScript** - 零依赖，高性能
- **CSS Grid & Flexbox** - 响应式布局
- **CSS Animations** - 硬件加速动画

### 浏览器兼容性
- ✅ Chrome 53+
- ✅ Firefox 63+
- ✅ Safari 10+
- ✅ Edge 79+

### Home Assistant版本
- ✅ 2021.12.0 及以上

---

## 📚 完整文档

- 📖 **[快速开始指南](QUICKSTART.md)** - 5分钟快速部署
- 📦 **[详细安装指南](INSTALL.md)** - HACS和手动安装步骤
- 🎨 **[配置示例](../../仪表盘/ios26-light-examples.yaml)** - 10+ 实用配置
- 🔧 **[技术映射文档](MIGRATION.md)** - React到Web Component详解
- 📊 **[项目总结](PROJECT_SUMMARY.md)** - 完整功能清单和设计理念

---

## 🐛 常见问题

<details>
<summary><b>Q: 卡片显示"未找到实体"？</b></summary>

检查实体ID格式是否正确，应该是 `light.your_light_name`。
</details>

<details>
<summary><b>Q: 亮度调节不工作？</b></summary>

确保你的灯光支持 `brightness` 属性。在开发者工具 → 状态中查看实体属性。
</details>

<details>
<summary><b>Q: 颜色控制不生效？</b></summary>

确保你的灯光支持 `rgb_color` 或 `color_temp` 属性。
</details>

<details>
<summary><b>Q: 卡片样式不正常？</b></summary>

清除浏览器缓存（Ctrl+Shift+R），检查资源URL是否正确。
</details>

---

## 🤝 贡献

欢迎提交Issue和Pull Request！

### 开发环境
```bash
# 克隆仓库
git clone https://github.com/yourusername/ios26-light-card.git

# 编辑 ios26-light-card.js

# 在HA中测试
# 将文件链接到 config/www/ios26-light-card/
```

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- 设计灵感来自iOS 26未来主义设计语言
- 基于Home Assistant Lovelace框架
- 使用Material Design Icons

---

<div align="center">

**享受未来主义的智能家居体验！** 🚀

Made with ❤️ by [Your Name]

[🐛 报告问题] • [💡 功能建议] • [⭐ 给个星标]

</div>
