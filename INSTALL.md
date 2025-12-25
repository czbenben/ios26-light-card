# iOS26 Light Card - 快速安装指南

## 📦 方法一：HACS安装（推荐）

### 步骤1：添加到HACS

1. 打开Home Assistant
2. 进入 **HACS** → **Frontend** → 点击右上角 **+** 按钮
3. 点击 **⚙️ 三点菜单** → **Custom repositories**
4. 添加以下信息：
   - **Repository**: `your-github-username/ios26-light-card`（你的GitHub仓库地址）
   - **Category**: `Lovelace`
5. 点击 **Add**

### 步骤2：安装卡片

1. 在HACS的Frontend页面搜索 "iOS26 Light Card"
2. 点击卡片进入详情页
3. 点击右下角 **下载** 按钮
4. 等待安装完成

### 步骤3：配置Lovelace资源

1. 进入Home Assistant
2. 打开 **配置** → **Lovelace仪表盘**
3. 点击右上角 **⋮ 三点菜单** → **编辑原始配置**
4. 在 `lovelace:` 部分添加资源引用：

```yaml
resources:
  - url: /hacsfiles/ios26-light-card/ios26-light-card.js
    type: module
```

如果你的配置没有 `resources:` 部分，添加完整的：

```yaml
lovelace:
  mode: yaml
  resources:
    - url: /hacsfiles/ios26-light-card/ios26-light-card.js
      type: module
  # ... 其他配置
```

5. 点击 **保存**

---

## 📦 方法二：手动安装

### 步骤1：创建目录

在Home Assistant的配置目录中创建文件夹：

```bash
config/www/ios26-light-card/
```

### 步骤2：复制文件

将 `ios26-light-card.js` 文件复制到刚创建的目录中。

### 步骤3：配置资源

在Lovelace配置中添加资源：

```yaml
lovelace:
  mode: yaml
  resources:
    - url: /local/ios26-light-card/ios26-light-card.js
      type: module
```

---

## 🚀 使用示例

### 示例1：基础单灯控制

在Lovelace编辑器中添加新卡片，选择 **手动编辑**，然后粘贴：

```yaml
type: custom:ios26-light-card
entity: light.living_room
name: 客厅主灯
icon: mdi:lightbulb
room: 客厅
```

### 示例2：多灯控组

```yaml
type: custom:ios26-light-card
entities:
  - light.living_room_main
  - light.living_room_side
  - light.living_room_ambient
name: 客厅灯光组
icon: mdi:lightbulb-group
room: 客厅
gradient: from-amber-200 via-orange-400 to-rose-600
```

### 示例3：完整网格布局

```yaml
type: grid
columns: 2
square: false
cards:
  - type: custom:ios26-light-card
    entity: light.living_room
    name: 客厅
    room: 客厅

  - type: custom:ios26-light-card
    entity: light.bedroom
    name: 卧室
    room: 卧室

  - type: custom:ios26-light-card
    entity: light.kitchen
    name: 厨房
    room: 厨房

  - type: custom:ios26-light-card
    entity: light.bathroom
    name: 浴室
    room: 浴室
```

---

## ⚙️ 配置参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `entity` | string | 否* | - | 单个灯光实体ID |
| `entities` | list | 否* | - | 多个灯光实体ID列表 |
| `name` | string | 否 | 实体名称 | 卡片显示名称 |
| `icon` | string | 否 | `mdi:lightbulb` | Material Design图标 |
| `room` | string | 否 | `未分类` | 房间/区域标签 |
| `gradient` | string | 否 | 默认渐变 | 光流边框颜色 |

*注：`entity` 和 `entities` 必须提供其中一个

---

## 🎨 预设渐变色方案

```yaml
# 暖色调（客厅、餐厅）
gradient: from-amber-200 via-orange-400 to-rose-600

# 冷色调（卧室、浴室）
gradient: from-sky-300 via-indigo-500 to-emerald-500

# 自然色（厨房、书房）
gradient: from-emerald-300 via-teal-500 to-cyan-600

# 神秘色（娱乐室、氛围灯）
gradient: from-cyan-300 via-blue-500 to-purple-600

# 浪漫色（卧室、特殊场景）
gradient: from-violet-300 via-purple-500 to-fuchsia-600

# 活力色（运动、游戏室）
gradient: from-rose-300 via-pink-500 to-red-600
```

---

## 🔍 常见问题

### Q: 卡片显示 "未找到实体"？

**A:** 检查实体ID是否正确，格式应为 `light.your_light_name`。

### Q: 亮度调节不工作？

**A:** 确保你的灯光支持亮度调节（`brightness` 属性）。

### Q: 颜色控制不生效？

**A:** 确保你的灯光支持RGB颜色或色温调节。

### Q: 卡片样式不正常？

**A:** 清除浏览器缓存，检查资源URL是否正确。

### Q: 多灯控组中个别灯不受控制？

**A:** 检查所有实体是否都存在且在线。

---

## 🎯 下一步

1. ✅ 安装完成
2. ✅ 配置资源
3. ✅ 添加卡片到仪表盘
4. ✅ 调整配置参数
5. ✅ 享受未来主义体验！

---

## 📞 获取帮助

- **GitHub Issues**: [提交问题](https://github.com/yourusername/ios26-light-card/issues)
- **Home Assistant社区**: [论坛讨论](https://community.home-assistant.io)

---

**祝使用愉快！** 🎉
