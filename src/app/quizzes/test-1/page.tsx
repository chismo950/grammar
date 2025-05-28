'use client';
import { useState, useEffect, FormEvent } from 'react';

interface Question {
  q: string;
  opts: string[];
  ans: number;
  expl: string[];
}

const quiz: Question[] = [
    { q: "1. If he _____ earlier, he wouldn't have missed the train.", opts: ["A. left","B. had left","C. leaves","D. would have left"], ans:1, expl:["A. left – Simple past; not correct for third conditional.","B. had left – Correct; past perfect is required in third conditional.","C. leaves – Present tense; incorrect in this context.","D. would have left – Wrong tense for this part of the conditional."] },
    { q: "2. I wish I _____ how to solve this problem.", opts: ["A. know","B. knew","C. have known","D. will know"], ans:1, expl:["A. know – Present tense; 'wish' for present uses past tense.","B. knew – Correct; past tense expresses a present unreal situation.","C. have known – Present perfect; not used after 'wish'.","D. will know – Future; incorrect after 'wish'."] },
    { q: "3. Hardly _____ the bell rung when the students rushed out.", opts: ["A. has","B. had","C. did","D. have"], ans:1, expl:["A. has – Present perfect; wrong tense.","B. had – Correct; after 'hardly', use past perfect.","C. did – Simple past; not suitable here.","D. have – Plural present; not suitable here."] },
    { q: "4. The man _____ wallet was stolen reported the theft.", opts: ["A. who's","B. whose","C. whom","D. who"], ans:1, expl:["A. who's – Contraction for 'who is'; incorrect.","B. whose – Correct; possessive relative pronoun.","C. whom – Object pronoun; not possessive.","D. who – Subject pronoun; not possessive."] },
    { q: "5. I prefer tea _____ coffee.", opts: ["A. than","B. from","C. to","D. over"], ans:2, expl:["A. than – Used for comparisons, not 'prefer'.","B. from – Incorrect preposition here.","C. to – Correct; 'prefer A to B' is standard.","D. over – Informal but less standard."] },
    { q: "6. Neither the teacher nor the students _____ ready.", opts: ["A. is","B. are","C. was","D. be"], ans:1, expl:["A. is – Incorrect; 'students' is plural and closest to verb.","B. are – Correct; verb agrees with the nearest subject.","C. was – Wrong tense and number.","D. be – Not a proper verb form here."] },
    { q: "7. He talks as if he _____ everything.", opts: ["A. knows","B. know","C. knew","D. had known"], ans:2, expl:["A. knows – Present tense; doesn't express unreality.","B. know – Wrong verb form.","C. knew – Correct; 'as if' for unreal present uses past tense.","D. had known – Past perfect; incorrect here."] },
    { q: "8. She suggested that he _____ to the doctor.", opts: ["A. goes","B. go","C. will go","D. gone"], ans:1, expl:["A. goes – Present simple; not subjunctive.","B. go – Correct; subjunctive after 'suggest'.","C. will go – Future; not used after 'suggest that'.","D. gone – Past participle; incorrect here."] },
    { q: "9. Not only _____ late, but he also forgot his book.", opts: ["A. he arrived","B. did he arrive","C. arrived he","D. he did arrive"], ans:1, expl:["A. he arrived – No inversion after 'not only' at the start.","B. did he arrive – Correct; inversion after 'not only' at the start.","C. arrived he – Wrong word order.","D. he did arrive – Incorrect structure."] },
    { q: "10. The book, together with the notes, _____ missing.", opts: ["A. are","B. were","C. is","D. have been"], ans:2, expl:["A. are – Plural; but subject is singular.","B. were – Plural; same as above.","C. is – Correct; 'together with' doesn't change subject number.","D. have been – Present perfect plural; subject is singular."] },
    { q: "11. Scarcely _____ the train left when it began to rain.", opts: ["A. did","B. has","C. had","D. have"], ans:2, expl:["A. did – Simple past; incorrect after 'scarcely'.","B. has – Present perfect; wrong tense.","C. had – Correct; past perfect after 'scarcely'.","D. have – Not correct here."] },
    { q: "12. It’s high time you _____ to bed.", opts: ["A. go","B. went","C. have gone","D. gone"], ans:1, expl:["A. go – Present tense; not correct after 'it's high time'.","B. went – Correct; past tense shows urgency.","C. have gone – Present perfect; not used here.","D. gone – Not a valid verb form here."] },
    { q: "13. By the time she arrives, we _____ our work.", opts: ["A. finished","B. have finished","C. will have finished","D. had finished"], ans:2, expl:["A. finished – Simple past; does not fit future reference.","B. have finished – Present perfect; not for future reference.","C. will have finished – Correct; future perfect for something completed before another future event.","D. had finished – Past perfect; for past, not future."] },
    { q: "14. Each of the boys _____ given a present.", opts: ["A. have","B. was","C. were","D. are"], ans:1, expl:["A. have – Plural; incorrect after 'each'.","B. was – Correct; 'each' takes singular verb.","C. were – Plural; not correct.","D. are – Plural; not correct."] },
    { q: "15. Had I seen him, I _____ hello.", opts: ["A. would say","B. would have said","C. had said","D. will say"], ans:1, expl:["A. would say – Wrong tense for past unreal.","B. would have said – Correct; past unreal condition.","C. had said – Incorrect; not the right conditional form.","D. will say – Simple future; not correct here."] },
    { q: "16. He denied _____ the window.", opts: ["A. breaking","B. to break","C. break","D. to have broken"], ans:0, expl:["A. breaking – Correct; 'deny' is followed by gerund.","B. to break – Infinitive; not used after 'deny'.","C. break – Bare infinitive; incorrect here.","D. to have broken – Perfect infinitive; not common after 'deny'."] },
    { q: "17. She is one of the students who _____ always late.", opts: ["A. is","B. was","C. are","D. has been"], ans:2, expl:["A. is – Would refer to 'one', not 'students'.","B. was – Wrong tense and number.","C. are – Correct; 'who' refers to 'students' (plural).","D. has been – Singular present perfect; not correct."] },
    { q: "18. This is the best movie I _____.", opts: ["A. ever saw","B. had ever seen","C. have ever seen","D. ever see"], ans:2, expl:["A. ever saw – Simple past; should use present perfect.","B. had ever seen – Past perfect; used with another past event.","C. have ever seen – Correct; present perfect with superlative.","D. ever see – Present simple; not correct here."] },
    { q: "19. I look forward to _____ from you soon.", opts: ["A. hear","B. hearing","C. heard","D. to hear"], ans:1, expl:["A. hear – Bare infinitive; not used after 'look forward to'.","B. hearing – Correct; 'to' is a preposition, followed by gerund.","C. heard – Past tense; not correct here.","D. to hear – Infinitive; not used here."] },
    { q: "20. No sooner had he left _____ it started to rain.", opts: ["A. than","B. when","C. then","D. but"], ans:0, expl:["A. than – Correct; 'No sooner... than' is the correct structure.","B. when – Often confused, but incorrect here.","C. then – Incorrect structure.","D. but – Incorrect connector."] }
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
    const saved = localStorage.getItem('grammar_quiz_answers');
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grammar_quiz_answers', JSON.stringify(answers));
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
                      submitted && selected === j
                        ? j === item.ans
                          ? 'selected-correct'
                          : 'selected-incorrect'
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
                  {selected == null ? (
                    <div className="feedback incorrect">
                      No answer selected.<br />
                      <b>Correct answer:</b> {item.opts[item.ans]}
                    </div>
                  ) : (
                    <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect.'}<br />
                      <b>Your answer:</b> {item.opts[selected]}<br />
                      <b>Correct answer:</b> {item.opts[item.ans]}
                    </div>
                  )}
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
