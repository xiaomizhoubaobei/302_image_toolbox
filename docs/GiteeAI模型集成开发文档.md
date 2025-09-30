# GiteeAI模型集成开发文档

## 1. 功能概述

### 1.1 功能名称
GiteeAI模型集成 (Gitee AI Model Integration)

### 1.2 功能描述
GiteeAI模型集成功能旨在将Gitee AI平台的多种AI图像处理模型集成到302.AI图片工具箱中，为用户提供丰富多样的AI图像处理选项。Gitee AI平台提供了包括文生图、图像编辑等多种功能，支持多种模型如Kolors、Stable Diffusion 3 Medium等。

### 1.3 目标用户
- 需要多样化图像处理功能的用户
- 对Gitee AI模型有特定需求的设计师和内容创作者
- 希望在统一平台使用多种AI模型的开发者

## 2. 功能需求

### 2.1 核心功能
1. **文生图功能**：支持通过文本描述生成图像，支持Kolors、Stable Diffusion 3 Medium等模型
2. **参数配置**：支持图像分辨率、生成数量等参数配置
3. **反向提示词**：支持negative_prompt参数，排除不希望出现的内容
4. **智能改写**：支持prompt智能改写功能
5. **水印添加**：支持添加水印标识

### 2.2 用户界面需求
1. 模型选择下拉菜单
2. 图像参数配置控件（分辨率、生成数量等）
3. 文本输入框（提示词、反向提示词）
4. 图像上传区域
5. 预览区域

## 3. 技术实现方案

### 3.1 技术架构
```
前端组件层:
- GiteeAIModelSelector.tsx (模型选择组件)
- GiteeAIControls.tsx (参数控制面板)
- GiteeAIImageGenerator.tsx (图像生成主组件)

状态管理层:
- Zustand store (扩展全局状态)
- giteeAISlice.ts (GiteeAI功能状态)

API层:
- lib/api.ts (新增GiteeAI API调用)
- utils/GiteeAI.ts (GiteeAI工具函数)

类型定义层:
- types/index.ts (新增类型定义)
```

### 3.2 API接口设计
```typescript
// GiteeAI通用API接口
interface GiteeAIAction {
  prompt?: string;
  negativePrompt?: string;
  model: string; // 模型名称
  size?: string; // 图像分辨率
  n?: number; // 生成图片数量
  promptExtend?: boolean; // 是否开启prompt智能改写
  watermark?: boolean; // 是否添加水印
  seed?: number; // 随机数种子
  numInferenceSteps?: number; // 推理步数
  guidanceScale?: number; // 指导尺度
  // 其他特定模型参数
  [key: string]: any;
}

interface GiteeAIResult {
  imageUrls: string[]; // 生成的图像URL列表
  taskId?: string; // 任务ID
  processingTime?: number; // 处理时间(ms)
  actualPrompt?: string; // 实际使用的提示词（开启智能改写时）
  [key: string]: any; // 其他特定模型返回数据
}

// 主要API函数
export async function giteeAIGenerateImage(action: GiteeAIAction): Promise<GiteeAIResult> {
  // 实现GiteeAI图像生成逻辑
}

// 任务状态查询API
interface GiteeAITaskStatus {
  taskId: string;
  taskStatus: 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'CANCELED' | 'UNKNOWN';
  results?: Array<{ url: string }>;
  [key: string]: any; // 其他特定模型返回数据
}

export async function getGiteeAITaskStatus(taskId: string): Promise<GiteeAITaskStatus> {
  // 查询GiteeAI任务状态
}
```

### 3.3 组件设计

#### 3.3.1 模型选择组件 GiteeAIModelSelector.tsx
```tsx
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GiteeAIModelSelectorProps {
  value: string;
  onChange: (model: string) => void;
}

export function GiteeAIModelSelector({ value, onChange }: GiteeAIModelSelectorProps) {
  const models = [
    // 文生图模型
    { name: 'Kolors', value: 'Kolors' },
    { name: 'Stable Diffusion 3 Medium', value: 'stable-diffusion-3-medium' },
    { name: 'Stable Diffusion 2.1', value: 'stable-diffusion-2-1' },
  ];

  return (
    <div className="giteeai-model-selector">
      <label>选择模型</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="选择GiteeAI模型" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

#### 3.3.2 参数控制面板 GiteeAIControls.tsx
```tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { GiteeAIModelSelector } from './GiteeAIModelSelector';

interface GiteeAIParams {
  model: string;
  size: string;
  n: number;
  prompt: string;
  negativePrompt: string;
  promptExtend: boolean;
  watermark: boolean;
  numInferenceSteps?: number;
  guidanceScale?: number;
}

interface GiteeAIControlsProps {
  params: GiteeAIParams;
  onChange: (params: GiteeAIParams) => void;
}

