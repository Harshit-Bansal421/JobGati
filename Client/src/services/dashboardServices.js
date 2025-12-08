export const saveDashboardData = async ({
  clerkUserId,
  phone,
  location,
  desiredJobPosition,
  skills,
  educationLevel,
  aboutYou
}) => {
  const response = await fetch("http://localhost:5000/api/dashboard/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clerkUserId,
      phone,
      location,
      desiredJobPosition,
      skills,
      educationLevel,
      aboutYou,
    }),
  });

  return await response.json();
};
