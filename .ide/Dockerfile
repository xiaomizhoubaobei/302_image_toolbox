# 使用最新版 Node.js 官方镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 全局安装 Hexo
RUN npm install -g hexo-cli

# 初始化 Hexo 项目
RUN hexo init .

# 安装依赖
RUN npm install

# 暴露 Hexo 默认端口
EXPOSE 4000

# 启动 Hexo 服务器
CMD ["hexo", "server"]