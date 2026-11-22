import { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

const questions = [
  { topic: 'Database fundamentals', question: 'Which property allows changing the physical storage structure without changing the logical schema?', options: ['Logical data independence', 'Physical data independence', 'Referential integrity', 'Data abstraction'], answer: 1, explanation: 'Physical data independence separates storage implementation from the conceptual and external levels.' },
  { topic: 'Relational model', question: 'A candidate key is:', options: ['Any superkey', 'A minimal superkey', 'Always composite', 'Always selected as primary'], answer: 1, explanation: 'A candidate key is minimal: removing an attribute makes it unable to uniquely identify tuples.' },
  { topic: 'SQL', question: 'HAVING is primarily used to:', options: ['Filter rows before grouping', 'Filter grouped or aggregate results', 'Create indexes', 'Define a foreign key'], answer: 1, explanation: 'WHERE filters individual rows; HAVING filters groups after GROUP BY and aggregation.' },
  { topic: 'Normalization', question: 'For 3NF, a transitive dependency occurs when:', options: ['A key determines a key attribute', 'A nonprime attribute depends on a key through another nonprime attribute', 'Two keys have the same value', 'An attribute is atomic'], answer: 1, explanation: 'The classic transitive pattern is key → nonkey determinant → nonkey attribute.' },
  { topic: 'Serializability', question: 'Which pair is a conflict?', options: ['R(A) and R(A)', 'R(A) and W(A)', 'W(A) and W(B)', 'R(A) and R(B)'], answer: 1, explanation: 'Operations conflict across transactions on the same item when at least one is a write.' },
  { topic: 'Locking', question: 'In basic two-phase locking, the shrinking phase:', options: ['May acquire new locks', 'May only release locks', 'Must acquire all remaining locks', 'Does not exist'], answer: 1, explanation: 'After a transaction begins releasing locks, it cannot acquire another lock.' },
  { topic: 'Recovery', question: 'The WAL rule requires:', options: ['Data written before log records', 'Log written before corresponding data', 'No log for committed transactions', 'Undo before analysis'], answer: 1, explanation: 'Write-Ahead Logging keeps recovery records durable before database updates.' },
  { topic: 'Indexing', question: 'A B+ tree differs from a basic B-tree mainly because:', options: ['It is never balanced', 'It keeps all data search keys at leaf level and links leaves', 'It cannot support ranges', 'It uses only one level'], answer: 1, explanation: 'Leaf linking and key placement make B+ trees especially suitable for range scans.' }
];

export default function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { progress, update } = useProgress();

  const score = useMemo(() =>
    questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0),
  [answers]);

  const submit = () => {
    setSubmitted(true);
    const accuracy = Math.round((score / questions.length) * 100);
    update({ quizHistory: [...progress.quizHistory, { date: new Date().toISOString(), score, total: questions.length, accuracy }] });
  };
  const reset = () => { setAnswers({}); setSubmitted(false); };

  return (
    <div className="practice-page">
      <header className="page-header">
        <div><span className="eyebrow">Knowledge check</span><h1>RDBMS Practice Quiz</h1><p>8 mixed-concept questions with immediate explanations.</p></div>
        {submitted && <div className="score-box"><strong>{score}/{questions.length}</strong><span>{Math.round(score / questions.length * 100)}% accuracy</span></div>}
      </header>
      {submitted && (
        <div className="quiz-result">
          {score === questions.length ? <CheckCircle2/> : <XCircle/>}
          <div><strong>{score === questions.length ? 'Excellent work' : 'Review the marked concepts'}</strong><p>The correct answer and explanation are shown for every question.</p></div>
          <button className="ghost-button" onClick={reset}><RotateCcw size={15}/> Try again</button>
        </div>
      )}
      <div className="quiz-list">
        {questions.map((item, index) => {
          const selected = answers[index];
          return (
            <section className="quiz-card" key={item.question}>
              <div className="quiz-card-heading"><span>{String(index + 1).padStart(2, '0')}</span><small>{item.topic}</small></div>
              <h2>{item.question}</h2>
              <div className="option-list">
                {item.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    disabled={submitted}
                    className={
                      submitted
                        ? optionIndex === item.answer ? 'correct' : optionIndex === selected ? 'incorrect' : ''
                        : optionIndex === selected ? 'selected' : ''
                    }
                    onClick={() => setAnswers((old) => ({ ...old, [index]: optionIndex }))}
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
                  </button>
                ))}
              </div>
              {submitted && <div className={`answer-feedback ${selected === item.answer ? 'good' : 'bad'}`}><strong>{selected === item.answer ? 'Correct' : 'Incorrect'}</strong><p>{item.explanation}</p></div>}
            </section>
          );
        })}
      </div>
      {!submitted && <button className="primary-button submit-quiz" disabled={Object.keys(answers).length !== questions.length} onClick={submit}>Submit quiz</button>}
    </div>
  );
}
