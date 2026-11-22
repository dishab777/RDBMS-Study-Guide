import { useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart3, BookOpen, ChevronDown, ChevronRight, FileQuestion,
  LayoutDashboard, Menu, Search, StickyNote, X
} from 'lucide-react';
import { chapters } from '../data/syllabus';

export default function Layout() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return chapters.flatMap((chapter) =>
      chapter.topics
        .filter((topic) =>
          `${topic.title} ${topic.definition} ${topic.rules?.join(' ')}`.toLowerCase().includes(q)
        )
        .map((topic) => ({ chapter, topic }))
    ).slice(0, 8);
  }, [query]);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/quiz', icon: FileQuestion, label: 'Practice Quiz' },
    { to: '/pyqs', icon: StickyNote, label: 'PYQ Practice' },
    { to: '/revision', icon: BookOpen, label: 'Quick Revision' },
    { to: '/progress', icon: BarChart3, label: 'My Progress' }
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="brand">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <span className="brand-mark">DB</span>
            <span>
              <strong>RDBMS</strong>
              <small>Study Hub</small>
            </span>
          </Link>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobileOpen(false)}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="course-nav">
          <button className="course-toggle" onClick={() => setOpen((v) => !v)}>
            <span>Course chapters</span>
            {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {open && (
            <div className="chapter-list">
              {chapters.map((chapter) => (
                <details key={chapter.id}>
                  <summary>
                    <span className="chapter-number">{chapter.number}</span>
                    <span>
                      <small>{chapter.courseOutcome}</small>
                      {chapter.title}
                    </span>
                  </summary>
                  <div className="topic-list">
                    {chapter.topics.map((topic) => (
                      <Link
                        key={topic.id}
                        to={`/chapter/${chapter.id}/${topic.id}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {topic.title}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </aside>

      {mobileOpen && <button className="sidebar-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}

      <main className="main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="search-wrap">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, definitions, formulas..."
              aria-label="Global search"
            />
            {query && (
              <div className="search-results">
                {results.length ? results.map(({ chapter, topic }) => (
                  <button
                    key={`${chapter.id}-${topic.id}`}
                    onClick={() => {
                      setQuery('');
                      navigate(`/chapter/${chapter.id}/${topic.id}`);
                    }}
                  >
                    <small>{chapter.title}</small>
                    <strong>{topic.title}</strong>
                  </button>
                )) : <div className="search-empty">No matching lesson found</div>}
              </div>
            )}
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
