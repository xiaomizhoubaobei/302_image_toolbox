# Docker 镜像构建与签名指南

本文档介绍了如何使用 GitHub Actions 自动构建 Docker 镜像并使用 Cosign 进行签名。

## 工作流概述

新的 GitHub Actions 工作流 [build-and-sign.yml](../.github/workflows/build-and-sign.yml) 实现了以下功能：

1. 在针对 `main` 分支的 Pull Request 合并时自动触发
   - 从 package.json 中获取版本号
   - 构建多架构 Docker 镜像 (linux/amd64, linux/arm64)
   - 将镜像推送到 Docker Hub 和 GitHub Container Registry (GHCR)
   - 使用 Cosign 对镜像进行无密钥签名
   - 从 PR 信息中获取更新内容，创建 GitHub Release（正式发布）
   - 上传签名证据文件作为 Release 资产

2. 在创建 Git 标签时自动触发
   - 从 package.json 中获取版本号
   - 构建并推送 Docker 镜像到 Docker Hub 和 GitHub Container Registry
   - 使用 Cosign 对镜像进行无密钥签名
   - 创建 GitHub Release（正式发布）并包含签名验证信息
   - 上传签名证据文件作为 Release 资产

## 触发条件

- 当针对 `main` 分支的 Pull Request 被合并时
- 当创建以 `v` 开头的 Git 标签时（如 v1.0.0, v2.1.3）

## 签名方式

本工作流使用 Cosign 的无密钥签名（keyless signing）功能，它利用 GitHub OIDC 令牌进行签名，无需管理私钥。

## 配置要求

工作流需要以下 GitHub 仓库权限：

1. `contents: write` - 创建 GitHub Release
2. `packages: write` - 推送镜像到 GHCR
3. `id-token: write` - 获取 GitHub OIDC 令牌用于签名

此外，还需要在仓库的 Secrets 中配置以下环境变量：

1. `DOCKERHUB_USERNAME` - Docker Hub 用户名
2. `DOCKERHUB_TOKEN` - Docker Hub 访问令牌

## 镜像标签规则

构建的镜像将根据以下规则打标签：

- 对于分支：`USERNAME/302_image_toolbox:BRANCH` 和 `ghcr.io/OWNER/REPO:BRANCH`
- 对于 PR：`USERNAME/302_image_toolbox:pr-PR_NUMBER` 和 `ghcr.io/OWNER/REPO:pr-PR_NUMBER`
- 对于语义化版本标签（如 v1.0.0）：`USERNAME/302_image_toolbox:1.0.0` 和 `ghcr.io/OWNER/REPO:1.0.0`
- 对于提交：`USERNAME/302_image_toolbox:sha-COMMIT_SHA` 和 `ghcr.io/OWNER/REPO:sha-COMMIT_SHA`
- 对于 package.json 中的版本：`USERNAME/302_image_toolbox:0.1.0` 和 `ghcr.io/OWNER/REPO:0.1.0`

## Release 内容来源

Release 的标题和内容将根据触发事件自动获取：

- PR 合并时：从 PR 信息中获取标题和内容
- Git 标签推送时：使用版本号作为标题，包含版本信息和 Docker 镜像详情

## 验证签名

用户可以使用 Cosign 验证镜像签名：

对于 PR 合并构建的镜像：
```bash
cosign verify USERNAME/302_image_toolbox:TAG \
  --certificate-identity https://github.com/YOUR_ORG/YOUR_REPO/.github/workflows/build-and-sign.yml@refs/heads/main \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

对于 Release 版本，使用以下命令：
```bash
cosign verify USERNAME/302_image_toolbox:TAG \
  --certificate-identity https://github.com/YOUR_ORG/YOUR_REPO/.github/workflows/build-and-sign.yml@refs/tags/TAG \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

## Release 中的签名证据

当 PR 合并或 Git 标签推送时，会自动生成签名证据文件并作为 Release 资产上传。这些文件包含：

1. 镜像名称和摘要
2. 签名时间
3. 工作流信息
4. 签名者身份信息
5. 相关的 PR 或版本信息
6. package.json 中的版本号

## 故障排除

如果工作流失败，请检查：

1. 确保 Docker Hub 凭据已正确配置在仓库 Secrets 中
2. 确保仓库有写入 GHCR 的权限
3. 检查 Dockerfile 是否正确配置
4. 确认 GitHub Actions runner 有足够资源构建镜像