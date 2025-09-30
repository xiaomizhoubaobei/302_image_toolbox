# AI图像风格迁移功能开发文档

## 1. 功能概述

### 1.1 功能名称
AI图像风格迁移 (AI Image Style Transfer)

### 1.2 功能描述
AI图像风格迁移功能允许用户将一张图片的艺术风格应用到另一张图片上，创造出具有特定艺术风格的新图像。该功能基于深度学习技术，支持多种艺术风格，包括油画、水彩、素描、卡通等，为用户提供丰富的创意表达方式。

### 1.3 目标用户
- 设计师和艺术家
- 摄影爱好者
- 社交媒体内容创作者
- 需要创意图像处理的普通用户

## 2. 功能需求

### 2.1 核心功能
1. **风格图片选择**：支持从预设风格库中选择或上传自定义风格图片
2. **内容图片上传**：支持上传需要应用风格的内容图片
3. **风格强度调节**：支持0-100%风格强度调节
4. **多种艺术风格**：提供至少15种不同的艺术风格
5. **实时预览**：支持处理过程中的实时预览
6. **参数自定义**：支持调整风格迁移的细节参数

### 2.2 用户界面需求
1. 内容图片上传区域
2. 风格图片选择器
3. 风格强度调节滑块
4. 艺术风格预览网格
5. 实时预览窗口
6. 参数调节面板
7. 处理进度显示

## 3. 技术实现方案

### 3.1 技术架构
```
前端组件层:
- StyleTransfer.tsx (主组件)
- StyleSelector.tsx (风格选择器)
- ContentUploader.tsx (内容上传器)
- StylePreview.tsx (风格预览组件)
- TransferControls.tsx (迁移控制面板)

状态管理层:
- Zustand store (扩展现有状态)
- styleTransferSlice.ts (风格迁移功能状态)

API层:
- lib/api.ts (新增风格迁移API调用)
- utils/StyleTransfer.ts (风格迁移工具)

类型定义层:
- types/index.ts (新增类型定义)
```

### 3.2 API接口设计
```typescript
// AI图像风格迁移API接口
interface StyleTransferAction {
  contentImage: string; // 内容图片Base64
  styleImage: string; // 风格图片Base64
  styleStrength: number; // 风格强度 0-100
  styleType?: 'oil_painting' | 'watercolor' | 'sketch' | 'cartoon' | 'custom';
  preserveContent: boolean; // 是否保留内容结构
  colorPreservation: boolean; // 是否保持原始颜色
  outputSize?: { width: number; height: number }; // 输出尺寸
}

interface StyleTransferResult {
  imageSrc: string;
  processingTime: number; // 处理时间(ms)
  styleApplied: string; // 应用的风格类型
  styleStrength: number; // 实际应用的风格强度
}

// 主要API函数
export async function transferStyle(action: StyleTransferAction): Promise<StyleTransferResult> {
  // 实现图像风格迁移逻辑
}
```

### 3.3 组件设计

#### 3.3.1 主组件 StyleTransfer.tsx
```tsx
import React from 'react';
import { StyleSelector } from './StyleSelector';
import { ContentUploader } from './ContentUploader';
import { StylePreview } from './StylePreview';
import { TransferControls } from './TransferControls';
import { useStyleTransferStore } from '@/stores/styleTransferSlice';

export function StyleTransfer() {
  const { 
    contentImage, 
    styleImage, 
    transferParams,
    resultImage,
    setTransferParams,
    transferStyle,
    isProcessing
  } = useStyleTransferStore();

  return (
    <div className="style-transfer-container">
      <div className="transfer-header">
        <h2>AI图像风格迁移</h2>
        <p>将艺术风格应用到您的图片上，创造独特的视觉效果</p>
      </div>
      
      <div className="transfer-content">
        <div className="transfer-sidebar">
          <ContentUploader 
            contentImage={contentImage}
            onContentUpload={(image) => {
              // 设置内容图片
            }}
          />
          
          <StyleSelector 
            selectedStyle={transferParams.styleType}
            onStyleSelect={(styleType) => setTransferParams({ 
              ...transferParams, 
              styleType 
            })}
          />
          
          <TransferControls 
            params={transferParams}
            onChange={setTransferParams}
            onTransfer={transferStyle}
            isProcessing={isProcessing}
          />
        </div>
        
        <div className="transfer-main">
          <StylePreview 
            contentImage={contentImage}
            styleImage={styleImage}
            resultImage={resultImage}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}
```

#### 3.3.2 风格选择器 StyleSelector.tsx
```tsx
import React from 'react';

interface StyleOption {
  value: 'oil_painting' | 'watercolor' | 'sketch' | 'cartoon' | 'custom';
  label: string;
  description: string;
  previewImage: string;
}

const STYLE_OPTIONS: StyleOption[] = [
  {
    value: 'oil_painting',
    label: '油画风格',
    description: '经典油画艺术效果',
    previewImage: '/styles/oil_painting.jpg'
  },
  {
    value: 'watercolor',
    label: '水彩风格',
    description: '柔和的水彩画效果',
    previewImage: '/styles/watercolor.jpg'
  },
  {
    value: 'sketch',
    label: '素描风格',
    description: '黑白素描艺术效果',
    previewImage: '/styles/sketch.jpg'
  },
  {
    value: 'cartoon',
    label: '卡通风格',
    description: '动漫卡通化效果',
    previewImage: '/styles/cartoon.jpg'
  },
  {
    value: 'custom',
    label: '自定义风格',
    description: '使用自定义图片作为风格',
    previewImage: '/styles/custom.jpg'
  }
];

interface StyleSelectorProps {
  selectedStyle: 'oil_painting' | 'watercolor' | 'sketch' | 'cartoon' | 'custom';
  onStyleSelect: (style: 'oil_painting' | 'watercolor' | 'sketch' | 'cartoon' | 'custom') => void;
}

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="style-selector">
      <h3>艺术风格</h3>
      <div className="style-options">
        {STYLE_OPTIONS.map((option) => (
          <div 
            key={option.value}
            className={`style-option ${selectedStyle === option.value ? 'selected' : ''}`}
            onClick={() => onStyleSelect(option.value)}
          >
            <div className="style-preview">
              <img src={option.previewImage} alt={option.label} />
            </div>
            <div className="style-info">
              <h4>{option.label}</h4>
              <p>{option.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {selectedStyle === 'custom' && (
        <div className="custom-style-upload">
          <h4>上传自定义风格图片</h4>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              // 处理自定义风格图片上传
            }} 
          />
        </div>
      )}
    </div>
  );
}
```

