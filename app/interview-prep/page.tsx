"use client";
import "./interviewPrep.css";
import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function InterviewPrepPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [round, setRound] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [errors, setErrors] = useState<{ jobDesc?: string; resume?: string }>(
    {}
  );
  const [questions, setQuestions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const mockQuestions = [
    "Can you walk me through your resume?",
    "What are your key strengths relevant to this role?",
    "Why are you interested in this company and this role?",
    "Describe a challenging project you worked on.",
    "How do you handle tight deadlines and conflicting priorities?",
  ];

  const handleGenerateQuestions = () => {
    const newErrors: { jobDesc?: string; resume?: string } = {};

    if (!jobDesc.trim()) {
      newErrors.jobDesc = "❗ Job description is required.";
    }
    if (!resumeFile) {
      newErrors.resume = "❗ Please upload a resume file.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setQuestions(mockQuestions);
        setLoading(false);
      }, 1500);
    }
  };

  const handleAnalyzeResponse = () => {
    if (!transcript || transcript.length < 5) {
      setFeedback("❗ Please speak a complete response before analyzing.");
      setScore(null);
      return;
    }

    const words = transcript.trim().split(/\s+/);
    let tips = [];
    let totalScore = 0;

    // Length
    if (words.length >= 20) {
      totalScore += 2;
    } else {
      tips.push("Try to expand your answer with more context or examples.");
    }

    // Outcome/impact
    if (
      /result|impact|outcome|achieve|deliver|success|value/i.test(transcript)
    ) {
      totalScore += 3;
    } else {
      tips.push("Consider adding the outcome or impact of your work.");
    }

    // Teamwork
    if (/team|collaborat|group|partner/i.test(transcript)) {
      totalScore += 2;
    } else {
      tips.push("Mention teamwork or collaboration if relevant.");
    }

    // Action verbs
    if (
      /\b(built|created|led|initiated|developed|solved|managed)\b/i.test(
        transcript
      )
    ) {
      totalScore += 2;
    } else {
      tips.push("Use strong action verbs like 'led', 'built', or 'solved'.");
    }

    // Avoid vague terms
    if (!/\b(many|lots|stuff|things)\b/i.test(transcript)) {
      totalScore += 1;
    } else {
      tips.push(
        "Avoid vague terms like 'many', 'stuff', or 'things'. Be specific."
      );
    }

    setScore(totalScore);
    setFeedback(
      tips.length
        ? tips.join(" ")
        : "✅ Great answer! Well structured and complete."
    );
  };

  if (!mounted) return null;
  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support voice recognition.</p>;
  }

  return (
    <div className="interview-prep-container">
      <header className="app-header">
        <h1 className="app-title">
          <span className="icon">🧠</span> Interview Preparation Tool
        </h1>
        <p className="app-subtitle">
          Get ready for your next interview with personalized questions and
          feedback
        </p>
      </header>

      <main className="app-content">
        {/* Round Dropdown */}
        <div className="form-section">
          <label className="form-label">Select Interview Round:</label>
          <select
            className="form-select"
            value={round}
            onChange={(e) => setRound(e.target.value)}
          >
            <option value="">-- Select Round --</option>
            <option value="Round 1">Round 1: Screening</option>
            <option value="Round 2">Round 2: Technical</option>
            <option value="Round 3">Round 3: Managerial</option>
            <option value="Round 4">Round 4: HR/Cultural</option>
            <option value="Other">Other</option>
          </select>

          {round === "Other" && (
            <input
              className="form-input mt-2"
              placeholder="Enter custom round name"
              onChange={(e) => setRound(e.target.value)}
            />
          )}
        </div>

        {/* Job Description */}
        <div className="form-section">
          <label className="form-label">Job Description:</label>
          <textarea
            className={`form-textarea ${errors.jobDesc ? "error" : ""}`}
            rows={5}
            placeholder="Paste the job description here..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
          {errors.jobDesc && <p className="error-message">{errors.jobDesc}</p>}
        </div>

        {/* Resume Upload */}
        <div className="form-section">
          <label className="form-label">Upload Resume:</label>
          <div className={`file-upload ${errors.resume ? "error" : ""}`}>
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setResumeFile(file);
                  setUploadMessage("✅ Resume uploaded successfully.");
                  setErrors((prev) => ({ ...prev, resume: undefined }));
                }
              }}
              className="file-input"
            />
            <div className="file-upload-label">
              <span className="file-upload-text">
                {resumeFile ? resumeFile.name : "Choose a file (PDF or DOCX)"}
              </span>
              <span className="file-upload-button">Browse</span>
            </div>
          </div>
          {uploadMessage && <p className="success-message">{uploadMessage}</p>}
          {errors.resume && <p className="error-message">{errors.resume}</p>}
        </div>

        {/* Generate Button */}
        <div className="action-section">
          <button
            onClick={handleGenerateQuestions}
            className={`generate-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating Questions...
              </>
            ) : (
              "Generate Interview Questions"
            )}
          </button>
        </div>

        {/* Display Questions */}
        {questions.length > 0 && (
          <div className="questions-section">
            <h2 className="section-title">
              <span className="icon">🎤</span> Suggested Interview Questions
            </h2>
            <ul className="questions-list">
              {questions.map((q, index) => (
                <li key={index} className="question-item">
                  <span className="question-text">{q}</span>
                  <button
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(q);
                      window.speechSynthesis.speak(utterance);
                    }}
                    className="read-button"
                  >
                    🔊 Read
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Voice Input Controls */}
        <div className="voice-controls">
          <div className="voice-buttons">
            <button
              onClick={() => {
                resetTranscript();
                setFeedback("");
                setScore(null);
                SpeechRecognition.startListening({ continuous: false });
              }}
              className={`voice-button ${listening ? "active" : ""}`}
            >
              {listening ? "🎙️ Listening..." : "🎙️ Start Voice Input"}
            </button>
            <button
              onClick={SpeechRecognition.stopListening}
              className="voice-button stop"
            >
              🛑 Stop
            </button>
          </div>
          <p className="voice-instructions">
            Press "Start Voice Input" to record your answer to any question
            above
          </p>
        </div>

        {/* Transcript + Feedback + Score */}
        {transcript && (
          <div className="analysis-section">
            <div className="transcript-box">
              <h3 className="analysis-title">Your Response:</h3>
              <p className="transcript-text">{transcript}</p>
            </div>

            <button onClick={handleAnalyzeResponse} className="analyze-button">
              🧠 Analyze My Answer
            </button>

            {feedback && (
              <div
                className={`feedback-box ${
                  score && score >= 7
                    ? "good"
                    : score && score >= 4
                    ? "average"
                    : "poor"
                }`}
              >
                <h3 className="analysis-title">Feedback:</h3>
                <p className="feedback-text">{feedback}</p>
              </div>
            )}

            {score !== null && (
              <div className="score-box">
                <h3 className="analysis-title">Performance Score:</h3>
                <div className="score-container">
                  <div
                    className="score-bar"
                    style={{ width: `${score * 10}%` }}
                  ></div>
                  <span className="score-value">{score}/10</span>
                </div>
                <p className="score-message">
                  {score >= 8
                    ? "Excellent! You're well prepared for this question."
                    : score >= 5
                    ? "Good start! Review the feedback to improve further."
                    : "Needs work. Consider practicing this question again."}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
