export default function Diagram({ type }) {
  if (type === 'external') {
    return (
      <svg viewBox="0 0 760 280" role="img" aria-label="Three-schema architecture diagram">
        <rect x="35" y="20" width="690" height="55" rx="12" fill="#242428" stroke="#f97316" />
        <text x="380" y="52" textAnchor="middle" fill="#f4f4f5">External / User Views</text>
        <rect x="95" y="105" width="570" height="55" rx="12" fill="#202024" stroke="#3f3f46" />
        <text x="380" y="137" textAnchor="middle" fill="#f4f4f5">Conceptual / Logical Schema</text>
        <rect x="155" y="190" width="450" height="55" rx="12" fill="#18181b" stroke="#3f3f46" />
        <text x="380" y="222" textAnchor="middle" fill="#f4f4f5">Internal / Physical Storage</text>
        <path d="M380 75V105M380 160V190" stroke="#fb923c" strokeWidth="3" markerEnd="url(#arrow)" />
        <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#fb923c"/></marker></defs>
      </svg>
    );
  }
  if (type === 'er') {
    return (
      <svg viewBox="0 0 760 300" role="img" aria-label="Entity relationship diagram">
        <rect x="40" y="115" width="170" height="80" rx="8" fill="#18181b" stroke="#f97316" strokeWidth="3"/>
        <text x="125" y="160" textAnchor="middle" fill="#f4f4f5">STUDENT</text>
        <polygon points="370,100 470,155 370,210 270,155" fill="#202024" stroke="#22c55e" strokeWidth="3"/>
        <text x="370" y="160" textAnchor="middle" fill="#f4f4f5">ENROLLS</text>
        <rect x="550" y="115" width="170" height="80" rx="8" fill="#18181b" stroke="#f97316" strokeWidth="3"/>
        <text x="635" y="160" textAnchor="middle" fill="#f4f4f5">COURSE</text>
        <line x1="210" y1="155" x2="270" y2="155" stroke="#a1a1aa" strokeWidth="3"/>
        <line x1="470" y1="155" x2="550" y2="155" stroke="#a1a1aa" strokeWidth="3"/>
        <text x="225" y="145" fill="#fb923c">M</text><text x="510" y="145" fill="#fb923c">N</text>
        <ellipse cx="125" cy="45" rx="85" ry="28" fill="#202024" stroke="#3f3f46"/>
        <text x="125" y="51" textAnchor="middle" fill="#f4f4f5">RollNo</text>
        <line x1="125" y1="73" x2="125" y2="115" stroke="#71717a"/>
        <ellipse cx="635" cy="45" rx="85" ry="28" fill="#202024" stroke="#3f3f46"/>
        <text x="635" y="51" textAnchor="middle" fill="#f4f4f5">CourseID</text>
        <line x1="635" y1="73" x2="635" y2="115" stroke="#71717a"/>
      </svg>
    );
  }
  if (type === 'eer') {
    return (
      <svg viewBox="0 0 760 300" role="img" aria-label="Specialization and weak entity diagram">
        <rect x="295" y="20" width="170" height="70" rx="8" fill="#18181b" stroke="#f97316" strokeWidth="3"/>
        <text x="380" y="62" textAnchor="middle" fill="#f4f4f5">PERSON</text>
        <line x1="380" y1="90" x2="380" y2="125" stroke="#71717a" strokeWidth="3"/>
        <polygon points="380,125 420,165 380,205 340,165" fill="#202024" stroke="#22c55e" strokeWidth="3"/>
        <text x="380" y="170" textAnchor="middle" fill="#f4f4f5" fontSize="12">disjoint</text>
        <line x1="350" y1="175" x2="180" y2="230" stroke="#71717a" strokeWidth="3"/>
        <line x1="410" y1="175" x2="580" y2="230" stroke="#71717a" strokeWidth="3"/>
        <rect x="100" y="230" width="160" height="55" rx="8" fill="#18181b" stroke="#3b82f6"/>
        <text x="180" y="263" textAnchor="middle" fill="#f4f4f5">STUDENT</text>
        <rect x="500" y="230" width="160" height="55" rx="8" fill="#18181b" stroke="#3b82f6"/>
        <text x="580" y="263" textAnchor="middle" fill="#f4f4f5">EMPLOYEE</text>
      </svg>
    );
  }
  if (type === 'keys') {
    return (
      <svg viewBox="0 0 760 220" role="img" aria-label="Relational key diagram">
        <rect x="40" y="55" width="300" height="110" rx="8" fill="#18181b" stroke="#f97316" strokeWidth="3"/>
        <text x="190" y="82" textAnchor="middle" fill="#fb923c">STUDENT</text>
        <text x="190" y="115" textAnchor="middle" fill="#f4f4f5">RollNo | Name | DeptNo</text>
        <text x="190" y="145" textAnchor="middle" fill="#22c55e">PK: RollNo</text>
        <rect x="420" y="55" width="300" height="110" rx="8" fill="#18181b" stroke="#3b82f6" strokeWidth="3"/>
        <text x="570" y="82" textAnchor="middle" fill="#60a5fa">DEPARTMENT</text>
        <text x="570" y="115" textAnchor="middle" fill="#f4f4f5">DeptNo | DeptName</text>
        <text x="570" y="145" textAnchor="middle" fill="#22c55e">PK: DeptNo</text>
        <path d="M340 125C380 125 380 125 420 125" fill="none" stroke="#a855f7" strokeWidth="3" markerEnd="url(#keyArrow)"/>
        <defs><marker id="keyArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#a855f7"/></marker></defs>
        <text x="380" y="112" textAnchor="middle" fill="#c4b5fd" fontSize="11">FK</text>
      </svg>
    );
  }
  return null;
}
