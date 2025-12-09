import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-500 selection:text-white">

      {/* 1. HERO SECTION (Dark Blue/Slate) */}
      <div className="relative overflow-hidden bg-slate-950 py-20 sm:py-32 text-white">
        {/* Background Blur Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            We Don't Just Find Jobs. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              We Build Careers.
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            JobGati is the first <strong>AI-Agentic Career Platform</strong> that talks to you like a mentor, assesses your true potential, and builds a hyper-personalized roadmap to get you hired.
          </p>
        </div>
      </div>

      {/* 2. THE PROBLEM VS SOLUTION (Dark Section) */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">The Problem with "Generic" Roadmaps</h2>
              <p className="text-slate-300 text-lg">
                Most career sites give you a generic checklist: <em>"Learn Python, then SQL."</em>
                But they don't know <strong>YOU</strong>. They don't know if you prefer videos over books, if you have 2 hours or 10 hours a day, or if you're a visual learner.
              </p>
              <div className="pl-6 border-l-4 border-blue-500 bg-slate-800/50 py-4 pr-4 rounded-r-lg">
                <p className="text-lg italic text-slate-200">
                  "Finding a roadmap is easy. Finding <strong>your</strong> roadmap is hard."
                </p>
              </div>
            </div>

            {/* Feature Card Visual - Dark Mode Style */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
                The JobGati Way
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-lg text-xl">🤖</div>
                  <div>
                    <h4 className="text-white font-bold">Interactive Interview</h4>
                    <p className="text-slate-300 text-sm">Our AI Agent chats with you to understand your real depth, not just your resume keywords.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg text-xl">🎯</div>
                  <div>
                    <h4 className="text-white font-bold">Skill Gap Analysis</h4>
                    <p className="text-slate-300 text-sm">We don't guess. We verify your skills and pinpoint exactly what is missing for your dream role.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-lg text-xl">🗺️</div>
                  <div>
                    <h4 className="text-white font-bold">Dynamic Roadmaps</h4>
                    <p className="text-slate-300 text-sm">A week-by-week plan tailored to <em>your</em> schedule, learning style, and budget.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HOW IT WORKS (Blue Section) */}
      <div className="bg-blue-600 py-20 border-y border-blue-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Powered by Agentic AI</h2>
            <p className="text-blue-100">Built for the Smart India Hackathon using cutting-edge technology.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🧠"
              title="Grok & Llama 3.3"
              desc="Leveraging 70B parameter models to conduct human-like interviews and understand context better than any static form."
            />
            <FeatureCard
              icon="⚡"
              title="Real-time Analysis"
              desc="No waiting. Our Agentic Workflow analyzes your responses instantly to adapt the next question dynamically."
            />
            <FeatureCard
              icon="🌍"
              title="Universal Fit"
              desc="Whether you want to be a Coder, a Chef, or a Pilot—our logic adapts to ANY industry requirements seamlessly."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-blue-100 hover:border-blue-400 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer">
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
