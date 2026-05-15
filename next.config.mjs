/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // 添加编译优化选项
  swcMinify: true,
  reactStrictMode: true,
  
  webpack(config) {
    // 获取处理SVG导入的现有规则
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // 重新应用现有规则，但仅适用于以?url结尾的svg导入
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // 将所有其他*.svg导入转换为React组件
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // 排除*.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // 修改文件加载器规则以忽略*.svg，因为我们现在已经处理了它
    fileLoaderRule.exclude = /\.svg$/i

    config.externals = [...config.externals, { canvas: 'canvas' }]; // 使Konva和react-konva正常工作所必需的

    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "file.302.ai",
      },
      {
        protocol: "https",
        hostname: "file.302ai.cn",
      },
      {
        protocol: "https",
        hostname: "img.mizhoubaobei.top",
      },
    ],
    // 添加图片优化配置
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 添加编译优化
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;