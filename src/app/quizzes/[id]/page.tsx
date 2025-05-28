'use client';
import { useState, useEffect, FormEvent } from 'react';
import { Quiz } from '@/types/quiz';
import { getQuizById } from '@/lib/quiz-loader';

interface PageProps {
  params: { id: string };
}

export default function GrammarQuizPage({ params }: PageProps) {
  const [quiz, setQuiz] = useState<Quiz>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        setError(null);
        
        const quizData = await getQuizById(params.id);
        
        if (quizData && quizData.length > 0) {
          setQuiz(quizData);
        } else {
          setError(`Quiz ${params.id} not found or empty`);
        }
      } catch (err) {
        setError('Failed to load quiz');
        console.error('Error loading quiz:', err);
      } finally {
        setLoading(false);
      }
    }

    loadQuiz();
  }, [params.id]);

  useEffect(() => {
    if (!isMounted) return;
    
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeMediaQuery.addEventListener('change', handleThemeChange);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const saved = localStorage.getItem(`grammar_quiz_answers_${params.id}`);
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    }
  }, [params.id, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(`grammar_quiz_answers_${params.id}`, JSON.stringify(answers));
    }
  }, [answers, params.id, isMounted]);

  const handleChange = (index: number, value: number) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const score = submitted ? quiz.reduce((sum, q, i) => sum + (answers[i] === q.ans ? 1 : 0), 0) : 0;

  if (!isMounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="container light-mode">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div>Loading Quiz {params.id}...</div>
        </div>
        <style jsx>{`
          .container {
            max-width: 650px;
            margin: 32px auto;
            padding: 24px 20px 32px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(40,60,90,0.08);
            background: #fff;
            color: #333;
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container light-mode">
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} style={{ 
            padding: '10px 20px', 
            backgroundColor: '#4066c7', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}>
            Retry
          </button>
        </div>
        <style jsx>{`
          .container {
            max-width: 650px;
            margin: 32px auto;
            padding: 24px 20px 32px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(40,60,90,0.08);
            background: #fff;
            color: #333;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'} ${submitted ? 'selectable' : ''}`}>
      <h1>English Grammar Quiz {params.id}</h1>
      <form onSubmit={handleSubmit} noValidate>
        {quiz.map((item, i) => {
          const selected = answers[i];
          return (
            <div key={i} className="question">
              <strong>{item.q}</strong>
              <div className="options">
                {item.opts.map((opt, j) => (
                  <label
                    key={j}
                    className={
                      submitted 
                        ? j === item.ans
                          ? 'selected-correct' 
                          : selected === j 
                            ? 'selected-incorrect'
                            : ''
                        : ''
                    }
                  >
                    <input
                      type="radio"
                      name={`q${i}`}
                      checked={selected === j}
                      onChange={() => handleChange(i, j)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {submitted && (
                <div className="explanation">
                  <b>Explanation:</b> {item.expl}
                </div>
              )}
            </div>
          );
        })}
        <button type="submit">Submit Answers</button>
      </form>
      {submitted && (
        <div className="score-summary">
          Your Score: {score} / {quiz.length}
          <button type="button" onClick={handleReset} className="reset-button">
            Reset Quiz
          </button>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 650px;
          margin: 32px auto;
          padding: 24px 20px 32px;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(40,60,90,0.08);
          user-select: none;
        }
        
        .container.selectable {
          user-select: text;
        }
        
        .light-mode {
          background: #fff;
          color: #333;
        }
        
        .dark-mode {
          background: #222;
          color: #f0f0f0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        h1 {
          text-align: center;
          margin-bottom: 22px;
          letter-spacing: 0.02em;
          font-size: 1.7em;
        }
        
        .light-mode h1 {
          color: #37517e;
        }
        
        .dark-mode h1 {
          color: #7e9dd3;
        }
        
        .question {
          margin-bottom: 18px;
          padding-bottom: 10px;
        }
        
        .light-mode .question {
          border-bottom: 1px solid #eee;
        }
        
        .dark-mode .question {
          border-bottom: 1px solid #444;
        }
        
        .options label {
          display: block;
          margin: 6px 0 0 16px;
          cursor: pointer;
          font-size: 1em;
          border-radius: 8px;
          transition: background 0.2s;
          padding: 2px 4px;
        }
        
        .dark-mode .options label {
          color: #e0e0e0;
        }
        
        .selected-correct {
          font-weight: bold;
        }
        
        .light-mode .selected-correct {
          color: #249a46;
          background: #e8fbe8;
        }
        
        .dark-mode .selected-correct {
          color: #5acd78;
          background: #144423;
        }
        
        .selected-incorrect {
          font-weight: bold;
        }
        
        .light-mode .selected-incorrect {
          color: #e14242;
          background: #fff1f1;
        }
        
        .dark-mode .selected-incorrect {
          color: #ff7b7b;
          background: #441414;
        }
        
        button {
          display: block;
          margin: 30px auto 0;
          padding: 12px 36px;
          font-size: 1.06em;
          border: none;
          border-radius: 24px;
          cursor: pointer;
          transition: background 0.15s;
        }
        
        .light-mode button {
          background: #4066c7;
          color: #fff;
          box-shadow: 0 2px 8px rgba(80,100,200,0.07);
        }
        
        .dark-mode button {
          background: #4e7ae0;
          color: #fff;
          box-shadow: 0 2px 8px rgba(30,50,100,0.15);
        }
        
        .light-mode button:hover {
          background: #284fa5;
        }
        
        .dark-mode button:hover {
          background: #3a66c0;
        }
        
        .explanation {
          margin-top: 7px;
          font-size: 0.98em;
          border-radius: 6px;
          padding: 8px 12px 6px;
        }
        
        .light-mode .explanation {
          color: #4066c7;
          background: #f7f8fa;
        }
        
        .dark-mode .explanation {
          color: #7e9dd3;
          background: #1e2333;
        }
        
        .score-summary {
          text-align: center;
          margin: 30px 0 12px;
          font-weight: bold;
          font-size: 1.17em;
        }
        
        .light-mode .score-summary {
          color: #256029;
        }
        
        .dark-mode .score-summary {
          color: #58c066;
        }
        
        input[type='radio'] {
          width: 1.1em;
          height: 1.1em;
          vertical-align: middle;
          margin-right: 6px;
        }
        
        .reset-button {
          margin-top: 15px;
          background: #888 !important;
        }
        
        .light-mode .reset-button:hover {
          background: #666 !important;
        }
        
        .dark-mode .reset-button:hover {
          background: #555 !important;
        }
      `}</style>
    </div>
  );
} 