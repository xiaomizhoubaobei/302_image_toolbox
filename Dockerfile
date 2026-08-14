FROM node:lts@sha256:934240a162082fd8b8a2f90cd5114446443f1eba1c5378f6687167ca405e6584 AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

# Install necessary packages for build
RUN apt-get update && apt-get install -y --no-install-recommends \
  g++ \
  make \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# 安装 pnpm（依赖 .npmrc 中的华为云镜像源）
RUN npm install -g pnpm@9.15.9

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# -------- Production Image Setup --------
FROM node:lts@sha256:934240a162082fd8b8a2f90cd5114446443f1eba1c5378f6687167ca405e6584 AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/.npmrc ./
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

# 安装 pnpm（依赖 .npmrc 中的华为云镜像源）
RUN npm install -g pnpm@9.15.9

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

CMD ["node", "server.js"]
