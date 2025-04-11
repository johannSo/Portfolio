import { FaGithub, FaGitlab, FaLinkedin, FaEnvelope, FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import quizImage from './assets/quiz.png';
import betterImage from './assets/Better.png';
import terminalImage from './assets/terminal.png';

interface ProjectTile {
  title: string;
  description: string;
  link: string;
  image: string;
}

const projects: ProjectTile[] = [
  {
    title: "A Quiz website for school",
    description: "Just a small quiz site for the IT lessons in school",
    link: "https://joni.soppa.de/quiz",
    image: quizImage
  },
  {
    title: "Better text adventure",
    description: "Not completed yet, will go on in a few weeks/months",
    link: "#",
    image: betterImage
  },
  {
    title: "Final Grade: Hacked",
    description: "Just a text adventure about a Hacker student",
    link: "https://github.com/johannSo/BrowserSelector",
    image: terminalImage
  },
];

function App() {
  const [rotationCount, setRotationCount] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    // First check localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }
    // If no saved preference, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Update theme when system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if there's no saved preference
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDark ? 'bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] text-white' : 'bg-gradient-to-b from-[#f5e6d3] to-[#e8d5b5]'}`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 p-3 rounded-full transition-all duration-200 hover:scale-110 transform will-change-transform"
        style={{
          backgroundColor: isDark ? '#f5e6d3' : '#4a3c2c',
          color: isDark ? '#4a3c2c' : '#f5e6d3'
        }}
      >
        {isDark ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
      </button>
      {/* Main Content */}
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-24">
            <div 
              className={`inline-block p-4 rounded-lg shadow-lg mx-auto mb-8 transition-all duration-700 transform will-change-transform hover:[@media(hover:hover)]:cursor-default [@media(hover:none)]:cursor-pointer ${isDark ? 'bg-[#2d2d2d]' : 'bg-white'}`}
              style={{ transform: `rotate(${rotationCount * 360}deg)` }}
              onMouseEnter={() => {
                if (window.matchMedia('(hover: hover)').matches) {
                  setRotationCount(count => count + 1);
                }
              }}
              onClick={() => {
                if (window.matchMedia('(hover: none)').matches) {
                  setRotationCount(count => count + 1);
                }
              }}
            >
              <div className={`border-8 rounded-lg overflow-hidden shadow-inner ${isDark ? 'border-[#f5e6d3]' : 'border-[#8b6b4a]'}`}>
                <img 
                  src={import.meta.env.BASE_URL + 'assets/ptr.png'} 
                  alt="PTR" 
                  className="max-w-[150px] w-full h-auto"
                />
              </div>
            </div>
            <h1 className={`text-5xl font-bold mb-6 font-['Ghibli'] tracking-tight ${isDark ? 'text-[#f5e6d3]' : 'text-[#4a3c2c]'}`}>
              Hi, I'm someone
            </h1>
            <p className={`text-xl max-w-2xl mx-auto font-['Ghibli'] leading-relaxed ${isDark ? 'text-[#e0d1be]' : 'text-[#5a4a3a]'}`}>
              And here you can find some of my projects.
            </p>
            <div className="flex justify-center gap-6 mt-8">
              <a
                href="https://github.com/johannso"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${isDark ? 'bg-[#f5e6d3] text-[#4a3c2c] hover:bg-[#e0d1be] hover:shadow-[#f5e6d3]/20' : 'bg-[#8b6b4a] text-white hover:bg-[#6b4a2a] hover:shadow-[#6b4a2a]/20'}`}
              >
                <FaGithub className="text-xl" />
                <span className="text-base font-medium">GitHub</span>
              </a>
              <a
                href="https://gitlab.com/johannso"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${isDark ? 'bg-[#f5e6d3] text-[#4a3c2c] hover:bg-[#e0d1be] hover:shadow-[#f5e6d3]/20' : 'bg-[#8b6b4a] text-white hover:bg-[#6b4a2a] hover:shadow-[#6b4a2a]/20'}`}
              >
                <FaGitlab className="text-xl" />
                <span className="text-base font-medium">GitLab</span>
              </a>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <a
                key={index}
                data-index={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-[1.02] ${isDark ? 'bg-[#2d2d2d]' : 'bg-[#f5e6d3]'}`}
                style={{ 
                  boxShadow: '0 8px 16px rgba(74, 60, 44, 0.1), 0 4px 8px rgba(74, 60, 44, 0.08)'
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 transform will-change-transform"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#1a1a1a]/90 via-[#1a1a1a]/50' : 'from-[#4a3c2c]/90 via-[#4a3c2c]/50'} to-transparent`} />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${isDark ? 'text-[#f5e6d3] group-hover:text-[#e0d1be]' : 'text-[#4a3c2c] group-hover:text-[#6b4a2a]'}`}>
                    {project.title}
                  </h3>
                  <p className={`transition-colors duration-300 leading-relaxed ${isDark ? 'text-[#e0d1be] group-hover:text-[#f5e6d3]' : 'text-[#5a4a3a] group-hover:text-[#4a3c2c]'}`}>
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`border-t transition-colors duration-200 ${isDark ? 'bg-[#1a1a1a] border-[#2d2d2d]' : 'bg-[#4a3c2c] border-[#5a4a3a]'}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-[#f5e6d3]' : 'text-[#f5e6d3]'}`}>Contact</h3>
              <div className="space-y-4">
                <a
                  href="mailto:john.doe010424@protonmail.com"
                  className={`flex items-center gap-3 transition-transform duration-200 hover:translate-x-1 will-change-transform ${isDark ? 'text-[#e0d1be] hover:text-[#f5e6d3]' : 'text-[#f5e6d3] hover:text-white'}`}
                >
                  <FaEnvelope className="text-xl" />
                  <span className="text-base">john.doe010424@protonmail.com</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-[#f5e6d3]' : 'text-[#f5e6d3]'}`}>Quick Links</h3>
              <div className="space-y-4">
                <a
                  href="https://github.com/johannso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 transition-transform duration-200 hover:translate-x-1 will-change-transform ${isDark ? 'text-[#e0d1be] hover:text-[#f5e6d3]' : 'text-[#f5e6d3] hover:text-white'}`}
                >
                  <FaGithub className="text-xl" />
                  <span className="text-base">GitHub</span>
                </a>
                <a
                  href="https://gitlab.com/johannso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 transition-transform duration-200 hover:translate-x-1 will-change-transform ${isDark ? 'text-[#e0d1be] hover:text-[#f5e6d3]' : 'text-[#f5e6d3] hover:text-white'}`}
                >
                  <FaGitlab className="text-xl" />
                  <span className="text-base">GitLab</span>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 transition-transform duration-200 hover:translate-x-1 will-change-transform ${isDark ? 'text-[#e0d1be] hover:text-[#f5e6d3]' : 'text-[#f5e6d3] hover:text-white'}`}
                >
                  <FaLinkedin className="text-xl" />
                  <span className="text-base">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div>
              <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-[#f5e6d3]' : 'text-[#f5e6d3]'}`}>About</h3>
              <p className={`text-base ${isDark ? 'text-[#e0d1be]' : 'text-[#f5e6d3]'}`}>
                © {new Date().getFullYear()} J. S. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
