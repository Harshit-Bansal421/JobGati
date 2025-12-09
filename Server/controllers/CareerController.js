import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const startCareer = async (req, res) => {
  try {
    res.json({ success: true, message: "Career Start API working!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const evaluate = async (req, res) => {
  try {
    res.json({ success: true, message: "Career Evaluate API working!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
