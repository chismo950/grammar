'use client';
import { useState, useEffect, FormEvent } from 'react';

interface Question {
  q: string;
  opts: string[];
  ans: number;
  expl: string[];
}

// Advanced grammar quiz – same structure, higher difficulty
const quiz: Question[] = [
    {
        q: "1. If it _____ the sudden storm, the match would have continued.",
        opts: ["A. weren't for", "B. hadn't been for", "C. were not", "D. hadn't been"],
        ans: 1,
        expl: [
            "A. weren't for – Missing 'had'; used for present unreal situations.",
            "B. hadn't been for – 'If it hadn't been for' expresses a past unreal condition.",
            "C. were not – Lacks the preposition 'for' and uses present subjunctive, not past unreal.",
            "D. hadn't been – Omits 'for'; the idiom requires 'for'."
        ]
    },
    {
        q: "2. Were the budget _____, the project could commence next month.",
        opts: ["A. to approve", "B. approved", "C. approving", "D. being approved"],
        ans: 1,
        expl: [
            "A. to approve – Infinitive; needs past participle.",
            "B. approved – inversion with 'were' + past participle expresses a hypothetical condition.",
            "C. approving – Present participle; wrong form.",
            "D. being approved – Continuous passive; not idiomatic here."
        ]
    },
    {
        q: "3. Little _____ about the consequences when he signed the contract.",
        opts: ["A. he think", "B. did he think", "C. he thought", "D. had he thought"],
        ans: 1,
        expl: [
            "A. he think – No auxiliary inversion; verb form wrong.",
            "B. did he think – negative adverbial 'Little' triggers inversion with 'did'.",
            "C. he thought – No inversion after negative adverbial.",
            "D. had he thought – Past perfect; changes the meaning to a prior time."
        ]
    },
    {
        q: "4. Rarely _____ such an intricate theorem been proven so elegantly.",
        opts: ["A. has", "B. have", "C. had", "D. will"],
        ans: 0,
        expl: [
            "A. has – singular noun phrase 'such an intricate theorem' requires 'has' in present perfect.",
            "B. have – Plural verb; subject is singular.",
            "C. had – Past perfect; tense mismatch with context.",
            "D. will – Future; not compatible with 'been proven'."
        ]
    },
    {
        q: "5. If she had taken my advice, she _____ facing bankruptcy now.",
        opts: ["A. wouldn't be", "B. wouldn't have been", "C. won't be", "D. isn't"],
        ans: 0,
        expl: [
            "A. wouldn't be – mixed conditional (past condition + present consequence).",
            "B. wouldn't have been – Pure third conditional (past consequence), but result is present.",
            "C. won't be – Future simple; wrong timeline.",
            "D. isn't – Simple present; ignores conditional mood."
        ]
    },
    {
        q: "6. He speaks Italian as though he _____ in Rome for years.",
        opts: ["A. lives", "B. lived", "C. had lived", "D. has lived"],
        ans: 2,
        expl: [
            "A. lives – Present simple; does not convey unreality.",
            "B. lived – Past simple; suggests present unreality but ignores duration.",
            "C. had lived – past perfect expresses an unreal past continuing into present.",
            "D. has lived – Present perfect; implies reality."
        ]
    },
    {
        q: "7. Not until the data _____ thoroughly analysed will the report be released.",
        opts: ["A. have been", "B. has been", "C. is", "D. are"],
        ans: 0,
        expl: [
            "A. have been – 'data' is treated as plural, passive perfect needed before inversion.",
            "B. has been – Singular verb; many style guides prefer plural for 'data'.",
            "C. is – Present simple; lacks perfect aspect.",
            "D. are – Present simple plural; lacks perfect aspect."
        ]
    },
    {
        q: "8. The committee insisted that the proposal _____ rewritten before submission.",
        opts: ["A. is", "B. be", "C. was", "D. will be"],
        ans: 1,
        expl: [
            "A. is – Indicative; not correct in a mandative clause.",
            "B. be – subjunctive after verbs like 'insist'.",
            "C. was – Past indicative; wrong mood.",
            "D. will be – Future; not used in subjunctive constructions."
        ]
    },
    {
        q: "9. No sooner _____ the speech than the lights went out.",
        opts: ["A. he had begun", "B. had he begun", "C. did he begin", "D. begun he"],
        ans: 1,
        expl: [
            "A. he had begun – No inversion after 'no sooner'.",
            "B. had he begun – 'No sooner' requires inversion with past perfect.",
            "C. did he begin – Uses simple past; pattern demands past perfect.",
            "D. begun he – Incorrect word order and form."
        ]
    },
    {
        q: "10. Hardly anyone realized how crucial the issue was, _____?",
        opts: ["A. didn't they", "B. did they", "C. weren't they", "D. were they"],
        ans: 1,
        expl: [
            "A. didn't they – Negative tag; main clause is already negative in meaning.",
            "B. did they – positive tag after a negative-meaning clause ('hardly').",
            "C. weren't they – Wrong verb and complement.",
            "D. were they – Positive tag but wrong verb form ('were' vs. 'did')."
        ]
    },
    {
        q: "11. Had it not been for his timely intervention, the project _____ derailed.",
        opts: ["A. would have been", "B. will be", "C. had been", "D. would be"],
        ans: 0,
        expl: [
            "A. would have been – past unreal result in third conditional inversion.",
            "B. will be – Future; inconsistent with past context.",
            "C. had been – Past perfect; omits conditional modality.",
            "D. would be – Present/future result; timeline mismatch."
        ]
    },
    {
        q: "12. The manager demanded that every document _____ verified by noon.",
        opts: ["A. be", "B. is", "C. was", "D. will be"],
        ans: 0,
        expl: [
            "A. be – mandative subjunctive.",
            "B. is – Indicative mood; not strong enough for demand.",
            "C. was – Past indicative; wrong tense and mood.",
            "D. will be – Future; not used in this structure."
        ]
    },
    {
        q: "13. Each of the solutions _____ advantages and disadvantages that must be weighed.",
        opts: ["A. have", "B. has", "C. are having", "D. having"],
        ans: 1,
        expl: [
            "A. have – Plural verb; 'each' takes singular.",
            "B. has – singular verb agrees with 'each'.",
            "C. are having – Progressive; not idiomatic here.",
            "D. having – Participle; lacks a finite verb."
        ]
    },
    {
        q: "14. Neither of the proposals, as far as I'm concerned, _____ viable.",
        opts: ["A. is", "B. are", "C. were", "D. be"],
        ans: 0,
        expl: [
            "A. is – 'neither' takes a singular verb.",
            "B. are – Plural verb; disagreement.",
            "C. were – Past tense; context is present.",
            "D. be – Subjunctive; not required here."
        ]
    },
    {
        q: "15. By the end of this year, she _____ at the company for a decade.",
        opts: ["A. will work", "B. will have worked", "C. has worked", "D. had worked"],
        ans: 1,
        expl: [
            "A. will work – Simple future; ignores completed duration.",
            "B. will have worked – future perfect for a duration completed at a future point.",
            "C. has worked – Present perfect; reference point is future.",
            "D. had worked – Past perfect; wrong timeframe."
        ]
    },
    {
        q: "16. Scarcely _____ to speak when the microphone failed.",
        opts: ["A. had he begun", "B. he had begun", "C. did he begin", "D. begun he"],
        ans: 0,
        expl: [
            "A. had he begun – inversion with 'scarcely' + past perfect.",
            "B. he had begun – No inversion; incorrect.",
            "C. did he begin – Simple past; wrong pattern.",
            "D. begun he – Incorrect order and form."
        ]
    },
    {
        q: "17. The professor, along with his assistants, _____ preparing the experiment.",
        opts: ["A. are", "B. were", "C. is", "D. have been"],
        ans: 2,
        expl: [
            "A. are – Plural; primary subject 'professor' is singular.",
            "B. were – Past tense; context implies present.",
            "C. is – 'along with' is parenthetical and doesn't affect number.",
            "D. have been – Present perfect plural; conflicts with singular subject."
        ]
    },
    {
        q: "18. It was proposed that a new committee _____ elected.",
        opts: ["A. should be", "B. be", "C. is", "D. will be"],
        ans: 1,
        expl: [
            "A. should be – Acceptable, but more explicit than necessary.",
            "B. be – bare subjunctive after 'proposed'.",
            "C. is – Indicative; not used in formal proposal.",
            "D. will be – Future; wrong mood."
        ]
    },
    {
        q: "19. Seldom _____ such a persuasive argument presented to the board.",
        opts: ["A. the CEO makes", "B. makes the CEO", "C. has the CEO made", "D. the CEO has made"],
        ans: 2,
        expl: [
            "A. the CEO makes – No inversion.",
            "B. makes the CEO – Inversion but verb position awkward and wrong tense.",
            "C. has the CEO made – inversion with present perfect.",
            "D. the CEO has made – No inversion."
        ]
    },
    {
        q: "20. The report is confidential; under no circumstances _____ it be leaked.",
        opts: ["A. must", "B. should", "C. may", "D. shall"],
        ans: 1,
        expl: [
            "A. must – Lacks inversion; needs auxiliary before subject.",
            "B. should – 'Under no circumstances' triggers inversion: 'should it be leaked'.",
            "C. may – 'May it be leaked' is overly formal and less idiomatic.",
            "D. shall – Archaic and less natural; still needs inversion."
        ]
    }
];

