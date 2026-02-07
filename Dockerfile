# -------- 构建阶段 --------
FROM node:20-alpine AS build

WORKDIR /app

# 安装原生模块 (sharp) 的依赖
RUN apk add --no-cache \
  g++ \
  make \
  python3 \
  vips-dev

# 复制包文件
COPY package.json yarn.lock ./

# 使用 yarn 安装依赖
RUN yarn install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用程序
RUN yarn build

# -------- 生产镜像设置 --------
FROM node:20-alpine AS production

ENV NODE_ENV=production \
  NODE_OPTIONS="--max-old-space-size=2048"

WORKDIR /app

# 安装 sharp 的运行时依赖
RUN apk add --no-cache \
  vips

# 复制包文件
COPY package.json yarn.lock ./

# 仅安装生产依赖
RUN yarn install --frozen-lockfile --production

# 从构建阶段复制构建产物
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# 创建非 root 用户以提高安全性
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]