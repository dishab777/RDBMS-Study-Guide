import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import katex from 'katex';

function Formula({ value }) {
  return <span dangerouslySetInnerHTML={{ __html: katex.renderToString(value, { throwOnError: false }) }} />;
}

const formulas = [
  { title: 'Functional dependency closure', formula: 'X^+ = \\{X\\} \\cup \\{Y \\mid A \\subseteq X^+, A \\rightarrow Y\\}', meaning: 'Find every attribute derivable from X.', use: 'Membership tests and candidate-key identification.', example: 'For A→B and B→C, A⁺=ABC.', mistake: 'Repeat until closure stops changing.' },
  { title: 'Armstrong reflexivity', formula: 'Y \\subseteq X \\Rightarrow X \\rightarrow Y', meaning: 'An attribute set determines any subset of itself.', use: 'Detecting trivial dependencies.', example: 'AB→A is reflexive/trivial.', mistake: 'Reflexivity alone does not prove a meaningful candidate key.' },
  { title: 'Lossless binary decomposition', formula: '(R_1 \\cap R_2) \\rightarrow R_1 \\;\\lor\\;(R_1 \\cap R_2) \\rightarrow R_2', meaning: 'Test whether one decomposed side is determined by common attributes.', use: 'Binary decomposition of a relation.', example: 'R1(A,B), R2(A,C): common A determines R1 if A→B.', mistake: 'Testing only the original FD set is insufficient; use closure.' },
  { title: '3NF condition', formula: '\\forall X \\rightarrow A,\\;(X \\text{ is a superkey}) \\lor (A \\text{ is prime})', meaning: 'A determinant is a superkey or the dependent is prime.', use: 'Determine whether a relation is in 3NF.', example: 'EmpID→DeptName is acceptable if EmpID is a superkey.', mistake: 'Being in 2NF does not guarantee 3NF.' },
  { title: 'Conflict serializability', formula: 'T_i:op(X) \\rightarrow T_j:op(X)\\text{ for every conflict pair}', meaning: 'Build a precedence edge from earlier to later conflicting operation.', use: 'Test schedule serializability.', example: 'Acyclic graph gives a topological serial order.', mistake: 'Read-read operations do not create conflicts.' },
  { title: 'Timestamp read rule', formula: 'T S(T) < W T S(X) \\Rightarrow \\text{reject read}', meaning: 'Reject an old transaction that would read an item overwritten by a newer transaction.', use: 'Timestamp ordering.', example: 'T timestamp 5 reads X after X was written by timestamp 10: reject T.', mistake: 'Update R_TS only after accepting the read.' },
  { title: 'Static hash bucket', formula: 'h(K) = K \\bmod N', meaning: 'Map key K to one of N fixed buckets.', use: 'Static hashing numerical problems.', example: '17 mod 4 = 1.', mistake: 'A collision requires overflow handling.' },
  { title: 'ARIES phases', formula: '\\text{Analysis} \\rightarrow \\text{Redo} \\rightarrow \\text{Undo}', meaning: 'Analyze, repeat committed/possible updates, then roll back loser transactions.', use: 'Advanced recovery.', example: 'Use LSN and dirty-page information during each phase.', mistake: 'Undo in reverse or LSN-safe order.' }
];

export default function RevisionPage() {
  const [open, setOpen] = useState(0);
  return (
    <div className="revision-page">
      <header className="page-header"><div><span className="eyebrow">Fast review</span><h1>Formula and Quick-Revision Sheet</h1><p>Use these rules for final exam preparation and numerical problem selection.</p></div></header>
      <div className="revision-grid">
        {formulas.map((item, index) => (
          <article className={`formula-card ${open === index ? 'open' : ''}`} key={item.title}>
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              <span><strong>{item.title}</strong><small>{item.use}</small></span><ChevronDown size={18}/>
            </button>
            {open === index && (
              <div className="formula-content">
                <div className="formula-expression"><Formula value={item.formula}/></div>
                <p><strong>Meaning:</strong> {item.meaning}</p>
                <p><strong>Example:</strong> {item.example}</p>
                <p className="formula-warning"><strong>Common mistake:</strong> {item.mistake}</p>
              </div>
            )}
          </article>
        ))}
      </div>
      <section className="flashcard-panel">
        <span className="eyebrow">Last-minute checklist</span>
        <div className="checklist-grid">
          {['ACID properties', 'Armstrong axioms', '2NF/3NF/BCNF conditions', 'Conflict graph cycle test', 'Lock compatibility matrix', 'WAL and undo/redo', 'Dense and sparse indexes', 'B+ range-search advantage'].map((item) => <label key={item}><input type="checkbox"/><span>{item}</span></label>)}
        </div>
      </section>
    </div>
  );
}
