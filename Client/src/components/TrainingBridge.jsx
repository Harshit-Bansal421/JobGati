/**
 * TrainingBridge Component - Training & Education Recommendations
 * 
 * This component helps users find relevant training courses and nearby training centers.
 * It displays both online micro-courses and physical training center locations.
 * Part of the JobGati skill development journey.
 */

import React, { useState } from 'react';

const jobsData = {
  jobs: [
    {
      id: 11,
      jobTitle: "Junior Web Developer",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      courses: {
        onlineFree: [
          {
            title: "Full Web Development – freeCodeCamp",
            link: "https://www.freecodecamp.org/"
          }
        ],
        onlinePremium: [
          {
            id: 101,
            title: "The Complete 2024 Web Development Bootcamp",
            provider: "Udemy (Dr. Angela Yu)",
            rating: "4.8 ⭐ (380k ratings)",
            price: "₹3,499",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/1565838_e54e_18.jpg",
            link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/"
          }
        ],
        offline: [
          {
            id: 203,
            title: "MERN Stack Classroom Training",
            provider: "TISA Tech",
            location: "Govindpura, Jaipur",
            duration: "6 Months",
            type: "Offline Bootcamp",
            thumbnail: "https://www.tisatech.in/assets/img/hero-img.png",
            googleMapsLink: "https://maps.google.com/?q=TISA+Training+Institute+Jaipur"
          }
        ]
      }
    },

    {
      id: 7,
      jobTitle: "Solar Panel Technician",
      skills: ["Solar installation", "System maintenance", "Electrical basics"],
      courses: {
        onlinePremium: [
          {
            id: 102,
            title: "Solar Energy: PV System Design & Installation",
            provider: "Udemy",
            rating: "4.5 ⭐",
            price: "₹2,499",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/2301686_7952_3.jpg",
            link: "https://www.udemy.com/course/solar-energy-etabs-pv-system-design-installation/"
          }
        ],
        offline: [
          {
            id: 201,
            title: "Certified Solar PV Installer",
            provider: "Solar Training Centre Jaipur",
            location: "Bais Godam, Jaipur",
            duration: "45 Days",
            type: "Offline (Classroom + Site)",
            thumbnail:
              "https://content3.jdmagicbox.com/comp/jaipur/d7/0141px141.x141.200702015317.y2c8/catalogue/solar-training-centre-bais-godam-jaipur-institutes-b84g43a2g5.jpg",
            googleMapsLink: "https://maps.google.com/?q=Solar+Training+Centre+Jaipur"
          }
        ]
      }
    },

    {
      id: 9,
      jobTitle: "Electrician",
      skills: ["Wiring", "Circuits", "Safety"],
      courses: {
        onlinePremium: [
          {
            id: 104,
            title: "Diploma in Electrical Studies",
            provider: "Alison",
            rating: "Certified",
            price: "Get Quote",
            thumbnail:
              "https://cdn01.alison-static.net/courses/196/alison_courseware_intro_196.jpg",
            link: "https://alison.com/course/diploma-in-electrical-studies"
          }
        ],
        offline: [
          {
            id: 202,
            title: "ITI Electrician Trade (NCVT)",
            provider: "Ajmera ITI",
            location: "Sodala, Jaipur",
            duration: "2 Years",
            type: "Offline (Diploma)",
            thumbnail:
              "https://ajmeraiti.com/wp-content/uploads/2020/02/Ajmera-ITI-Electrician-Lab.jpg",
            googleMapsLink: "https://maps.google.com/?q=Ajmera+ITI+Sodala+Jaipur"
          }
        ]
      }
    },

    {
      id: 3,
      jobTitle: "Carpentry",
      skills: ["Woodworking", "Furniture making"],
      courses: {
        onlinePremium: [
          {
            id: 103,
            title: "Woodworking: Fundamentals of Furniture Making",
            provider: "Udemy",
            rating: "4.7 ⭐",
            price: "₹1,299",
            thumbnail: "https://img-c.udemycdn.com/course/750x422/1638206_6454.jpg",
            link: "https://www.udemy.com/course/woodworking-fundamentals-of-furniture-making/"
          }
        ],
        offline: [
          {
            id: 204,
            title: "Vocational Carpentry Workshop",
            provider: "Aditya Technical Classes",
            location: "Jagatpura, Jaipur",
            duration: "3 Months",
            type: "Offline Workshop",
            thumbnail:
              "https://5.imimg.com/data5/SELLER/Default/2023/1/YV/WO/GA/47402636/carpentry-training-service-500x500.jpg",
            googleMapsLink: "https://maps.google.com/?q=Aditya+Technical+Classes+Jaipur"
          }
        ]
      }
    }
  ]
};