## 4. 状态管理设计

### 4.1 Zustand Store 扩展
```typescript
// stores/styleTransferSlice.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TransferParameters {
  styleStrength: number;
  preserveContent: boolean;
  colorPreservation: boolean;
  outputSize?: { width: number; height: number };
}

interface StyleTransferState {
  contentImage: string | null;
  styleImage: string | null;
  resultImage: string | null;
  transferParams: TransferParameters & {
    styleType: 'oil_painting' | 'watercolor' | 'sketch' | 'cartoon' | 'custom';
  };
  isProcessing: boolean;
  setContentImage: (image: string) => void;
  setStyleImage: (image: string) => void;
  setTransferParams: (params: any) => void;
  transferStyle: () => Promise<void>;
}

export const useStyleTransferStore = create<StyleTransferState>()(
  devtools((set, get) => ({
    contentImage: null,
    styleImage: null,
    resultImage: null,
    transferParams: {
      styleType: 'oil_painting',
      styleStrength: 70,
      preserveContent: true,
      colorPreservation: false
    },
    isProcessing: false,
    
    setContentImage: (image) => set({ contentImage: image }),
    
    setStyleImage: (image) => set({ styleImage: image }),
    
    setTransferParams: (params) => set({ transferParams: params }),
    
    transferStyle: async () => {
      const { contentImage, styleImage, transferParams } = get();
      if (!contentImage) return;
      
      set({ isProcessing: true });
      
      try {
        const result = await transferStyle({
          contentImage,
          styleImage: styleImage || '', // 如果没有自定义风格图片，使用预设风格
          ...transferParams
        });
        
        set({ 
          resultImage: result.imageSrc,
          isProcessing: false 
        });
      } catch (error) {
        set({ isProcessing: false });
        throw error;
      }
    }
  }))
);
```

## 5. UI/UX 设计

### 5.1 界面布局
```
+---------------------------------------------------------------------+
| AI图像风格迁移                                                     |
+-------------------+-------------------------------------------------+
| 控制面板          | 预览区域                                        |
|                   |                                                 |
| [内容图片上传]    | [内容图片]     [风格图片]     [结果图片]        |
|                   |                                                 |
| 艺术风格:         |                                                 |
| [油画风格]        |                                                 |
| [水彩风格]        |                                                 |
| [素描风格]        |                                                 |
| [卡通风格]        |                                                 |
| [自定义风格]      |                                                 |
|                   |                                                 |
| 风格强度: 70      |                                                 |
| [-------o----]    |                                                 |
| 保留内容结构 [√]  |                                                 |
| 保持原始颜色 [ ]  |                                                 |
|                   |                                                 |
| [开始风格迁移]    |                                                 |
+-------------------+-------------------------------------------------+
```

### 5.2 交互流程
1. 用户上传内容图片
2. 选择艺术风格或上传自定义风格图片
3. 调整风格强度和其他参数
4. 实时预览风格迁移效果
5. 点击"开始风格迁移"按钮
6. 显示处理进度
7. 展示风格迁移后的图片
8. 提供下载和继续编辑选项

## 6. 开发计划

### 6.1 第一阶段：基础框架搭建 (1周)
- [ ] 创建组件结构和文件
- [ ] 实现 Zustand 状态管理
- [ ] 设计 UI 组件
- [ ] 实现图片上传功能

### 6.2 第二阶段：核心功能开发 (2周)
- [ ] 实现预设艺术风格功能
- [ ] 实现自定义风格图片功能
- [ ] 实现风格强度调节
- [ ] 实现参数调节功能

### 6.3 第三阶段：增强功能开发 (1周)
- [ ] 添加实时预览功能
- [ ] 优化处理性能
- [ ] 添加处理进度显示

### 6.4 第四阶段：测试与优化 (1周)
- [ ] 功能测试
- [ ] 性能优化
- [ ] 用户体验优化
- [ ] 文档完善

## 7. 测试方案

### 7.1 单元测试
- 测试状态管理功能
- 测试参数验证逻辑
- 测试图像处理函数

### 7.2 集成测试
- 测试完整的风格迁移流程
- 测试不同风格的效果
- 测试边界条件处理

### 7.3 用户验收测试
- 邀请设计师测试效果
- 收集用户反馈
- 优化用户体验

## 8. 部署与维护

### 8.1 部署要求
- 确保302.AI API密钥配置正确
- 验证图像上传和处理功能
- 测试不同浏览器兼容性

### 8.2 维护计划
- 定期更新AI模型
- 监控API调用情况
- 收集用户反馈并持续优化