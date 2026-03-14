# 🐍 Snake Game - 贪吃蛇游戏

一个使用 HTML5 Canvas 和 JavaScript 编写的经典贪吃蛇游戏。

## 游戏特性

- ✅ 流畅的蛇身移动动画
- ✅ 方向键或 WASD 控制
- ✅ 实时分数和最高分记录
- ✅ 暂停/继续功能
- ✅ 游戏结束检测
- ✅ 精美的视觉效果（渐变、发光、眼睛动画）
- ✅ 响应式设计，支持移动端

## 文件结构

```
snake-game/
├── index.html      # 游戏主页面
├── style.css       # 样式文件
├── game.js         # 游戏逻辑
├── vercel.json     # Vercel 部署配置
└── README.md       # 说明文档
```

## 本地运行

### 方式1: 直接打开
用浏览器直接打开 `index.html` 文件

### 方式2: 本地服务器
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve

# 然后访问 http://localhost:8080
```

## 部署到 Vercel

### 方式1: GitHub + Vercel (推荐)

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create snake-game --public --push
   ```

2. **在 Vercel 导入**
   - 访问 https://vercel.com/new
   - 登录并选择 GitHub 账号
   - 导入 `snake-game` 仓库
   - 点击 Deploy，自动完成部署

### 方式2: Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   vercel --prod
   ```

### 方式3: Vercel Dashboard 手动上传

1. 访问 https://vercel.com/new
2. 选择 "Upload" 选项
3. 拖放项目文件夹或选择压缩包
4. 点击 Deploy

## 游戏控制

| 按键 | 功能 |
|------|------|
| ↑ / W | 向上移动 |
| ↓ / S | 向下移动 |
| ← / A | 向左移动 |
| → / D | 向右移动 |
| 空格 | 暂停/继续 |

## 技术栈

- HTML5 Canvas
- CSS3 (渐变、动画、响应式)
- 原生 JavaScript (ES6+)

## 自定义配置

### 修改游戏速度
编辑 `game.js`:
```javascript
const GAME_SPEED = 100; // 毫秒，数值越小速度越快
```

### 修改画布大小
编辑 `game.js`:
```javascript
const CANVAS_SIZE = 400; // 画布大小
const GRID_SIZE = 20;    // 网格数量
```

## License

MIT License