export function GiteeAIControls({ params, onChange }: GiteeAIControlsProps) {
  const sizeOptions = [
    '512x512', '768x768', '1024x1024', '1280x1280', '1536x1536', '2048x2048',
    '1024x768', '2048x1536', '768x1024', '1536x2048', '1024x576', '2048x1152', '576x1024', '1152x2048'
  ];

  return (
    <div className="giteeai-controls">
      <h3>GiteeAI参数设置</h3>
      
      <GiteeAIModelSelector 
        value={params.model} 
        onChange={(model) => onChange({ ...params, model })} 
      />
      
      <div className="control-group">
        <Label>提示词</Label>
        <Textarea
          value={params.prompt}
          onChange={(e) => onChange({ ...params, prompt: e.target.value })}
          placeholder="输入提示词"
        />
      </div>
      
      <div className="control-group">
        <Label>反向提示词</Label>
        <Textarea
          value={params.negativePrompt}
          onChange={(e) => onChange({ ...params, negativePrompt: e.target.value })}
          placeholder="输入不希望出现的内容"
        />
      </div>
      
      <div className="control-group">
        <Label>图像分辨率</Label>
        <select
          value={params.size}
          onChange={(e) => onChange({ ...params, size: e.target.value })}
          className="w-full p-2 border rounded"
        >
          {sizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      
      <div className="control-group">
        <Label>生成数量: {params.n}</Label>
        <Slider
          value={[params.n]}
          min={1}
          max={4}
          step={1}
          onValueChange={([n]) => onChange({ ...params, n })}
        />
      </div>
      
      <div className="control-group">
        <Label>推理步数: {params.numInferenceSteps || 25}</Label>
        <Slider
          value={[params.numInferenceSteps || 25]}
          min={10}
          max={50}
          step={1}
          onValueChange={([numInferenceSteps]) => onChange({ ...params, numInferenceSteps })}
        />
      </div>
      
      <div className="control-group">
        <Label>指导尺度: {params.guidanceScale || 7.5}</Label>
        <Slider
          value={[params.guidanceScale || 7.5]}
          min={1}
          max={20}
          step={0.1}
          onValueChange={([guidanceScale]) => onChange({ ...params, guidanceScale })}
        />
      </div>
      
      <div className="control-group flex items-center justify-between">
        <Label>智能改写</Label>
        <Switch
          checked={params.promptExtend}
          onCheckedChange={(checked) => onChange({ ...params, promptExtend: checked })}
        />
      </div>
      
      <div className="control-group flex items-center justify-between">
        <Label>添加水印</Label>
        <Switch
          checked={params.watermark}
          onCheckedChange={(checked) => onChange({ ...params, watermark: checked })}
        />
      </div>
    </div>
  );
}
```

## 4. 状态管理设计

### 4.1 Zustand Store 扩展
```typescript
// stores/giteeAISlice.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GiteeAIParams {
  model: string;
  size: string;
  n: number;
  prompt: string;
  negativePrompt: string;
  promptExtend: boolean;
  watermark: boolean;
  numInferenceSteps?: number;
  guidanceScale?: number;
  // 特定模型参数
  [key: string]: any;
}

interface GiteeAIState {
  prompt: string;
  giteeAIParams: GiteeAIParams;
  isGenerating: boolean;
  generatedImages: string[];
  taskId: string | null;
  setPrompt: (prompt: string) => void;
  setGiteeAIParams: (params: GiteeAIParams) => void;
  generateImage: () => Promise<void>;
  checkTaskStatus: () => Promise<void>;
}