/**
 * TrainingBridge functional component
 * @param {Object} t - Translation object containing localized text
 * @param {Function} onFindTraining - Optional callback when training is found
 */
const TrainingBridge = ({ t, onFindTraining }) => {
  // State to store training search results
  const [trainingResult, setTrainingResult] = useState(null);

  const handleFindTraining = () => {
    // Simulate API call to find training
    setTimeout(() => {
      setTrainingResult(jobsData);
      if (onFindTraining) onFindTraining();
    }, 1500); 
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-[1000px] mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-dark">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-[600px] mx-auto">{t.description}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          {!trainingResult && (
             <div className="text-center">
                <button
                    className="bg-primary text-white hover:bg-blue-600 px-5 py-2.5 rounded-md font-semibold cursor-pointer transition-all duration-300"
                    onClick={handleFindTraining}
                >
                    {t.findTrainingBtn}
                </button>
             </div>
          )}

          {trainingResult && (
            <div className="space-y-12">
              {trainingResult.jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="mb-6 border-b pb-4">
                    <h3 className="text-2xl font-bold text-dark mb-2">{job.jobTitle}</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map(skill => (
                            <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                  </div>

                  {/* Online Premium Courses */}
                  {job.courses.onlinePremium && job.courses.onlinePremium.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">💻</span> Online Premium Courses
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {job.courses.onlinePremium.map(course => (
                                <div key={course.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                                    <img src={course.thumbnail} alt={course.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <h5 className="font-semibold text-dark line-clamp-2">{course.title}</h5>
                                            <p className="text-sm text-gray-500 mt-1">{course.provider}</p>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between gap-4">
                                            <span className="text-yellow-500 text-sm font-medium">{course.rating}</span>
                                            <span className="font-bold text-primary">{course.price}</span>
                                        </div>
                                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="mt-3 text-sm text-primary font-semibold hover:underline">
                                            View Course →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                      </div>
                  )}

                  {/* Offline Training */}
                  {job.courses.offline && job.courses.offline.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">🏢</span> Offline Training Centers
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {job.courses.offline.map(course => (
                                <div key={course.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                                    <img src={course.thumbnail} alt={course.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                                    <div className="flex flex-col justify-between w-full">
                                        <div>
                                            <h5 className="font-semibold text-dark line-clamp-2">{course.title}</h5>
                                            <p className="text-sm text-gray-500 mt-1">{course.provider}</p>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-600">
                                            <p>📍 {course.location}</p>
                                            <p>⏱️ {course.duration} • {course.type}</p>
                                        </div>
                                        <a href={course.googleMapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 text-sm text-primary font-semibold hover:underline">
                                            View on Map →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                      </div>
                  )}
                  
                  {/* Online Free Courses (Optional, if needed) */}
                  {job.courses.onlineFree && job.courses.onlineFree.length > 0 && (
                      <div className="mt-6 pt-4 border-t">
                          <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Free Resources</h4>
                          <ul className="list-disc pl-5 space-y-1">
                              {job.courses.onlineFree.map((course, idx) => (
                                  <li key={idx} className="text-sm">
                                      <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                          {course.title}
                                      </a>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingBridge;
