import { useMemo, useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const practiceQuestions = [
  { year: 'Adapted practice', marks: 2, type: 'Short answer', outcome: 'CO1', topic: 'DBMS basics', difficulty: 'Easy', question: 'Define database and DBMS.', answer: 'A database is an organized collection of related data. A DBMS is software used to define, store, manipulate, secure and recover that data. It also manages metadata, constraints, transactions and concurrent access.' },
  { year: 'Adapted practice', marks: 4, type: 'Theory', outcome: 'CO1', topic: 'Three-schema architecture', difficulty: 'Medium', question: 'Draw the three-schema architecture and explain data independence.', answer: 'Draw external, conceptual and internal levels. Explain that logical independence changes the conceptual schema without changing external views, while physical independence changes storage or access structures without changing the conceptual schema.' },
  { year: 'Adapted practice', marks: 6, type: 'Numerical', outcome: 'CO3', topic: 'Attribute closure', difficulty: 'Medium', question: 'Given R(A,B,C,D) and F={A→B,B→C,C→D}, find A⁺ and determine whether A is a candidate key.', answer: 'Start with {A}. Add B through A→B, C through B→C, and D through C→D. A⁺={A,B,C,D}. Since A determines every attribute, it is a superkey. No proper subset determines all attributes, so {A} is minimal and is a candidate key.' },
  { year: 'Adapted practice', marks: 8, type: 'Long answer', outcome: 'CO3', topic: 'Normalization', difficulty: 'Hard', question: 'Explain 2NF, 3NF and BCNF and give a relation that is in 2NF but not in 3NF.', answer: 'Define 2NF, 3NF and BCNF. Use EMP(EmpID,DeptID,DeptName) with EmpID→DeptID and DeptID→DeptName. It has a single-attribute key and no partial dependency, but DeptName is transitively dependent through DeptID. Decompose into EMP(EmpID,DeptID) and DEPT(DeptID,DeptName).' },
  { year: 'Adapted practice', marks: 6, type: 'Numerical', outcome: 'CO4', topic: 'Conflict serializability', difficulty: 'Hard', question: 'Construct a precedence graph for the schedule T1:R(A), T2:R(A), T1:W(A), T2:W(A).', answer: 'R(A) and W(A) operations from different transactions conflict. T1:R(A) precedes T2:W(A), T2:R(A) precedes T1:W(A), and T1:W(A) precedes T2:W(A). The resulting edges are cyclic, so the schedule is not conflict serializable.' },
  { year: 'Adapted practice', marks: 6, type: 'Theory', outcome: 'CO4', topic: 'Recovery', difficulty: 'Medium', question: 'Compare deferred and immediate database modification.', answer: 'Deferred modification updates the database after commit and therefore uses redo for committed transactions. Immediate modification permits updates before commit and uses undo for incomplete transactions and redo for committed transactions whose changes may not be durable.' },
  { year: 'Adapted practice', marks: 8, type: 'Numerical', outcome: 'CO5', topic: 'Hashing', difficulty: 'Medium', question: 'Use h(K)=K mod 4 to place 17, 22 and 10 in a static hash table.', answer: '17 mod 4 = 1, so 17 goes to bucket 1. 22 mod 4 = 2, so 22 goes to bucket 2. 10 mod 4 = 2, so 10 goes to bucket 2 and may share or overflow according to bucket capacity.' }
];

export default function PYQPage() {
  const [topic, setTopic] = useState('All');
  const [marks, setMarks] = useState('All');
  const [revealed, setRevealed] = useState({});

  const topics = [...new Set(practiceQuestions.map((item) => item.topic))];
  const filtered = useMemo(() => practiceQuestions.filter((item) =>
    (topic === 'All' || item.topic === topic) &&
    (marks === 'All' || item.marks === Number(marks))
  ), [topic, marks]);

  return (
    <div className="practice-page">
      <header className="page-header">
        <div><span className="eyebrow">Exam practice</span><h1>PYQ Practice</h1><p>University-style questions. The source label is shown because original year-marked papers were not attached.</p></div>
      </header>
      <div className="filter-bar">
        <Filter size={16}/>
        <label>Topic<select value={topic} onChange={(e) => setTopic(e.target.value)}><option>All</option>{topics.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Marks<select value={marks} onChange={(e) => setMarks(e.target.value)}><option>All</option><option>2</option><option>4</option><option>6</option><option>8</option></select></label>
      </div>
      <div className="pyq-list">
        {filtered.map((item, index) => (
          <article className="pyq-card" key={item.question}>
            <div className="pyq-meta"><span>{item.year}</span><span>{item.marks} marks</span><span>{item.type}</span><span>{item.difficulty}</span></div>
            <h2><small>Question {index + 1}</small>{item.question}</h2>
            <button className="ghost-button" onClick={() => setRevealed((old) => ({ ...old, [item.question]: !old[item.question] }))}>
              {revealed[item.question] ? 'Hide model answer' : 'Reveal model answer'} <ChevronDown size={15}/>
            </button>
            {revealed[item.question] && <div className="model-answer"><span>Model answer</span><p>{item.answer}</p><small>Related: {item.outcome} · {item.topic}</small></div>}
          </article>
        ))}
      </div>
    </div>
  );
}
