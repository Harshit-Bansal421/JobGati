/**
 * Jooble API Service
 * Fetches real job listings from Jooble API via backend proxy
 * Falls back to mock data if API fails
 */

const BACKEND_URL = 'http://localhost:5000';

// Mock job data for fallback
const getMockJobs = (keywords, location) => {
  return [
    {
      id: '1',
      title: `${keywords} - Senior Position`,
      company: 'Tech Solutions India',
      location: location,
      salary: '₹8L - ₹15L per year',
      description: `We are looking for an experienced ${keywords} to join our growing team. Must have 3+ years of experience in relevant technologies.`,
      url: 'https://example.com/job1',
      updated: new Date().toISOString(),
      type: 'Full-time'
    },
    {
      id: '2',
      title: `${keywords} - Mid Level`,
      company: 'Digital Innovations Pvt Ltd',
      location: location,
      salary: '₹5L - ₹10L per year',
      description: `Join our team as a ${keywords}. Work on exciting projects with modern technologies. 2+ years experience required.`,
      url: 'https://example.com/job2',
      updated: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      type: 'Full-time'
    },
    {
      id: '3',
      title: `Junior ${keywords}`,
      company: 'StartUp Hub',
      location: location,
      salary: '₹3L - ₹6L per year',
      description: `Entry-level position for ${keywords}. Great learning opportunity for freshers and those with 0-1 years of experience.`,
      url: 'https://example.com/job3',
      updated: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      type: 'Full-time'
    },
    {
      id: '4',
      title: `${keywords} - Remote`,
      company: 'Global Tech Corp',
      location: 'Remote',
      salary: '₹10L - ₹18L per year',
      description: `Remote ${keywords} position. Work from anywhere in India. Must have strong communication skills and 4+ years experience.`,
      url: 'https://example.com/job4',
      updated: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      type: 'Remote'
    },
    {
      id: '5',
      title: `Lead ${keywords}`,
      company: 'Enterprise Solutions',
      location: location,
      salary: '₹15L - ₹25L per year',
      description: `Leadership role for experienced ${keywords}. Lead a team of developers and work on enterprise-level projects.`,
      url: 'https://example.com/job5',
      updated: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      type: 'Full-time'
    }
  ];
};

/**
 * Fetch jobs from Jooble API through backend proxy
 * @param {string} keywords - Job title/keywords to search for
 * @param {string} location - Location (default: 'India')
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Array>} Array of job listings
 */
export const fetchJoobleJobs = async (keywords, location = 'India', page = 1) => {
    try {
        console.log('🔍 Fetching jobs from Jooble via backend:', keywords);

        const response = await fetch(`${BACKEND_URL}/api/jooble/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: keywords,
                location: location,
                page: page
            })
        });

        if (!response.ok) {
            console.warn('⚠️ Backend API failed, using mock data');
            return getMockJobs(keywords, location);
        }

        const data = await response.json();

        // If no jobs returned, use mock data
        if (!data.jobs || data.jobs.length === 0) {
            console.warn('⚠️ No jobs from API, using mock data');
            return getMockJobs(keywords, location);
        }

        // Format the response
        const jobs = data.jobs.map(job => ({
            id: job.id || Math.random().toString(36).substr(2, 9),
            title: job.title,
            company: job.company || 'Company Not Listed',
            location: job.location || location,
            salary: job.salary || 'Salary not specified',
            description: job.snippet || 'No description available',
            url: job.link,
            updated: job.updated || new Date().toISOString(),
            type: job.type || 'Full-time'
        }));

        console.log(`✅ Found ${jobs.length} jobs from Jooble`);
        return jobs;

    } catch (error) {
        console.error('❌ Error fetching Jooble jobs:', error);
        console.log('📦 Using mock data as fallback');
        return getMockJobs(keywords, location);
    }
};
