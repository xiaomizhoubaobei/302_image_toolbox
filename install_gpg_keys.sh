#!/bin/bash

# Install GPG if not already installed
if ! command -v gpg &> /dev/null; then
    echo "Installing GPG..."
    sudo apt-get update
    sudo apt-get install -y gnupg
fi

# Download private and public keys
PRIVATE_KEY_URL="https://mzapi-help-1329111128.cos.ap-shanghai.myqcloud.com/GPG/private_key.asc"
PUBLIC_KEY_URL="https://mzapi-help-1329111128.cos.ap-shanghai.myqcloud.com/GPG/public_key.asc"

PRIVATE_KEY_FILE="private_key.asc"
PUBLIC_KEY_FILE="public_key.asc"

# Download private key
if ! wget -O "$PRIVATE_KEY_FILE" "$PRIVATE_KEY_URL"; then
    echo "Failed to download private key"
    exit 1
fi

# Download public key
if ! wget -O "$PUBLIC_KEY_FILE" "$PUBLIC_KEY_URL"; then
    echo "Failed to download public key"
    exit 1
fi

# Import keys into GPG
if ! gpg --import "$PRIVATE_KEY_FILE"; then
    echo "Failed to import private key"
    exit 1
fi

if ! gpg --import "$PUBLIC_KEY_FILE"; then
    echo "Failed to import public key"
    exit 1
fi

echo "Keys successfully imported into GPG"

# Clean up downloaded files
rm -f "$PRIVATE_KEY_FILE" "$PUBLIC_KEY_FILE"


# 设置 GPG_TTY 环境变量
export GPG_TTY=$(tty)

# 配置 Git 使用正确的 GPG 程序路径
git config --global gpg.program $(which gpg)

# 启用 Git 自动签名
git config --global commit.gpgsign true

# 启动 GPG 代理
gpgconf --launch gpg-agent

echo "GPG 已配置完成。"
TEST_RESULT=$(echo "hello GPG" | gpg --clearsign)
echo "测试结果："
echo "$TEST_RESULT"

#赋予权限 chmod +x /workspace/install_gpg_keys.sh