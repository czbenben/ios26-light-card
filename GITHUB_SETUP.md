# 🚀 GitHub仓库发布指南

## 📋 发布前准备清单

### 1. 文件检查
确保以下文件都在 `ios26-light-card/` 目录中：

#### 核心文件（必需）
- ✅ `ios26-light-card.js` - 核心卡片实现
- ✅ `hacs.json` - HACS仓库配置
- ✅ `README.md` - GitHub首页
- ✅ `LICENSE` - MIT许可证

#### 文档文件（推荐）
- ✅ `info.md` - HACS商店详情页
- ✅ `INSTALL.md` - 安装指南
- ✅ `QUICKSTART.md` - 快速开始
- ✅ `TESTING_GUIDE.md` - 测试指南
- ✅ `MIGRATION.md` - 技术映射文档
- ✅ `PROJECT_SUMMARY.md` - 项目总结
- ✅ `CHANGELOG.md` - 版本更新日志
- ✅ `FILE_CHECKLIST.md` - 文件清单
- ✅ `package.json` - NPM包信息

#### GitHub配置文件
- ✅ `.gitignore` - Git忽略规则
- ✅ `.github/workflows/release.yml` - 自动化发布

---

## 🌟 创建GitHub仓库

### 步骤1：创建新仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角 **+** → **New repository**
3. 填写仓库信息：
   - **Repository name**: `ios26-light-card`
   - **Description**: `完全还原iOS 26未来主义风格的Home Assistant灯光卡片`
   - **Visibility**: ✅ Public（HACS要求公开仓库）
   - **不要**勾选 "Add a README file"（我们已经有了）
4. 点击 **Create repository**

### 步骤2：上传文件

**选项A：通过GitHub网页界面（最简单）**

1. 创建仓库后，点击 **uploading an existing file**
2. 将所有文件拖拽到页面
3. 等待上传完成
4. 在底部输入提交信息：
   ```
   Initial commit: iOS26 Light Card v1.0.0

   - 完全还原iOS 26未来主义设计风格
   - 支持开关、亮度、颜色/色温控制
   - 支持多灯控组
   - 零依赖，纯原生JavaScript
   ```
5. 点击 **Commit changes**

**选项B：通过Git命令行（推荐）**

```bash
# 1. 进入项目目录
cd d:\ben\HAOS\HACS\ios26-light-card

# 2. 初始化Git仓库
git init

# 3. 添加所有文件
git add .

# 4. 创建首次提交
git commit -m "Initial commit: iOS26 Light Card v1.0.0

- 完全还原iOS 26未来主义设计风格
- 支持开关、亮度、颜色/色温控制
- 支持多灯控组
- 零依赖，纯原生JavaScript"

# 5. 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/yourusername/ios26-light-card.git

# 6. 推送到GitHub
git branch -M main
git push -u origin main
```

### 步骤3：修改配置文件中的占位符

打开以下文件，将 `yourusername` 替换为你的实际GitHub用户名：

1. **README.md** - 第287行
2. **hacs.json** - 第13、17行
3. **INSTALL.md** - 搜索 `yourusername`
4. **QUICKSTART.md** - 搜索 `yourusername`
5. **PROJECT_SUMMARY.md** - 搜索 `yourusername`

---

## 🏷️ 创建GitHub Release

### 步骤1：创建标签

```bash
# 通过Git命令行
git tag v1.0.0
git push origin v1.0.0
```

### 步骤2：在GitHub上创建Release

