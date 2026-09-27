import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  Timer,
  RotateCcw,
  Trophy,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Send,
} from 'lucide-react';
import { masterQuizQuestions, type QuizQuestion } from '../data/masterQuiz';
import { useProgress } from '../context/ProgressContext';
import { useSocket } from '../context/SocketContext';
import './MasterAssessment.css';

type Answers = Record<number, number | null>;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function tierFor(percent: number): { label: string; className: string } {
  if (percent >= 90) return { label: 'Staff/Senior Wizard', className: 'tier-wizard' };
  if (percent >= 75) return { label: 'Production Ready', className: 'tier-prod' };
  if (percent >= 55) return { label: 'Solid Mid-Level', className: 'tier-mid' };
  return { label: 'Junior Dev', className: 'tier-junior' };
}

const MasterAssessment: React.FC = () => {
  const { setQuizBestScore, quizBestScore } = useProgress();
  const { socket } = useSocket();
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => shuffle(masterQuizQuestions));
  const [answers, setAnswers] = useState<Answers>({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [copied, setCopied] = useState(false);

  // Notify the NPC companion that the quiz has been mounted
  useEffect(() => {
    if (socket) {
      socket.emit('quiz_started');
    }
  }, [socket]);

  const q = questions[current];
  const answeredCount = Object.values(answers).filter((v) => v !== null && v !== undefined).length;

  useEffect(() => {
    if (!timerOn || submitted) return;
    setSecondsLeft(90);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [current, timerOn, submitted]);

  useEffect(() => {
    if (timerOn && secondsLeft === 0 && !submitted) {
      setCurrent((c) => Math.min(c + 1, questions.length - 1));
    }
  }, [secondsLeft, timerOn, submitted, questions.length]);

  const select = (optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }));
  };

  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    questions.forEach((qq) => {
      if (answers[qq.id] === qq.correctIndex) correct += 1;
    });
    return { correct, total: questions.length, percent: Math.round((correct / questions.length) * 100) };
  }, [submitted, answers, questions]);

  const submit = useCallback(() => {
    setSubmitted(true);
    let correct = 0;
    questions.forEach((qq) => {
      if (answers[qq.id] === qq.correctIndex) correct += 1;
    });
    const percent = Math.round((correct / questions.length) * 100);
    setQuizBestScore(percent);
    if (percent >= 55) {
      confetti({
        particleCount: percent >= 90 ? 160 : 90,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#1e3a8a', '#3b82f6', '#fbbf24', '#34d399'],
      });
    }
  }, [answers, questions, setQuizBestScore]);

  const retake = () => {
    setQuestions(shuffle(masterQuizQuestions));
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setSecondsLeft(90);
  };

  const copyResult = async () => {
    if (!score) return;
    const tier = tierFor(score.percent);
    const text = `React Mastery — Master SDE-1 & SDE-2 Assessment\nScore: ${score.correct}/${score.total} (${score.percent}%)\nTier: ${tier.label}\nBuilt with React 19 · Fiber · Concurrent patterns`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  if (submitted && score) {
    const tier = tierFor(score.percent);
    return (
      <div className="page assessment-page">
        <motion.div
          className="assessment-results"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`score-card ${tier.className}`}>
            <Trophy size={36} />
            <h1>Assessment Complete</h1>
            <div className="score-big">{score.percent}%</div>
            <p>
              {score.correct} / {score.total} correct
            </p>
            <span className="tier-badge">{tier.label}</span>
            {quizBestScore !== null && (
              <p className="best-score">Personal best: {quizBestScore}%</p>
            )}
            <div className="result-actions">
              <button className="btn-assessment primary" onClick={copyResult}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Result for LinkedIn/Resume'}
              </button>
              <button className="btn-assessment ghost" onClick={retake}>
                <RotateCcw size={16} /> Retake Test
              </button>
            </div>
          </div>

          <h2 className="review-heading">Solution Review</h2>
          <div className="review-list">
            {questions.map((qq, idx) => {
              const selected = answers[qq.id];
              const ok = selected === qq.correctIndex;
              return (
                <div key={qq.id} className={`review-item ${ok ? 'correct' : 'incorrect'}`}>
                  <div className="review-item-header">
                    <span className={`level-tag ${qq.level === 'SDE-1' ? 'sde1' : 'sde2'}`}>
                      {qq.level}
                    </span>
                    <span className="q-num">Q{idx + 1}</span>
                    {ok ? (
                      <CheckCircle2 size={18} className="status-icon ok" />
                    ) : (
                      <XCircle size={18} className="status-icon bad" />
                    )}
                    <span className="status-label">{ok ? 'Correct' : 'Incorrect'}</span>
                  </div>
                  <p className="review-question">{qq.question}</p>
                  {qq.codeSnippet && (
                    <pre className="review-code">
                      <code>{qq.codeSnippet}</code>
                    </pre>
                  )}
                  <div className="review-options">
                    {qq.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`review-opt ${
                          i === qq.correctIndex ? 'is-correct' : ''
                        } ${selected === i && i !== qq.correctIndex ? 'is-selected-wrong' : ''} ${
                          selected === i ? 'is-selected' : ''
                        }`}
                      >
                        {opt}
                        {i === qq.correctIndex && <span className="opt-flag">Correct</span>}
                        {selected === i && i !== qq.correctIndex && (
                          <span className="opt-flag yours">Your answer</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="review-explanation">
                    <strong>Why:</strong> {qq.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page assessment-page">
      <div className="page-header">
        <h1 className="page-title">Master SDE-1 & SDE-2 Quiz</h1>
        <p className="page-description">
          20 architectural questions spanning batching, Fiber, hooks, and Concurrent React.
          Submit at the end for a scored review with deep explanations.
        </p>
      </div>

      <div className="assessment-toolbar">
        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="toolbar-meta">
          <span>
            Question {current + 1} / {questions.length}
          </span>
          <span>{answeredCount} answered</span>
          <label className="timer-toggle">
            <Timer size={14} />
            <input
              type="checkbox"
              checked={timerOn}
              onChange={(e) => setTimerOn(e.target.checked)}
            />
            Timer
          </label>
          {timerOn && (
            <span className={`timer-value ${secondsLeft <= 15 ? 'urgent' : ''}`}>
              {secondsLeft}s
            </span>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          className="question-card"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
        >
          <div className="question-meta">
            <span className={`level-tag ${q.level === 'SDE-1' ? 'sde1' : 'sde2'}`}>{q.level}</span>
          </div>
          <h2 className="question-text">{q.question}</h2>
          {q.codeSnippet && (
            <pre className="question-code">
              <code>{q.codeSnippet}</code>
            </pre>
          )}
          <div className="options-list">
            {q.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                className={`option-btn ${answers[q.id] === i ? 'selected' : ''}`}
                onClick={() => select(i)}
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="assessment-nav">
        <button
          className="btn-assessment ghost"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        {current < questions.length - 1 ? (
          <button className="btn-assessment primary" onClick={() => setCurrent((c) => c + 1)}>
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            className="btn-assessment primary submit"
            onClick={submit}
            disabled={answeredCount < questions.length}
            title={
              answeredCount < questions.length
                ? `Answer all questions (${answeredCount}/${questions.length})`
                : 'Submit Assessment'
            }
          >
            <Send size={16} /> Submit Assessment
          </button>
        )}
      </div>

      <div className="question-dots">
        {questions.map((qq, i) => (
          <button
            key={qq.id}
            type="button"
            className={`dot ${i === current ? 'active' : ''} ${
              answers[qq.id] !== null && answers[qq.id] !== undefined ? 'answered' : ''
            }`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MasterAssessment;
