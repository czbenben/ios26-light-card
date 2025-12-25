# iOS26 Light Card

完全还原iOS 26未来主义风格的Home Assistant灯光卡片，提供极致的视觉体验和完整的功能控制。

## ✨ 特性

- **🎨 iOS 26设计语言** - 完美还原液态磨砂玻璃、动态光流边框、超大圆角
- **💡 基础开关控制** - 点击卡片开关灯光，带状态指示
- **🌈 亮度调节** - 平滑的滑块控制（0-100%）
- **🎨 颜色/色温控制** - 支持白光、暖光、彩色模式
- **🔀 多灯控组** - 同时控制多个灯光或房间
- **⚡ 实时状态** - 自动同步Home Assistant状态
- **🎭 动态效果** - 呼吸灯、旋转光流、缩放动画

## 📦 安装

### HACS安装（推荐）

1. 在HACS中添加此自定义仓库
2. 前往 "Frontend" → 点击 "+" → 搜索 "iOS26 Light Card"
3. 点击安装

### 手动安装

1. 下载 [ios26-light-card.js](ios26-light-card.js)
2. 将文件放入 `config/www/ios26-light-card/` 目录
3. 在 `configuration.yaml` 中添加：

```yaml
lovelace:
  resources:
    - url: /local/ios26-light-card/ios26-light-card.js
      type: module
```

## 🚀 使用

### 基础配置（单个灯光）

```yaml
type: custom:ios26-light-card
entity: light.living_room
name: 全息光效
icon: mdi:lightbulb
room: 客厅
gradient: from-amber-200 via-orange-400 to-rose-600
```

### 多灯控组配置

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

### 完整配置示例

```yaml
type: custom:ios26-light-card
entity: light.bedroom
name: 睡眠环境
icon: mdi:lightbulb-on
room: 卧室
gradient: from-sky-300 via-indigo-500 to-emerald-500
```

## 🎛️ 配置参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `entity` | string | 否* | - | 单个灯光实体ID（与entities二选一） |
| `entities` | list | 否* | - | 多个灯光实体ID列表 |
| `name` | string | 否 | 实体名称 | 显示的卡片名称 |
| `icon` | string | 否 | `mdi:lightbulb` | Material Design图标 |
| `room` | string | 否 | `未分类` | 房间/区域名称 |
| `gradient` | string | 否 | 渐变色 | 动态光流边框的渐变色 |

*注意：`entity` 和 `entities` 必须提供其中一个

## 🎮 操作说明

- **单击关闭状态** → 开启灯光
- **单击开启状态** → 展开/收起控制面板
- **拖动滑块** → 调节亮度
- **点击颜色按钮** → 切换白光/暖光/彩色模式
- **多灯模式下** → 可单独控制每个灯光

## 💡 视觉效果

- **激活状态**：
  - 高亮磨砂玻璃背景
  - 动态渐变光流边框
  - 图标发光并放大
  - 呼吸灯状态指示

- **静默状态**：
  - 半透明背景
  - 图标变暗
  - 状态指示灯隐藏

## 🔧 技术细节

- 使用Web Components标准
- 原生JavaScript，无依赖
- 响应式设计，适配各种屏幕
- 完全支持Home Assistant API

## 📸 效果预览

查看你的React设计稿中的 `IOS26Card` 组件效果，本卡片完美还原了：

- ✅ 液态磨砂玻璃 (`backdrop-blur-[100px]`)
- ✅ 动态渐变光流边框 (旋转动画)
- ✅ 超大圆角 (`rounded-[3rem]`)
- ✅ 状态指示灯 (呼吸动画)
- ✅ 平滑过渡效果 (`transition-all duration-700`)
- ✅ 缩放动画 (`active:scale-90`)

## 🐛 问题反馈

如遇到问题，请在GitHub Issues中反馈。

## 📄 许可证

MIT License

---

**享受未来主义的智能家居体验！** 🚀