export const useGiteeAIStore = create<GiteeAIState>()(
  devtools((set, get) => ({
    prompt: '',
    giteeAIParams: {
      model: 'Kolors',
      size: '1024x1024',
      n: 1,
      prompt: '',
      negativePrompt: '',
      promptExtend: false,
      watermark: false,
      numInferenceSteps: 25,
      guidanceScale: 7.5,
    },
    isGenerating: false,
    generatedImages: [],
    taskId: null,
    
    setPrompt: (prompt) => set({ prompt }),
    
    setGiteeAIParams: (params) => set({ giteeAIParams: params }),
    
    generateImage: async () => {
      const { prompt, giteeAIParams } = get();
      if (!prompt) return;
      
      set({ isGenerating: true });
      
      try {
        const result = await giteeAIGenerateImage({
          prompt,
          ...giteeAIParams
        });
        
        set({ 
          taskId: result.taskId || null,
          isGenerating: false 
        });
        
        // 如果有任务ID，开始轮询任务状态
        if (result.taskId) {
          const checkStatus = async () => {
            const status = await getGiteeAITaskStatus(result.taskId!);
            if (status.taskStatus === 'SUCCEEDED' && status.results) {
              const imageUrls = status.results.map(r => r.url);
              set({ generatedImages: imageUrls });
            } else if (status.taskStatus === 'FAILED') {
              throw new Error('图像生成失败');
            } else {
              // 继续轮询
              setTimeout(checkStatus, 5000);
            }
          };
          
          setTimeout(checkStatus, 5000);
        } else if (result.imageUrls) {
          // 如果直接返回了图像URLs
          set({ generatedImages: result.imageUrls });
        }
      } catch (error) {
        set({ isGenerating: false });
        throw error;
      }
    },
    
    checkTaskStatus: async () => {
      const { taskId } = get();
      if (!taskId) return;
      
      try {
        const status = await getGiteeAITaskStatus(taskId);
        if (status.taskStatus === 'SUCCEEDED' && status.results) {
          const imageUrls = status.results.map(r => r.url);
          set({ generatedImages: imageUrls });
        }
      } catch (error) {
        throw error;
      }
    }
  }))
);
```

## 5. UI/UX 设计

### 5.1 界面布局
```
+-----------------------------------------------------+
| GiteeAI图像处理                                     |
+----------------------+-----------------------------+
| 控制面板             | 预览区域                    |
|                      |                             |
| [选择模型 ▼]         | [提示词输入框]              |
| [分辨率: 1024x1024]  |                             |
| [生成数量: 1 ----o]  | [生成按钮]                  |
| [反向提示词输入框]   |                             |
| [√] 智能改写         | [生成中的图像占位符]        |
| [ ] 添加水印         |                             |
| [推理步数: 25 ----o] |                             |
| [指导尺度: 7.5 ----o]|                             |
|                      |                             |
+----------------------+-----------------------------+
```

### 5.2 交互流程
1. 用户选择GiteeAI模型
2. 用户输入提示词和反向提示词
3. 用户调整参数设置
4. 点击"生成图像"按钮
5. 显示任务提交状态和轮询进度
6. 任务完成后展示生成的图像
7. 提供下载和继续编辑选项

## 6. 开发计划

### 6.1 第一阶段：基础框架搭建 (1周)
- [ ] 创建组件结构和文件
- [ ] 实现 Zustand 状态管理
- [ ] 设计 UI 组件
- [ ] 实现基础 API 调用

### 6.2 第二阶段：核心功能开发 (2周)
- [ ] 实现文生图功能
- [ ] 实现任务状态轮询机制
- [ ] 实现参数配置功能
- [ ] 添加错误处理机制

### 6.3 第三阶段：增强功能开发 (1周)
- [ ] 实现反向提示词功能
- [ ] 添加智能改写选项
- [ ] 实现水印功能
- [ ] 优化用户界面

### 6.4 第四阶段：测试与优化 (1周)
- [ ] 功能测试
- [ ] 性能优化
- [ ] 用户体验优化
- [ ] 文档完善

## 7. 测试方案

### 7.1 单元测试
- 测试状态管理功能
- 测试参数验证逻辑
- 测试API调用函数

### 7.2 集成测试
- 测试完整的图像生成流程
- 测试不同模型的兼容性
- 测试边界条件处理

### 7.3 用户验收测试
- 邀请用户测试生成效果
- 收集用户反馈
- 优化用户体验

## 8. 部署与维护

### 8.1 部署要求
- 确保Gitee AI API密钥配置正确
- 验证图像生成和下载功能
- 测试不同浏览器兼容性

### 8.2 维护计划
- 定期更新支持的模型列表
- 监控API调用情况
- 收集用户反馈并持续优化

## 9. 风险评估与应对

### 9.1 技术风险
- **API稳定性**: 依赖Gitee AI API可能存在不稳定因素
  - 应对措施: 实现错误重试机制和降级方案

- **处理性能问题**: 图像生成可能需要较长时间
  - 应对措施: 实现进度指示和后台处理能力

### 9.2 用户体验风险
- **生成时间过长**: AI处理可能需要数分钟
  - 应对措施: 提供进度指示和任务状态查询

## 10. GiteeAI API集成细节

### 10.1 认证方式
GiteeAI API使用API Key进行身份认证，需要在请求头中添加:
```
Authorization: Bearer YOUR_API_KEY
```

### 10.2 请求地址
- 图像生成: `https://ai.gitee.com/v1/images/generations`

### 10.3 任务状态查询
任务创建后需要通过任务ID轮询查询状态:
- 查询任务状态: `https://ai.gitee.com/v1/tasks/{task_id}`

### 10.4 支持的模型
1. `Kolors` - 快手开发的文生图模型，支持中文文字生成
2. `stable-diffusion-3-medium` - Stability AI开发的文生图模型
3. `stable-diffusion-2-1` - Stability AI开发的文生图模型