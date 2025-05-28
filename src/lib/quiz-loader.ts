import { Quiz } from '@/types/quiz';

export async function getQuizById(id: string): Promise<Quiz | null> {
  try {
    const response = await fetch(`/data/quizzes/${id}.json`);
    
    if (!response.ok) {
      console.error(`Quiz ${id} not found`);
      return null;
    }
    
    const quiz: Quiz = await response.json();
    
    // 验证数据格式
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

// 可选：获取所有可用的测验 ID
export function getAvailableQuizIds(): string[] {
  // 这里手动维护可用的 ID 列表，也可以通过 API 动态获取
  return ['1', '2', '3'];
} 