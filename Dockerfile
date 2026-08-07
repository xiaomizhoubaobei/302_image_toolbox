FROM node:lts@sha256:8530f76a96d88820d288761f022e318970dda93d01536919fbc16076b7983e63 AS build

WORKDIR /app

COPY package.json yarn.lock ./

# Install necessary packages for build
RUN apt-get update && apt-get install -y --no-install-recommends \
  g++ \
  make \
  python3 \
  && rm -rf /var/lib/apt/lists/*

# 配置 yarn 华为云镜像源
RUN yarn config set registry https://repo.huaweicloud.com/repository/npm/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# -------- Production Image Setup --------
FROM node:lts@sha256:8530f76a96d88820d288761f022e318970dda93d01536919fbc16076b7983e63 AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

# 配置 yarn 华为云镜像源
RUN yarn config set registry https://repo.huaweicloud.com/repository/npm/

RUN yarn install --production

EXPOSE 3000

CMD ["node", "server.js"]
