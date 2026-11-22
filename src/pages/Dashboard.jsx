import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Flame, Trophy } from 'lucide-react';
import { chapters } from '../data/syllabus';
import { useProgress } from '../hooks/useProgress';

export default function Dashboard() {
  const { progress } = useProgress();
  const total = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0);
  const completed = Object.values(progress.completedTopics).filter(Boolean).length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;
  const last = progress.lastVisited;
  const continueChapter = last?.chapterId ? chapters.find((c) => c.id === last.chapterId) : chapters[0];
  const continueTopic = continueChapter?.topics.find((t) => t.id === (last?.topicId || continueChapter.topics[0].id)) || continueChapter.topics[0];

  return (
    <div className="dashboard">
      <section className="welcome">
        <div>
          <span className="eyebrow">RDBMS Study Hub</span>
          <h1>Welcome back to your learning space</h1>
          <p>Master database systems, one concept at a time.</p>
        </div>
        <div className="welcome-actions">
          <Link className="primary-button" to={`/chapter/${continueChapter.id}/${continueTopic.id}`}>
            Continue learning <ArrowRight size={16}/>
          </Link>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon orange"><Trophy size={20}/></div>
          <div><strong>{percentage}%</strong><span>Syllabus complete</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle2 size={20}/></div>
          <div><strong>{completed}/{total}</strong><span>Topics completed</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Clock3 size={20}/></div>
          <div><strong>{progress.quizHistory.length}</strong><span>Quiz attempts</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><Flame size={20}/></div>
          <div><strong>{progress.streak || 0} day</strong><span>Study streak</span></div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="panel continue-panel">
          <div className="panel-heading">
            <div><span className="eyebrow">Continue learning</span><h2>{continueTopic.title}</h2></div>
            <span className="reading-time"><Clock3 size={14}/> {continueTopic.duration}</span>
          </div>
          <p>{continueTopic.definition}</p>
          <div className="progress-track"><span style={{ width: `${percentage}%` }}/></div>
          <Link className="text-link" to={`/chapter/${continueChapter.id}/${continueTopic.id}`}>Open lesson <ArrowRight size={15}/></Link>
        </section>

        <section className="panel quick-panel">
          <span className="eyebrow">Quick access</span>
          <div className="quick-links">
            <Link to="/quiz"><BookOpen size={18}/><span><strong>Take a quiz</strong><small>Test your understanding</small></span></Link>
            <Link to="/pyqs"><FileIcon/><span><strong>Practice PYQs</strong><small>Adapted exam-style questions</small></span></Link>
            <Link to="/revision"><BookOpen size={18}/><span><strong>Formula sheet</strong><small>Rules and quick formulas</small></span></Link>
          </div>
        </section>
      </div>

      <section className="roadmap-section">
        <div className="section-heading"><div><span className="eyebrow">Course roadmap</span><h2>Chapters in prescribed order</h2></div></div>
        <div className="roadmap">
          {chapters.map((chapter) => (
            <Link className="roadmap-card" key={chapter.id} to={`/chapter/${chapter.id}/${chapter.topics[0].id}`}>
              <div className="roadmap-top"><span style={{ color: chapter.accent }}>{chapter.number}</span><small>{chapter.courseOutcome}</small></div>
              <h3>{chapter.title}</h3>
              <p>{chapter.subtitle}</p>
              <div className="roadmap-footer"><span>{chapter.topics.length} topics</span><ArrowRight size={16}/></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16h16V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>
    </svg>
  );
}
