import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Bookmark, CheckCircle2, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import katex from 'katex';
import { chapters } from '../data/syllabus';
import Diagram from '../components/Diagram';
import StepByStepSolution from '../components/StepByStepSolution';
import { useProgress } from '../hooks/useProgress';

function Formula({ value }) {
  return <span dangerouslySetInnerHTML={{ __html: katex.renderToString(value, { throwOnError: false }) }} />;
}

export default function ChapterPage() {
  const { chapterId, topicId } = useParams();
  const navigate = useNavigate();
  const chapter = chapters.find((item) => item.id === chapterId) || chapters[0];
  const topicIndex = Math.max(0, chapter.topics.findIndex((item) => item.id === topicId));
  const topic = chapter.topics[topicIndex];
  const { progress, update, toggleCompleted, toggleBookmark } = useProgress();

  useEffect(() => {
    update({ lastVisited: { chapterId: chapter.id, topicId: topic.id } });
  }, [chapter.id, topic.id]);

  const move = (offset) => {
    const index = topicIndex + offset;
    if (index >= 0 && index < chapter.topics.length) navigate(`/chapter/${chapter.id}/${chapter.topics[index].id}`);
  };

  const example = numericalExample(topic.id);
  const noteKey = `${chapter.id}:${topic.id}`;

  return (
    <article className="lesson">
      <div className="breadcrumb">
        <Link to="/">Study Hub</Link><span>/</span><span>{chapter.title}</span><span>/</span><strong>{topic.title}</strong>
      </div>

      <header className="lesson-header">
        <div>
          <span className="eyebrow">{chapter.courseOutcome} · Chapter {chapter.number}</span>
          <h1>{topic.title}</h1>
          <div className="lesson-meta"><Clock3 size={15}/>{topic.duration}<span>University-style explanation</span></div>
        </div>
        <div className="lesson-actions">
          <button className={`icon-button ${progress.bookmarks[topic.id] ? 'active' : ''}`} onClick={() => toggleBookmark(topic.id)} aria-label="Bookmark lesson"><Bookmark size={18}/></button>
          <button className={`complete-button ${progress.completedTopics[topic.id] ? 'done' : ''}`} onClick={() => toggleCompleted(topic.id)}>
            <CheckCircle2 size={17}/>{progress.completedTopics[topic.id] ? 'Completed' : 'Mark complete'}
          </button>
        </div>
      </header>

      <section className="lesson-section concept-card">
        <span className="section-label">Concept building</span>
        <p className="lead">{topic.definition}</p>
        <p>{topic.explanation}</p>
      </section>

      <section className="lesson-section">
        <h2>Complete explanation</h2>
        <div className="rules-grid">
          {topic.rules.map((rule, index) => (
            <div className="rule-card" key={rule}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {topic.diagram && (
        <section className="lesson-section diagram-section">
          <h2>Visual learning aid</h2>
          <div className="diagram-box"><Diagram type={topic.diagram}/></div>
        </section>
      )}

      <div className="compare-grid">
        <section className="lesson-section">
          <h2>Advantages and uses</h2>
          <ul className="check-list">{topic.advantage.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="lesson-section">
          <h2>Limitations</h2>
          <ul className="warning-list">{topic.disadvantage.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>

      <section className="lesson-section example-card">
        <span className="section-label">Solved example</span>
        <h2>Understand it through an example</h2>
        <p>{topic.example}</p>
        {topic.id === 'closures' && <p className="formula-line"><Formula value={'X^+ = \\{X\\} \\cup \\{Y \\mid A \\subseteq X^+, A \\rightarrow Y\\}'}/></p>}
      </section>

      {example && <StepByStepSolution {...example}/>}

      <section className="lesson-section exam-card">
        <span className="section-label">Exam-oriented answer</span>
        <h2>How to write this answer</h2>
        <p>{topic.exam}</p>
      </section>

      <section className="lesson-section mistakes-card">
        <h2>Common mistakes</h2>
        <ul>{topic.mistakes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="lesson-section notes-card">
        <h2>Personal notes</h2>
        <textarea
          value={progress.notes[noteKey] || ''}
          onChange={(event) => update({ notes: { ...progress.notes, [noteKey]: event.target.value } })}
          placeholder="Write a key formula, doubt or exam reminder..."
        />
      </section>

      <nav className="lesson-nav">
        <button onClick={() => move(-1)} disabled={topicIndex === 0}><ChevronLeft size={16}/> Previous</button>
        <button onClick={() => move(1)} disabled={topicIndex === chapter.topics.length - 1}>Next <ChevronRight size={16}/></button>
      </nav>
    </article>
  );
}

function numericalExample(id) {
  if (id === 'closures') return {
    question: 'Compute the attribute closure of A for R(A,B,C,D) with F = {A → B, B → C, C → D}.',
    given: 'Relation attributes are A, B, C, D; the given FDs are A→B, B→C and C→D.',
    steps: [
      { title: 'Initialize', text: 'Start with the attribute set for which closure is required.', code: 'closure = {A}' },
      { title: 'Apply A → B', text: 'The left side A is present, so add B to the closure.', code: 'closure = {A, B}' },
      { title: 'Apply B → C', text: 'The left side B is now present, so add C.', code: 'closure = {A, B, C}' },
      { title: 'Apply C → D', text: 'The left side C is present, so add D. No further pass produces a new attribute.', code: 'closure = {A, B, C, D}' }
    ],
    answer: 'A⁺ = ABCD',
    mistake: 'Do not stop after the first pass; later FDs may become applicable as closure grows.'
  };
  if (id === 'normal-forms') return {
    question: 'Find the highest normal form for R(A,B,C,D) with F = {A→B, B→C, C→D}.',
    given: 'A is a candidate key because A⁺=ABCD.',
    steps: [
      { title: 'Check atomicity', text: 'There are no repeating or multivalued attribute values, so the relation satisfies 1NF.' },
      { title: 'Check 2NF', text: 'The only candidate key is {A}, so there is no partial dependency on part of a composite key. The relation is in 2NF.' },
      { title: 'Check 3NF', text: 'Each determinant is A or another attribute with a superkey? B→C and C→D violate the 3NF superkey rule because B and C are not superkeys and C/B are nonprime. Therefore 3NF is violated.' },
      { title: 'Check BCNF', text: 'A→B also has determinant A, but B→C and C→D have determinants that are not superkeys. Therefore BCNF is violated.' }
    ],
    answer: 'Highest normal form: 2NF',
    mistake: 'A relation can be in 2NF even though it has a chain of transitive dependencies.'
  };
  if (id === 'serializability') return {
    question: 'Determine conflict serializability for T1:R(A), T2:R(A), T1:W(A), T2:W(A).',
    given: 'Operations are listed in the displayed order.',
    steps: [
      { title: 'Identify conflicts', text: 'T1:R(A) conflicts with T2:W(A), giving T1→T2.' },
      { title: 'Identify the second conflict', text: 'T2:R(A) conflicts with T1:W(A), giving T2→T1.' },
      { title: 'Check writes', text: 'T1:W(A) conflicts with T2:W(A). Its earlier/later order adds T1→T2.' },
      { title: 'Test the graph', text: 'The graph contains T1→T2 and T2→T1, producing a cycle.' }
    ],
    answer: 'Not conflict serializable',
    mistake: 'Read-read pairs such as T1:R(A) and T2:R(A) are not conflict edges.'
  };
  if (id === 'hashing') return {
    question: 'Place key 17 into a static hash table with four buckets using h(K) = K mod 4.',
    given: 'Bucket count = 4.',
    steps: [
      { title: 'Identify the formula', text: 'Static hashing uses the remainder of the key divided by the bucket count.', code: 'h(K) = K mod 4' },
      { title: 'Substitute the key', text: 'Divide 17 by 4.', code: '17 ÷ 4 = 4 remainder 1' },
      { title: 'Choose the bucket', text: 'The remainder 1 identifies bucket number 1.' }
    ],
    answer: 'Key 17 belongs to bucket 1',
    mistake: 'Bucket numbering must follow the convention; either 0–3 or 1–4 is valid if stated consistently.'
  };
  return null;
}
