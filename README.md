# 运动会加油稿生成器

## 部署

#### 1. 安装依赖

```bash
pip install -r requirements.txt
```

#### 2. 运行
    
```bash
uvicorn server:app --port 5679
```

如需修改端口，在修改此处 `--port` 参数的同时应修改 `index.html` 底部的 `<script>` 标签中第一行的 `port` 常量，定义为与此处相同的端口号。

```javascript
const port = /* 端口号 */;
```