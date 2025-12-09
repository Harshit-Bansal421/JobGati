export const analyzeSkillGapAPI = async (userSkills, jobRole) => {
  const res = await fetch("https://jobgati-1.onrender.com/api/skills/analyze-gap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userSkills, jobRole }),
  });

  return await res.json();
};