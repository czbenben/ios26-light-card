# React到Web Component映射文档

本文档详细说明React设计稿中的各个元素如何映射到HACS自定义卡片。

## 🎨 设计转换对照表

### 1. 状态管理

#### React版本
```jsx
const [devices, setDevices] = useState({
  livingRoomLight: { active: true, color: '...' }
});
```

#### Web Component版本
```javascript
class IOS26LightCard extends HTMLElement {
  constructor() {
    super();
    this.hueStates = new Map(); // 替代React State
  }
}
```

**映射关系**:
- `useState` → `this.hueStates = new Map()`
- `setDevices` → `this.hueStates.set(key, value)`
- `devices.active` → `state.state === 'on'`

---

### 2. 组件结构

#### React版本的IOS26Card
```jsx
const IOS26Card = ({ device, icon: Icon, onClick }) => (
  <div
    onClick={onClick}
    className={`relative group p-6 rounded-[3rem] ... ${
      device.active ? 'bg-white/10 backdrop-blur-[100px]' : 'bg-white/5 opacity-40'
    }`}
  >
    {/* 内容 */}
  </div>
);
```

#### Web Component版本
```javascript
render() {
  const isActive = this.isAnyLightOn();
  this.shadowRoot.innerHTML = `
    <div class="ios26-card ${isActive ? 'active' : 'inactive'}">
      <!-- 内容 -->
    </div>
  `;
}
```

**映射关系**:
- `props.device` → `this.config` + `this.hueStates`
- `props.onClick` → `addEventListener('click', ...)`
- `props.icon: Icon` → `<ha-icon icon="${this.config.icon}">`

---

### 3. CSS类名转换

#### Tailwind CSS → 自定义CSS

| React (Tailwind) | Web Component CSS | 说明 |
|------------------|-------------------|------|
| `rounded-[3rem]` | `border-radius: 3rem;` | 超大圆角 |
| `backdrop-blur-[100px]` | `backdrop-filter: blur(100px);` | 液态磨砂 |
| `bg-white/10` | `background: rgba(255, 255, 255, 0.1);` | 半透明背景 |
| `shadow-[0_40px_80px_rgba(0,0,0,0.2)]` | `box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);` | 深度阴影 |
| `transition-all duration-700` | `transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);` | 平滑过渡 |
| `active:scale-90` | `:active { transform: scale(0.9); }` | 点击缩放 |
| `animate-pulse` | `@keyframes pulse { ... }` | 呼吸动画 |
| `animate-[spin_8s_linear_infinite]` | `animation: spin 8s linear infinite;` | 旋转动画 |

---

### 4. 动态光流边框

#### React版本
```jsx
{device.active && (
  <div className={`absolute -inset-[100%] bg-gradient-to-tr ${device.color} opacity-20 blur-[60px] animate-[spin_8s_linear_infinite]`} />
)}
```

#### Web Component版本
```css
.ios26-card.active::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 400%;
  height: 400%;
  background: linear-gradient(45deg,
    rgba(251, 191, 36, 0.2),
    rgba(249, 115, 22, 0.2),
    rgba(225, 29, 72, 0.2)
  );
  opacity: 0.2;
  filter: blur(60px);
  animation: spin 8s linear infinite;
}
```

**映射关系**:
- 条件渲染 `{device.active && ...}` → `.ios26-card.active::before`
- `inset-[100%]` → `top/left: -100%` + `width/height: 400%`
- `bg-gradient-to-tr` → `linear-gradient(45deg, ...)`

---

### 5. 状态指示灯

#### React版本
```jsx
{device.active && <div className="w-2 h-2 rounded-full bg-white animate-ping" />}
```

#### Web Component版本
```html
<div class="status-indicator"></div>
```

```css
.status-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: white;
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.ios26-card.inactive .status-indicator {
  display: none; /* 条件隐藏 */
}
```

---

### 6. 图标容器

#### React版本
```jsx
<div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 ${
  device.active
  ? `bg-gradient-to-br ${device.color} text-white shadow-2xl scale-110`
  : 'bg-white/10 text-white/30'
}`}>
  <Icon size={28} strokeWidth={1.5} />
</div>
```

#### Web Component版本
```html
<div class="icon-container">
  <ha-icon icon="${this.config.icon}"></ha-icon>
</div>
```

```css
.icon-container {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
}

.ios26-card.active .icon-container {
  background: linear-gradient(135deg, #fcd34d, #fb923c, #f43f5e);
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}
```

---

### 7. 亮度控制

#### React版本（未在原稿中，假设实现）
```jsx
<input
  type="range"
  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
  value={brightness}
  onChange={(e) => setBrightness(e.target.value)}
/>
```

#### Web Component版本
```html
<input
  type="range"
  class="brightness-slider"
  min="0"
  max="255"
  value="0"
/>
```

```javascript
slider.addEventListener('input', (e) => {
  this.setBrightness(parseInt(e.target.value));
});
```

---

### 8. 设备信息显示

#### React版本
```jsx
<div className="space-y-1">
  <h3 className={`text-lg font-bold ${device.active ? 'text-white' : 'text-white/40'}`}>
    {device.name}
  </h3>
  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
    {device.room} · {device.active ? '活性' : '静默'}
  </p>
</div>
```

#### Web Component版本
```html
<div class="device-info">
  <h3>${this.config.name}</h3>
  <p>${this.config.room} · <span class="status-text">静默</span></p>
</div>
```

```css
.device-info h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}

.ios26-card.active .device-info h3 {
  color: white;
}

.device-info p {
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.3);
}
```

---

### 9. 多灯控组网格

#### React版本（假设）
```jsx
<div className="grid grid-cols-2 gap-6">
  {devices.map(device => (
    <IOS26Card key={device.id} device={device} />
  ))}
</div>
```

#### Web Component版本
```html
<div class="lights-grid">
  ${this.entities.map(entity => `
    <div class="light-item" data-entity="${entity}">
      <div class="light-item-name">${entity.replace(/^light\./, '')}</div>
      <div class="light-item-status">离线</div>
    </div>
  `).join('')}
</div>
```

```css
.lights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 🔄 Home Assistant集成

### React版本（模拟状态）
```jsx
const [devices, setDevices] = useState({
  livingRoomLight: { active: true, ... }
});

const toggleDevice = (id) => {
  setDevices(prev => {
    const next = { ...prev };
    next[id].active = !next[id].active;
    return next;
  });
};
```

### Web Component版本（真实HA集成）
```javascript
set hass(hass) {
  this._hass = hass;
  this.entities.forEach(entity => {
    const state = hass.states[entity];
    if (state) {
      this.hueStates.set(entity, state);
    }
  });
  this.updateCard();
}

async toggleLight() {
  await Promise.all(this.entities.map(entity => {
    return this.hass.callService('light', 'turn_on', {
      entity_id: entity
    });
  }));
}
```

---

## 📊 性能优化对比

| 特性 | React | Web Component | 优势 |
|------|-------|---------------|------|
| 首次加载 | 需要React运行时 | 原生JavaScript | WC更快 |
| 内存占用 | 较高（虚拟DOM） | 较低 | WC更轻 |
| 更新机制 | 虚拟DOM diff | 直接DOM操作 | WC更直接 |
| 样式隔离 | 需要CSS-in-JS | Shadow DOM | WC原生隔离 |
| 浏览器兼容 | 需要polyfill | 现代浏览器原生 | WC更标准 |

---

## ✅ 完美还原清单

- [x] 液态磨砂玻璃效果 (`backdrop-blur-[100px]`)
- [x] 动态渐变光流边框 (旋转动画)
- [x] 超大圆角 (`rounded-[3rem]`)
- [x] 深度阴影效果
- [x] 状态指示灯呼吸动画
- [x] 图标发光和缩放
- [x] 平滑过渡效果 (`duration-700`)
- [x] 点击缩放反馈 (`active:scale-90`)
- [x] 条件样式应用 (active/inactive)
- [x] 字体样式还原 (Inter, 加粗, 字距)

---

## 🎯 关键差异说明

### 1. 条件渲染
- **React**: `{condition && <Element />}`
- **WC**: CSS类控制 `.inactive .element { display: none; }`

### 2. 动态类名
- **React**: `className={`${active ? 'text-white' : 'text-black'}`}`
- **WC**: 父元素状态控制 `.active .child { color: white; }`

### 3. 事件处理
- **React**: `onClick={handler}`
- **WC**: `element.addEventListener('click', handler.bind(this))`

### 4. 状态更新
- **React**: `setState()` 自动触发重渲染
- **WC**: 手动调用 `updateCard()` 或直接修改DOM

---

**设计理念保持一致，实现技术完美适配！** 🎨✨
