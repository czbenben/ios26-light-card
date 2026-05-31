/**
 * iOS26 Light Card
 * 完全还原iOS 26未来主义风格的Home Assistant灯光卡片
 * 支持开关控制、亮度调节、颜色/色温控制、多灯控组
 */
class IOS26LightCard extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this.brightness = 100;
    this.colorTemp = 370;
    this.color = { hue: 0, saturation: 100 };
    this.isExpanded = false;
    this.hueStates = new Map(); // 存储每个灯的状态
  }

  /**
   * Sanitize a string for safe insertion into HTML.
   * Prevents XSS by escaping HTML special characters.
   */
  _escapeHtml(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Validate that a string matches expected patterns.
   */
  _validateIcon(icon) {
    if (typeof icon !== 'string') return 'mdi:lightbulb';
    // Icons must match mdi:icon-name pattern
    if (!/^[a-z]+:[a-z0-9-]+$/i.test(icon)) return 'mdi:lightbulb';
    return icon;
  }

  _validateGradient(gradient) {
    if (typeof gradient !== 'string') return 'from-amber-200 via-orange-400 to-rose-600';
    // Only allow alphanumeric, hyphens, and spaces (Tailwind class names)
    if (!/^[a-zA-Z0-9\- ]+$/.test(gradient)) return 'from-amber-200 via-orange-400 to-rose-600';
    return gradient;
  }

  setConfig(config) {
    this.config = config;

    // 支持单灯或多灯组
    if (!config.entity && !config.entities) {
      throw new Error('需要提供 entity 或 entities');
    }

    // 如果是单个实体，转换为数组
    this.entities = config.entities
      ? (Array.isArray(config.entities) ? config.entities : [config.entities])
      : [config.entity];

    // Validate entity IDs (must match domain.object_id pattern)
    this.entities = this.entities.filter(e => {
      if (typeof e !== 'string') return false;
      return /^[a-z_]+\.[a-z0-9_]+$/i.test(e);
    });

    if (this.entities.length === 0) {
      throw new Error('没有有效的实体ID');
    }

    this.config.name = config.name || this.getDefaultName();
    this.config.icon = this._validateIcon(config.icon || 'mdi:lightbulb');
    this.config.room = config.room || '未分类';
    this.config.gradient = this._validateGradient(config.gradient || 'from-amber-200 via-orange-400 to-rose-600');
  }

  getDefaultName() {
    if (this.entities.length === 1) {
      return this.entities[0].replace(/^light\./, '').replace(/_/g, ' ');
    }
    return '灯光组';
  }

  connectedCallback() {
    this.render();
    this.subscribeToUpdates();
  }

  disconnectedCallback() {
    if (this._unsub) {
      this._unsub();
    }
  }

  subscribeToUpdates() {
    // Home Assistant 2025.12+ 不需要手动订阅
    // 状态更新通过 set hass() 自动处理
    // 这个方法保留为兼容性占位符
  }

  set hass(hass) {
    this._hass = hass;

    // 更新所有灯的状态
    this.entities.forEach(entity => {
      const state = hass.states[entity];
      if (state) {
        this.hueStates.set(entity, state);
      }
    });

    this.updateCard();
  }

  get hass() {
    return this._hass;
  }

  // 获取主灯状态（用于基础显示）
  getMainState() {
    return this.hueStates.get(this.entities[0]);
  }

  // 检查是否有任何灯是开启的
  isAnyLightOn() {
    for (let state of this.hueStates.values()) {
      if (state && state.state === 'on') {
        return true;
      }
    }
    return false;
  }

  // 获取平均亮度
  getAverageBrightness() {
    let totalBrightness = 0;
    let onCount = 0;

    for (let state of this.hueStates.values()) {
      if (state && state.state === 'on' && state.attributes.brightness) {
        totalBrightness += state.attributes.brightness;
        onCount++;
      }
    }

    return onCount > 0 ? Math.round(totalBrightness / onCount) : 0;
  }

  updateCard() {
    const card = this._shadowRoot.querySelector('.ios26-card');
    if (!card) return;

    const isOn = this.isAnyLightOn();
    const brightness = this.getAverageBrightness();

    // 更新卡片状态
    if (isOn) {
      card.classList.add('active');
      card.classList.remove('inactive');
    } else {
      card.classList.remove('active');
      card.classList.add('inactive');
    }

    // 更新亮度显示
    const brightnessDisplay = this._shadowRoot.querySelector('.brightness-value');
    if (brightnessDisplay) {
      brightnessDisplay.textContent = Math.round(brightness / 255 * 100);
    }

    // 更新滑块
    const slider = this._shadowRoot.querySelector('.brightness-slider');
    if (slider) {
      slider.value = brightness;
    }

    // 更新颜色预览
    this.updateColorPreview();
  }

  updateColorPreview() {
    const state = this.getMainState();
    if (!state || state.state !== 'on') return;

    const preview = this._shadowRoot.querySelector('.color-preview');
    if (!preview) return;

    let color = '';
    if (state.attributes.rgb_color) {
      const [r, g, b] = state.attributes.rgb_color;
      color = `rgb(${r}, ${g}, ${b})`;
    } else if (state.attributes.color_temp) {
      const mireds = state.attributes.color_temp;
      // 色温转换为颜色
      const temp = 1000000 / mireds;
      color = this.colorTempToRGB(temp);
    }

    if (color) {
      preview.style.background = color;
    }
  }

  colorTempToRGB(kelvin) {
    let temp = kelvin / 100;
    let r, g, b;

    if (temp <= 66) {
      r = 255;
      g = temp;
      g = 99.4708025861 * Math.log(g) - 161.1195681661;

      if (temp <= 19) {
        b = 0;
      } else {
        b = temp - 10;
        b = 138.5177312231 * Math.log(b) - 305.0447927307;
      }
    } else {
      r = temp - 60;
      r = 329.698727446 * Math.pow(r, -0.1332047592);
      g = temp - 60;
      g = 288.1221695283 * Math.pow(g, -0.0755148492);
      b = 255;
    }

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  async toggleLight() {
    const newState = !this.isAnyLightOn();

    // 控制所有灯
    await Promise.all(this.entities.map(entity => {
      return this.callService('light', 'turn_' + (newState ? 'on' : 'off'), {
        entity_id: entity
      });
    }));
  }

  async setBrightness(brightness) {
    const brightnessPercent = Math.round(brightness / 255 * 100);

    // 只控制已开启的灯
    for (let state of this.hueStates.values()) {
      if (state && state.state === 'on') {
        await this.callService('light', 'turn_on', {
          entity_id: state.entity_id,
          brightness: brightness
        });
      }
    }
  }

  async setColorTemp(mireds) {
    for (let state of this.hueStates.values()) {
      if (state && state.state === 'on') {
        await this.callService('light', 'turn_on', {
          entity_id: state.entity_id,
          color_temp: mireds
        });
      }
    }
  }

  async setColor(rgbColor) {
    for (let state of this.hueStates.values()) {
      if (state && state.state === 'on') {
        await this.callService('light', 'turn_on', {
          entity_id: state.entity_id,
          rgb_color: rgbColor
        });
      }
    }
  }

  callService(domain, service, serviceData) {
    return this.hass.callService(domain, service, serviceData);
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    const controls = this._shadowRoot.querySelector('.expanded-controls');
    const icon = this._shadowRoot.querySelector('.expand-icon');

    if (this.isExpanded) {
      controls.style.maxHeight = controls.scrollHeight + 'px';
      controls.style.opacity = '1';
      icon.style.transform = 'rotate(180deg)';
    } else {
      controls.style.maxHeight = '0';
      controls.style.opacity = '0';
      icon.style.transform = 'rotate(0deg)';
    }
  }

  render() {
    this._shadowRoot.innerHTML = `
      <style>
        /* System font stack - avoids external CDN dependency and potential supply-chain risk */

        :host {
          display: block;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .ios26-card {
          position: relative;
          padding: 2rem;
          border-radius: 3rem;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
        }

        .ios26-card.active {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(100px);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);
        }

        .ios26-card.inactive {
          opacity: 0.4;
        }

        /* 动态光流边框 */
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
          pointer-events: none;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .card-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

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

        .status-indicator {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: white;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .ios26-card.inactive .status-indicator {
          display: none;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .device-info h3 {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
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
          margin: 0.25rem 0 0 0;
        }

        /* 展开控制区域 */
        .expanded-controls {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .brightness-control {
          margin-top: 1rem;
        }

        .brightness-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .brightness-label span {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
        }

        .brightness-value {
          font-size: 1.5rem;
          font-weight: 100;
          color: white;
        }

        .brightness-slider {
          width: 100%;
          height: 0.5rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .brightness-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s;
        }

        .brightness-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .color-controls {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .color-btn {
          flex: 1;
          padding: 0.75rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .color-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .color-btn.active {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .color-preview {
          width: 100%;
          height: 0.5rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.1);
          margin-top: 0.75rem;
          transition: background 0.5s;
        }

        .expand-icon {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* 多灯控组显示 */
        .lights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .light-item {
          padding: 0.75rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
          cursor: pointer;
        }

        .light-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .light-item.on {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
        }

        .light-item-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .light-item.on .light-item-name {
          color: white;
        }

        .light-item-status {
          font-size: 0.625rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 0.25rem;
        }
      </style>

      <div class="ios26-card inactive">
        <div class="card-content">
          <div class="card-header">
            <div class="icon-container">
              <ha-icon icon="${this._escapeHtml(this.config.icon)}"></ha-icon>
            </div>
            <div class="status-indicator"></div>
          </div>

          <div class="device-info">
            <h3>${this._escapeHtml(this.config.name)}</h3>
            <p>${this._escapeHtml(this.config.room)} · <span class="status-text">静默</span></p>
          </div>

          <div class="expanded-controls">
            <div class="brightness-control">
              <div class="brightness-label">
                <span>亮度</span>
                <span class="brightness-value">0</span>
              </div>
              <input
                type="range"
                class="brightness-slider"
                min="0"
                max="255"
                value="0"
              >
              <div class="color-preview"></div>
            </div>

            <div class="color-controls">
              <button class="color-btn" data-action="white">白光</button>
              <button class="color-btn" data-action="warm">暖光</button>
              <button class="color-btn" data-action="color">彩色</button>
            </div>

            ${this.entities.length > 1 ? `
              <div class="lights-grid">
                ${this.entities.map(entity => `
                  <div class="light-item" data-entity="${this._escapeHtml(entity)}">
                    <div class="light-item-name">${this._escapeHtml(entity.replace(/^light\./, '').replace(/_/g, ' '))}</div>
                    <div class="light-item-status">离线</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const card = this._shadowRoot.querySelector('.ios26-card');

    // 点击卡片切换开关和展开
    card.addEventListener('click', (e) => {
      // 如果点击的是滑块或按钮，不触发切换
      if (e.target.classList.contains('brightness-slider') ||
          e.target.classList.contains('color-btn') ||
          e.target.closest('.color-btn') ||
          e.target.closest('.light-item')) {
        return;
      }

      // 如果灯已开启，切换展开/收起
      if (this.isAnyLightOn()) {
        this.toggleExpand();
      } else {
        // 如果灯关闭，直接开启
        this.toggleLight();
      }
    });

    // 亮度滑块
    const slider = this._shadowRoot.querySelector('.brightness-slider');
    slider.addEventListener('input', (e) => {
      this.setBrightness(parseInt(e.target.value));
    });

    // 颜色按钮
    const colorBtns = this._shadowRoot.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleColorAction(action);

        // 更新按钮状态
        colorBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });

    // 多灯控组
    if (this.entities.length > 1) {
      const lightItems = this._shadowRoot.querySelectorAll('.light-item');
      lightItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const entity = item.dataset.entity;
          const state = this.hueStates.get(entity);

          if (state && state.state === 'on') {
            this.callService('light', 'turn_off', { entity_id: entity });
          } else {
            this.callService('light', 'turn_on', { entity_id: entity });
          }
        });
      });
    }
  }

  handleColorAction(action) {
    switch (action) {
      case 'white':
        this.setColorTemp(370); // 中性白
        break;
      case 'warm':
        this.setColorTemp(500); // 暖光
        break;
      case 'color':
        // 彩色模式 - 可以添加颜色选择器
        this.setColor([255, 100, 100]); // 默认红色
        break;
    }
  }
}

customElements.define('ios26-light-card', IOS26LightCard);
