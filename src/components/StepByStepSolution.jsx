import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, RotateCcw } from 'lucide-react';

export default function StepByStepSolution({ question, given, steps, answer, mistake }) {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => { setStep(0); setShowAll(false); }, [question]);

  return (
    <div className="solution-card">
      <div className="solution-question">
        <span className="eyebrow">Solved problem</span>
        <h3>{question}</h3>
        {given && <p><strong>Given:</strong> {given}</p>}
      </div>
      <div className="solution-toolbar">
        <span>Step {showAll ? '1–' + steps.length : step + 1} of {steps.length}</span>
        <button className="ghost-button" onClick={() => { setShowAll(true); setStep(steps.length - 1); }}><Eye size={15}/> Show all</button>
        <button className="icon-button" aria-label="Reset solution" onClick={() => { setStep(0); setShowAll(false); }}><RotateCcw size={15}/></button>
      </div>
      <div className="solution-steps">
        {steps.map((item, index) => (
          (showAll || index <= step) && (
            <div className="solution-step" key={index}>
              <span className="step-number">{index + 1}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                {item.code && <code>{item.code}</code>}
              </div>
            </div>
          )
        ))}
      </div>
      {(!showAll && step < steps.length - 1) ? (
        <button className="primary-button" onClick={() => setStep((v) => v + 1)}>Next step <ChevronRight size={16}/></button>
      ) : (
        <div className="final-answer">
          <span>Final answer</span>
          <strong>{answer}</strong>
          {mistake && <p><b>Common mistake:</b> {mistake}</p>}
        </div>
      )}
      {!showAll && step > 0 && (
        <button className="text-button" onClick={() => setStep((v) => v - 1)}><ChevronLeft size={16}/> Previous step</button>
      )}
    </div>
  );
}
