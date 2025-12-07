import React, { useState } from 'react';
import { Menu, X, Users, Store, ShieldCheck, Megaphone, Share2, MapPin, UserCheck } from 'lucide-react';

const JobGatiAbout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">

      {/* Hero Image Section - Overlapping with Text Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-20 relative z-20">
        <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[16/9] sm:aspect-[2.4/1] bg-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1556740714-a8395b3bf3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Young Indian men at a local shop" 
            className="w-full h-full object-cover"
          />
          {/* Overlay Gradient & Text */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-4xl mb-3 drop-shadow-lg leading-tight">
              Democratizing Employment<br className="hidden sm:block" /> for the Real India
            </h2>
            <p className="text-blue-100 text-sm sm:text-lg font-medium drop-shadow-md tracking-wide">
              Local Indian youth in index & shopkeepers.
            </p>
          </div>
        </div>
      </div>

      {/* "More Than Just a Job Portal" Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Blue Pill Badge */}
          <div className="inline-block bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold text-lg mb-8 shadow-md">
            More Than Just a Job Portal
          </div>
          
          <p className="max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed mb-16 px-4">
            We aren't just a database; we are a community-driven ecosystem designed specifically 
            for Tier-2 and Tier-3 cities, connecting daily wagers and skilled youth with 
            hyperlocal opportunities.
          </p>

          <div className="grid md:grid-cols-3 gap-8 px-4">
            {/* Card 1: Job Seekers */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-xl transition-shadow border border-slate-50">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                <UserCheck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Job Seekers</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-2">
                We give local youth access to interesting opportunities near them, verifying their skills.
              </p>
            </div>

            {/* Card 2: Local Businesses */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-xl transition-shadow border border-slate-50">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Store className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Local Businesses</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-2">
                Local shops and SMEs get security and speed, allowing them to hire trusted staff instantly.
              </p>
            </div>

            {/* Card 3: Communities */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-xl transition-shadow border border-slate-50">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Communities</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-2">
                We foster community growth, ensuring money stays within the local ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            <div className="md:w-1/2 text-left">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Why We Built This
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                We realized that the current job market ignores the "Real India." Most platforms 
                cater to corporate white-collar jobs in metros, leaving behind millions of 
                talented workers in smaller towns.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                JobGati leverages the power of hyperlocal connectivity. We built this to 
                remove the friction of middlemen, giving dignity and direct access to 
                shuttering carpenters, retail staff, and delivery partners across the country.
              </p>
            </div>
            
            <div className="md:w-1/2 w-full flex justify-center">
               <div className="relative w-full max-w-lg">
                <img 
                  src="https://img.freepik.com/free-vector/isometric-map-concept_23-2147746599.jpg?w=740&t=st=1701967200~exp=1701967800~hmac=abcdef" 
                  alt="Isometric Map" 
                  className="w-full drop-shadow-xl"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src="https://via.placeholder.com/600x450/3b82f6/ffffff?text=Hyperlocal+Map+Illustration";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-16">
            Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="w-20 h-20 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Trust First</h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed px-8">
                Trust inherent in verification and reliable conduct.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Megaphone className="w-20 h-20 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Voice for All</h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed px-8">
                Voice has directed noticing and voice for all.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center group cursor-default">
              <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Share2 className="w-20 h-20 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hyperlocal Impact</h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed px-8">
                Hyperlocal impact to shecrols or local business.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobGatiAbout;