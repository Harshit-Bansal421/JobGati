import { useState } from "react";

export default function CareerChatbot() {
  const [aim, setAim] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [finalReport, setFinalReport] = useState(null);

  // Step 1: Ask aim and get dynamic questions
  const startCareer = async () => {
    const res = await fetch("http://localhost:5000/career/start", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ aim })
    });
    const data = await res.json();
    setQuestions(data.questions);
  };

  // Step 2: Evaluate answers
  const evaluate = async () => {
    const res = await fetch("http://localhost:5000/career/evaluate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        aim,
        answers,
        userData: {} // optional: pass dashboard data here
      })
    });

    const data = await res.json();
    setFinalReport(data.report);
  };

  return (
    <div>
      <h2>Career Chatbot</h2>

      {/* Step 1: Aim Input */}
      {questions.length === 0 && !finalReport && (
        <div>
          <input
            value={aim}
            onChange={(e) => setAim(e.target.value)}
            placeholder="What do you want to become?"
          />
          <button onClick={startCareer}>Start</button>
        </div>
      )}

      {/* Step 2: Answering Questions */}
      {questions.length > 0 && !finalReport && (
        <div>
          {questions.map((q, i) => (
            <div key={i}>
              <p>{q}</p>
              <input
                onChange={(e) =>
                  setAnswers({ ...answers, [i]: e.target.value })
                }
              />
            </div>
          ))}
          <button onClick={evaluate}>Get My Career Path</button>
        </div>
      )}

      {/* Final Output */}
      {finalReport && (
        <pre>{JSON.stringify(finalReport, null, 2)}</pre>
      )}
    </div>
  );
}