1. 打开仓库页面
2. 点击右侧 **Releases** → **Create a new release**
3. 填写信息：
   - **Tag**: 选择 `v1.0.0`
   - **Title**: `iOS26 Light Card v1.0.0`
   - **Description**:
     ```markdown
     ## 🎉 首次发布

     ### ✨ 特性
     - 完全还原iOS 26未来主义设计风格
     - 支持开关、亮度、颜色/色温控制
     - 支持多灯控组和独立控制
     - 零依赖，纯原生JavaScript（仅18KB）

     ### 🎨 视觉效果
     - 液态磨砂玻璃效果
     - 动态渐变光流边框（旋转动画）
     - 超大圆角设计（48px）
     - 呼吸状态指示灯
     - 平滑过渡动画

     ### 📦 安装
     在HACS中搜索 "iOS26 Light Card" 或访问 [Release](https://github.com/yourusername/ios26-light-card/releases) 下载

     ### 📚 文档
     - [完整文档](https://github.com/yourusername/ios26-light-card/blob/main/README.md)
     - [快速开始](https://github.com/yourusername/ios26-light-card/blob/main/QUICKSTART.md)
     - [配置示例](https://github.com/yourusername/ios26-light-card/blob/main/ios26-light-examples.yaml)

     ### ⚠️ 系统要求
     - Home Assistant 2021.12.0+
     - 现代浏览器（Chrome 53+, Firefox 63+, Safari 10+）
     ```
4. 勾选 **Set as the latest release**
5. 点击 **Publish release**

---

## 📥 提交到HACS

### 方法1：通过HACS内置提交（推荐）

1. 打开Home Assistant
2. 进入 **HACS**
3. 点击右上角 **+** → **Frontend**
4. 点击右上角 **⋮** → **Custom repositories**
5. 填写信息：
   - **Category**: `Lovelace`
   - **Repository**: `yourusername/ios26-light-card`
6. 点击 **Add**
7. 等待审核（通常1-3天）

### 方法2：提交到HACS默认仓库（长期）

1. 访问 [HACS Default Repository](https://github.com/hacs/default)
2. Fork该仓库
3. 编辑 `plugins.yaml`，添加：

```yaml
- name: iOS26 Light Card
  link: https://github.com/yourusername/ios26-light-card
  description: 完全还原iOS 26未来主义风格的Home Assistant灯光卡片
  domains:
    - light
```

4. 提交Pull Request
5. 等待审核

---

## ✅ 发布后检查清单

### GitHub仓库
- [ ] 所有文件已上传
- [ ] README.md正常显示
- [ ] License设置为MIT
- [ ] Release v1.0.0已创建
- [ ] Tags已推送
- [ ] 占位符已替换为实际用户名

### HACS集成
- [ ] 可以在HACS中搜索到仓库
- [ ] 可以通过HACS下载安装
- [ ] 安装后资源加载正常

### 功能测试
- [ ] 通过HACS安装卡片
- [ ] 添加到Lovelace仪表盘
- [ ] 灯光开关正常
- [ ] 亮度调节正常
- [ ] 颜色控制正常
- [ ] 多灯控制正常
- [ ] iOS 26视觉效果正确

---

## 🎯 快速发布命令总结

```bash
# 1. 初始化仓库（如果还没有）
git init
git add .
git commit -m "Initial commit: iOS26 Light Card v1.0.0"
git branch -M main

# 2. 添加远程仓库
git remote add origin https://github.com/yourusername/ios26-light-card.git

# 3. 推送到GitHub
git push -u origin main

# 4. 创建标签
git tag v1.0.0
git push origin v1.0.0

# 5. 然后在GitHub网页上创建Release
```

---

## 📊 发布后统计

发布后，你可以通过以下方式追踪项目：

### GitHub统计
- **Stars**: 收藏数量
- **Watchers**: 关注者数量
- **Forks**: 复刻数量
- **Issues**: 问题和建议
- **Pull Requests**: 贡献代码

### HACS统计
- **Downloads**: 下载次数
- **Installations**: 安装用户数
- **Rating**: 用户评分

---

## 🎉 发布成功！

一旦发布成功，用户就可以：

1. **在HACS中搜索** "iOS26 Light Card"
2. **一键安装** 到Home Assistant
3. **享受** 未来主义的灯光控制体验

---

## 📞 获取帮助

如果在发布过程中遇到问题：

- **GitHub文档**: [Creating a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories)
- **HACS文档**: [Adding a repository](https://hacs.xyz/docs/publish/include/)
- **Release文档**: [Managing releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

---

**祝你发布成功！** 🚀

发布后记得把仓库链接分享给我，我会帮你测试和优化！
