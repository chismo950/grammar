# JSON-Based Quiz System

## 概述

这个系统现在使用JSON文件来存储测验数据，实现了数据与代码的分离，使得管理和扩展变得更加容易。

## 文件结构

```
project/
├── public/
│   └── data/
│       └── quizzes/
│           ├── 1.json       # Quiz 1 数据
│           ├── 2.json       # Quiz 2 数据
│           ├── 3.json       # Quiz 3 数据
│           └── ...          # 更多测验
├── src/
│   ├── app/
│   │   └── quizzes/
│   │       └── [id]/
│   │           └── page.tsx # 动态路由页面
│   ├── types/
│   │   └── quiz.ts         # 类型定义
│   └── lib/
│       └── quiz-loader.ts  # 数据加载器
```

## 如何添加新的测验

### 1. 创建JSON数据文件

在 `public/data/quizzes/` 目录下创建新的JSON文件，文件名为 `{id}.json`：

```json
[
  {
    "q": "问题文本",
    "opts": ["A. 选项1", "B. 选项2", "C. 选项3", "D. 选项4"],
    "ans": 1,
    "expl": [
      "A. 选项1 - 解释为什么错误",
      "B. 选项2 - 解释为什么正确",
      "C. 选项3 - 解释为什么错误",
      "D. 选项4 - 解释为什么错误"
    ]
  }
]
```

### 2. 字段说明

- `q`: 问题文本
- `opts`: 4个选项的数组
- `ans`: 正确答案的索引（0-3）
- `expl`: 每个选项的解释数组

### 3. 访问测验

测验将自动可通过URL访问：`/quizzes/test-{id}`

例如：
- `4.json` → `/quizzes/test-4`
- `advanced.json` → `/quizzes/test-advanced`

## 优势

1. **数据与代码分离**: 编辑测验数据不需要修改代码
2. **按需加载**: 只加载当前需要的测验数据
3. **类型安全**: 完整的TypeScript支持
4. **易于管理**: 每套题目独立文件
5. **简单映射**: ID直接对应文件名
6. **错误处理**: 优雅处理文件不存在的情况

## 技术实现

### 类型定义 (`src/types/quiz.ts`)
```typescript
export interface Question {
  q: string;
  opts: string[];
  ans: number;
  expl: string[];
}

export type Quiz = Question[];
```

### 数据加载器 (`src/lib/quiz-loader.ts`)
```typescript
export async function getQuizById(id: string): Promise<Quiz | null> {
  try {
    const response = await fetch(`/data/quizzes/${id}.json`);
    
    if (!response.ok) {
      console.error(`Quiz ${id} not found`);
      return null;
    }
    
    const quiz: Quiz = await response.json();
    
    if (!Array.isArray(quiz)) {
      console.error(`Invalid quiz format for ${id}`);
      return null;
    }
    
    return quiz;
  } catch (error) {
    console.error(`Failed to load quiz ${id}:`, error);
    return null;
  }
}
```

### 动态路由页面 (`src/app/quizzes/test-[id]/page.tsx`)
- 支持动态ID参数
- 异步加载JSON数据
- 完整的加载和错误状态处理
- 基于ID的localStorage键名

## 更新quiz-loader.ts中的可用ID

当添加新测验时，更新 `getAvailableQuizIds()` 函数：

```typescript
export function getAvailableQuizIds(): string[] {
  return ['1', '2', '3', '4', 'advanced']; // 添加新的ID
}
```

## 特性

- ✅ 支持浅色/深色主题
- ✅ 答案自动保存到localStorage  
- ✅ 即时反馈和解释
- ✅ 分数计算
- ✅ 响应式设计
- ✅ 加载状态和错误处理 