# 🚀 iOS26 Light Card - 快速开始

## ⚡ 5分钟快速部署

### 第1步：安装卡片（1分钟）

```yaml
# 在 Home Assistant → 配置 → Lovelace仪表盘 → 资源 中添加：
- url: /hacsfiles/ios26-light-card/ios26-light-card.js
  type: module
```

### 第2步：添加卡片（1分钟）

在Lovelace编辑器中点击 **+ 添加卡片** → **手动编辑**，粘贴：

```yaml
type: custom:ios26-light-card
entity: light.your_light_here
```

### 第3步：享受！（3分钟）

欣赏你的iOS 26风格灯光卡片！✨

---

## 📋 复制粘贴模板

### 单个灯光
```yaml
type: custom:ios26-light-card
entity: light.living_room
name: 客厅主灯
icon: mdi:lightbulb
room: 客厅
```

### 两个灯光（并排显示）
```yaml
type: horizontal-stack
cards:
  - type: custom:ios26-light-card
    entity: light.living_room
    name: 客厅

  - type: custom:ios26-light-card
    entity: light.bedroom
    name: 卧室
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

### 多灯控组
```yaml
type: custom:ios26-light-card
entities:
  - light.living_room_1
  - light.living_room_2
  - light.living_room_3
name: 客厅全控
icon: mdi:lightbulb-group
room: 客厅
```

---

## 🎨 预设图标推荐

```yaml
# 房间图标
客厅: mdi:sofa
卧室: mdi:bed
厨房: mdi:silverware-fork-knife
浴室: mdi:shower
书房: mdi:book-open-multiple
走廊: mdi:walk
阳台: mdi:weather-sunny

# 灯光类型图标
主灯: mdi:lightbulb
氛围灯: mdi:lightbulb-on-outline
色光灯: mdi:palette
灯带: mdi:led-strip
吊灯: mdi:ceiling-light
台灯: mdi:lamp
```

---

## 🔧 常用配置

### 完整参数
```yaml
type: custom:ios26-light-card
entity: light.bedroom
name: 睡眠环境           # 显示名称
icon: mdi:moon-waning-crescent  # 图标
room: 卧室               # 房间标签
gradient: from-sky-300 via-indigo-500 to-emerald-500  # 渐变色
```

### 常用渐变方案
```yaml
# 暖色（客厅、餐厅）
gradient: from-amber-200 via-orange-400 to-rose-600

# 冷色（卧室、浴室）
gradient: from-sky-300 via-indigo-500 to-emerald-500

# 清新（厨房、书房）
gradient: from-emerald-300 via-teal-500 to-cyan-600

# 神秘（娱乐室）
gradient: from-cyan-300 via-blue-500 to-purple-600

# 浪漫（卧室）
gradient: from-violet-300 via-purple-500 to-fuchsia-600
```

---

## 🎯 操作说明

| 操作 | 效果 |
|------|------|
| 点击关闭的卡片 | 开灯 |
| 点击开启的卡片 | 展开/收起控制面板 |
| 拖动亮度滑块 | 调节亮度（0-100%） |
| 点击"白光"按钮 | 切换到中性白光 |
| 点击"暖光"按钮 | 切换到暖光模式 |
| 点击"彩色"按钮 | 切换到彩色模式 |
| 多灯模式下点击单个灯 | 单独开关该灯 |

---

## 🐛 快速排错

### 问题1：卡片不显示
```yaml
# 检查资源URL是否正确
url: /hacsfiles/ios26-light-card/ios26-light-card.js  # 正确
url: /local/ios26-light-card.js  # 手动安装时使用
```

### 问题2：实体未找到
```yaml
# 确保实体ID正确
entity: light.living_room  # 正确格式
entity: living_room  # ❌ 错误，需要 light. 前缀
```

### 问题3：亮度不工作
```yaml
# 检查灯光是否支持亮度
# 在开发者工具 → 状态中查看实体是否有 brightness 属性
```

### 问题4：样式不正常
```bash
# 清除浏览器缓存
# 硬刷新：Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
```

---

## 📱 完整示例仪表盘

```yaml
title: 智能家居
views:
  - title: 主页
    path: home
    icon: mdi:home
    cards:
      # 标题
      - type: markdown
        content: "## 🏠 我的智能家"

      # 灯光网格
      - type: grid
        columns: 2
        square: false
        cards:
          - type: custom:ios26-light-card
            entity: light.living_room
            name: 客厅
            icon: mdi:sofa
            room: 客厅
            gradient: from-amber-200 via-orange-400 to-rose-600

          - type: custom:ios26-light-card
            entity: light.bedroom
            name: 卧室
            icon: mdi:bed
            room: 卧室
            gradient: from-sky-300 via-indigo-500 to-emerald-500

          - type: custom:ios26-light-card
            entity: light.kitchen
            name: 厨房
            icon: mdi:silverware-fork-knife
            room: 厨房
            gradient: from-emerald-300 via-teal-500 to-cyan-600

          - type: custom:ios26-light-card
            entity: light.bathroom
            name: 浴室
            icon: mdi:shower
            room: 浴室
            gradient: from-cyan-300 via-blue-500 to-purple-600
```

---

## 💡 专业技巧

### 技巧1：创建场景模式
```yaml
# 定义场景
scene:
  - name: 晚间模式
    entities:
      light.living_room:
        state: on
        brightness: 150
        color_temp: 400
      light.bedroom:
        state: on
        brightness: 100
        color_temp: 500

# 在卡片中调用
type: custom:ios26-light-card
entities:
  - light.living_room
  - light.bedroom
name: 晚间模式
```

### 技巧2：使用条件卡片
```yaml
type: conditional
conditions:
  - entity: input_boolean.guest_mode
    state: 'off'
card:
  type: custom:ios26-light-card
  entity: light.living_room
  name: 客厅（访客模式关闭时显示）
```

### 技巧3：添加能量统计
```yaml
type: custom:ios26-light-card
entity: light.living_room
name: 客厅
```
然后在配置文件中添加：
```yaml
sensor:
  - platform: template
    sensors:
      living_room_energy:
        friendly_name: "客厅灯能耗"
        unit_of_measurement: "kWh"
        value_template: >
          {{ states('sensor.living_room_power') | float * 0.001 }}
```

---

## 📚 更多资源

- **完整文档**: [README.md](README.md)
- **安装指南**: [INSTALL.md](INSTALL.md)
- **配置示例**: [ios26-light-examples.yaml](../../仪表盘/ios26-light-examples.yaml)
- **技术细节**: [MIGRATION.md](MIGRATION.md)
- **项目总结**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## ✅ 检查清单

开始使用前确认：

- [ ] Home Assistant运行正常
- [ ] 已安装HACS
- [ ] 灯光实体已配置并可控制
- [ ] 浏览器已清除缓存
- [ ] Lovelace资源已添加

---

**开始享受未来主义的智能家居体验吧！** 🎉

如有问题，请查看完整文档或提交Issue。
