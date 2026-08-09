import { state, mount } from "levelojs";
import "./Mind.css";

interface Question {
  id: number;
  q: string;
  opt: string[];
  ans: string;
  exp: string;
}

export function MCQ() {
  const [questions, setQuestions] = state<Question[]>([]);
  const [currentIndex, setCurrentIndex] = state<number>(0);
  const [selectedOpt, setSelectedOpt] = state<string | null>(null);
  const [score, setScore] = state<number>(0);
  const [loading, setLoading] = state<boolean>(true);
  const [showResult, setShowResult] = state<boolean>(false);

  // Derived Reactive Getter: static variable না বানিয়ে function tracker বানো হলো
  const currentQ = () => questions()[currentIndex()];

  const fetchQuestions = async () => {
    const RAW_URL = "https://raw.githubusercontent.com/MotionMind2007/Learno-Mind/main/subjects/english/mcq.json";

    try {
      const res = await fetch(RAW_URL);
      if (!res.ok) throw new Error("Failed to fetch JSON data");

      const data: Question[] = await res.json();
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      
      setQuestions(shuffled.slice(0, 30));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mount এর মাধ্যমে কম্পোনেন্ট রেন্ডারের পর প্রথম ফেচ ফায়ার হবে
  mount(() => {
    fetchQuestions();
  });

  const handleSelect = (opt: string) => {
    if (selectedOpt() !== null) return;
    setSelectedOpt(opt);
    
    const activeQ = currentQ();
    if (activeQ && opt === activeQ.ans) {
      setScore(score() + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex() + 1 < questions().length) {
      setCurrentIndex(currentIndex() + 1);
      setSelectedOpt(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
    setLoading(true);

    fetchQuestions();
  };

  return (
    <div className="mcq-container">
      {loading() ? (
        <div className="mcq-loading">
          <div className="spinner"></div>
          <p>Loading MCQs from Learno-Mind...</p>
        </div>
      ) : showResult() ? (
        <div className="mcq-result">
          <h2>Quiz Completed! 🎉</h2>
          <div className="score-badge">
            {score()} / {questions().length}
          </div>
          <p className="result-text">
            {score() >= 20 ? "Outstanding performance!" : "Keep practicing to improve!"}
          </p>
          <button className="restart-btn" onClick={handleRestart}>
            Try Another 30 Questions 🔄
          </button>
        </div>
      ) : (
        <div className="mcq-card">
          <div className="mcq-header">
            <span className="q-id">Question #{currentQ()?.id}</span>
            <span className="q-counter">{currentIndex() + 1} / {questions().length}</span>
          </div>

          <h3 className="mcq-question">{currentQ()?.q}</h3>

          <div className="mcq-options">
            {currentQ()?.opt.map((opt) => {
              const isSelected = selectedOpt() === opt;
              const isCorrect = opt === currentQ()?.ans;
              const hasAnswered = selectedOpt() !== null;

              let btnClass = "opt-btn";
              if (hasAnswered) {
                if (isCorrect) btnClass += " correct";
                else if (isSelected) btnClass += " wrong";
              }

              return (
                <button
                  key={opt}
                  className={btnClass}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedOpt() !== null && (
            <div className="mcq-exp">
              <strong>ব্যাখ্যা:</strong> {currentQ()?.exp}
            </div>
          )}

          {selectedOpt() !== null && (
            <button className="next-btn" onClick={handleNext}>
              {currentIndex() + 1 === questions().length ? "See Final Score 🏆" : "Next Question →"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}