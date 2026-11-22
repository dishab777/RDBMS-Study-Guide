import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { chapters } from '../data/syllabus';
import { useProgress } from '../hooks/useProgress';

export default function ProgressPage() {
  const { progress } = useProgress();
  const total = chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0);
  const completed = Object.values(progress.completedTopics).filter(Boolean).length;
  const quizScores = progress.quizHistory.map((item) => item.accuracy);
  const average = quizScores.length ? Math.round(quizScores.reduce((sum, value) => sum + value, 0) / quizScores.length) : 0;
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Remaining', value: Math.max(total - completed, 0) }
  ];

  return (
    <div className="progress-page">
      <header className="page-header"><div><span className="eyebrow">Study analytics</span><h1>My Progress</h1><p>Track syllabus completion and quiz accuracy stored locally on this device.</p></div></header>
      <div className="progress-summary">
        <section className="panel progress-chart">
          <h2>Syllabus completion</h2>
          <div className="pie-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={data} innerRadius={68} outerRadius={94} paddingAngle={3} dataKey="value" stroke="none">
                  <Cell fill="#f97316"/><Cell fill="#27272a"/>
                </Pie>
                <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #303036', borderRadius: 8 }}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-center"><strong>{total ? Math.round(completed / total * 100) : 0}%</strong><span>complete</span></div>
          </div>
        </section>
        <section className="panel accuracy-panel">
          <h2>Quiz accuracy</h2>
          <strong>{average}%</strong>
          <p>Across {quizScores.length} completed attempt{quizScores.length === 1 ? '' : 's'}.</p>
          <div className="mini-bars">{quizScores.slice(-8).map((value, index) => <span key={index} style={{ height: `${Math.max(value, 8)}%` }}/>)}</div>
        </section>
      </div>
      <section className="panel chapter-progress">
        <h2>Chapter progress</h2>
        {chapters.map((chapter) => {
          const done = chapter.topics.filter((topic) => progress.completedTopics[topic.id]).length;
          const pct = Math.round(done / chapter.topics.length * 100);
          return (
            <div className="chapter-progress-row" key={chapter.id}>
              <div><span style={{ color: chapter.accent }}>{chapter.number}</span><strong>{chapter.title}</strong></div>
              <div className="progress-track"><span style={{ width: `${pct}%` }}/></div>
              <b>{done}/{chapter.topics.length}</b>
            </div>
          );
        })}
      </section>
    </div>
  );
}
