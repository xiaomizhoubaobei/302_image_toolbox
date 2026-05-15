FROM node:lts@sha256:050bf2bbe33c1d6754e060bec89378a79ed831f04a7bb1a53fe45e997df7b3bb AS build

WORKDIR /app

COPY package.json package-lock.json ./

# Install necessary packages for build
RUN apk add --no-cache \
  g++ \
  make \
  python3

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

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "server.js"]