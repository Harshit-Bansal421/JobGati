import axios from "axios";

export const fetchCourseraCourses = async (skill) => {
  try {
    const url = "https://api.jsonserve.com/7g7ZKy"; // Free Coursera dataset API
    const response = await axios.get(url);

    return response.data
      .filter(course =>
        course.title.toLowerCase().includes(skill.toLowerCase()) ||
        course.skills?.join(" ").toLowerCase().includes(skill.toLowerCase())
      )
      .slice(0, 8); // limit results
  } catch (err) {
    console.error("Coursera API Error:", err);
    return [];
  }
};