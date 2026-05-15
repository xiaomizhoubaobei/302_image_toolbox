FROM node:lts@sha256:050bf2bbe33c1d6754e060bec89378a79ed831f04a7bb1a53fe45e997df7b3bb AS build

WORKDIR /app

COPY package.json package-lock.json ./

# Install necessary packages for build
RUN apt-get update && apt-get install -y --no-install-recommends \
  g++ \
  make \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# 配置 npm 国内镜像源并设置超时/重试
RUN npm config set registry https://registry.npmmirror.com \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

RUN npm install

COPY . .

RUN npm run build

# -------- Production Image Setup --------
FROM node:lts@sha256:050bf2bbe33c1d6754e060bec89378a79ed831f04a7bb1a53fe45e997df7b3bb AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

# 配置 npm 国内镜像源并设置超时/重试
RUN npm config set registry https://registry.npmmirror.com \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "server.js"]