export default function GrammarQuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure component is mounted before checking localStorage
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Check initial theme preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    // Add listener for theme changes
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeMediaQuery.addEventListener('change', handleThemeChange);
    
    // Cleanup listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('grammar_quiz_answers_2');
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grammar_quiz_answers_2', JSON.stringify(answers));
  }, [answers]);

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
    return null; // Prevent rendering until mounted
  }
  
  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'} ${submitted ? 'selectable' : ''}`}>
      <h1>English Grammar Quiz</h1>
      <form onSubmit={handleSubmit} noValidate>
        {quiz.map((item, i) => {
          const selected = answers[i];
          const isCorrect = submitted && selected === item.ans;
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
                <>
                  <div className="explanation">
                    <b>Explanation:</b> {item.expl[item.ans]}
                  </div>
                </>
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
        
        .feedback {
          margin-top: 10px;
          padding: 12px 14px 8px;
          border-radius: 12px;
          font-size: 1em;
        }
        
        .light-mode .feedback.correct {
          border: 1.5px solid #53cb71;
          background: #e8fbe8;
          color: #249a46;
        }
        
        .dark-mode .feedback.correct {
          border: 1.5px solid #43b35f;
          background: #144423;
          color: #5acd78;
        }
        
        .light-mode .feedback.incorrect {
          border: 1.5px solid #ff8a8a;
          background: #fff1f1;
          color: #e14242;
        }
        
        .dark-mode .feedback.incorrect {
          border: 1.5px solid #c54545;
          background: #441414;
          color: #ff7b7b;
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
