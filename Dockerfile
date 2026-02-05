# 基础镜像
FROM --platform=$BUILDPLATFORM node:lts AS base

LABEL org.opencontainers.image.source=https://github.com/xiaomizhoubaobei/image_toolbox
LABEL org.opencontainers.image.description="LLM Playground - 一个用于测试和实验大语言模型的交互式平台"
LABEL org.opencontainers.image.licenses=AGPL-3.0
LABEL org.opencontainers.image.title="LLM Playground"
LABEL org.opencontainers.image.maintainer="祁筱欣"
LABEL org.opencontainers.image.version="0.0.1"
LABEL org.opencontainers.image.created=${BUILD_DATE:-2025-12-30}
LABEL org.opencontainers.image.revision=${VCS_REF:-latest}
LABEL org.opencontainers.image.vendor=xiaomizhoubaobei
LABEL org.opencontainers.image.authors=qixiaoxin@stu.sqxy.edu.cn
LABEL build.url=https://github.com/xiaomizhoubaobei/image_toolbox/actions/runs/${RUN_ID}
LABEL dependencies.node=${NODE_VERSION:-lts}
LABEL org.opencontainers.image.nextjs=${NEXTJS_VERSION:-latest}
LABEL org.opencontainers.image.yarn=${YARN_VERSION:-stable}
LABEL org.opencontainers.image.typescript=${TYPESCRIPT_VERSION:-latest}
LABEL org.opencontainers.image.provenance=enabled

# 使用官方脚本安装yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# 安装依赖
FROM base AS deps
WORKDIR /app

# 复制依赖文件
COPY package.json yarn.lock ./

# 使用 yarn 安装依赖
RUN yarn install --frozen-lockfile

# 构建阶段
FROM base AS builder
WORKDIR /app

# 复制依赖和源代码
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 使用 yarn 构建应用程序
RUN yarn build

# 生产环境镜像
FROM base AS runner
WORKDIR /app

# 创建非root用户
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs --home-dir /home/nextjs nextjs
RUN mkdir -p /home/nextjs && chown nextjs:nodejs /home/nextjs

# 复制公共资源（如果存在）
COPY --from=builder --chown=nextjs:nodejs /app/public ./

# 设置预渲染缓存权限
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT=3000


# 启动命令（standalone模式）
CMD ["node", "server.js"]