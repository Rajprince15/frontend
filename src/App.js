import { useState, useEffect, useRef } from 'react';
import '@/App.css';

// Import certificate images
import internshipCert from '@/assets/certificates/internship certificate.pdf';
import eduskillCert from '@/assets/certificates/Eduskill cohort 13 internship Java full stack.pdf';
import sihCert from '@/assets/certificates/SIH 2025.png';
import codeAstraCert from '@/assets/certificates/codeAstra.jpg';
import iotCert from '@/assets/certificates/IOTcertificatesAll_final-15.pdf';

function App() {
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [modalImage, setModalImage] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const canvasRef = useRef(null);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference and apply to document
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Typing animation effect
  useEffect(() => {
    const text = 'Full-Stack Developer | AI Enthusiast | Problem Solver';
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Neural Network Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;
    const connectionDistance = 180;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 1)');
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open email client
    window.location.href = `mailto:princeraj1504@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const techExpertise = [
    {
      id: 1,
      title: 'Full-Stack Development',
      description: 'Crafting seamless web experiences from database to UI with modern frameworks and best practices',
      tags: ['React.js', 'Node.js', 'HTML5', 'CSS3', 'JavaScript'],
      icon: '🌐',
      proficiency: 85
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems using deep learning architectures and ML algorithms for real-world impact',
      tags: ['Python', 'ResNet', 'Deep Learning', 'Data Analysis'],
      icon: '🤖',
      proficiency: 80
    },
    {
      id: 3,
      title: 'Database Architecture',
      description: 'Designing scalable database solutions and optimizing queries for high-performance applications',
      tags: ['MySQL', 'Database Design', 'Query Optimization'],
      icon: '💾',
      proficiency: 75
    },
    {
      id: 4,
      title: 'Backend Engineering',
      description: 'Developing robust server-side systems and RESTful APIs for enterprise-grade applications',
      tags: ['Java', 'Spring Boot', 'FastAPI', 'REST APIs'],
      icon: '☕',
      proficiency: 78
    }
  ];

  const techStack = [
    { name: 'Python', color: '#3776AB' },
    { name: 'Java', color: '#007396' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'React.js', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'HTML5', color: '#E34F26' },
    { name: 'CSS3', color: '#1572B6' },
    { name: 'Tailwind CSS', color: '#06B6D4' },
    { name: 'Flask', color: '#000000' },
    { name: 'FastAPI', color: '#009688' },
    { name: 'TensorFlow', color: '#FF6F00' },  
    { name: 'Keras', color: '#D00000' }, 
    { name: 'MySQL', color: '#4479A1' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'Git', color: '#F05032' },
    { name: 'GitHub', color: '#181717' },
    { name: 'ResNet', color: '#FF6F00' },
    { name: 'Cesium', color: '#67C7EA' },
    { name: 'WebXR', color: '#8B5CF6' }
  ];

  const projects = [
    {
      badge: 'Deep Learning',
      title: 'AI-Powered Cancer Detection System',
      role: 'Database Manager',
      period: 'Oct 2024 – Dec 2024',
      description: 'Created a full-stack web application with real-time visualization for cancer detection using advanced deep learning models, achieving 99% accuracy.',
      tags: ['YOLOv8', 'EfficientB3Net', 'React.js', 'Python', 'Real-time Processing'],
      impact: '99% Accuracy'
    },
    {
      badge: 'Full-Stack',
      title: 'Hospital Management Platform',
      role: 'Full-Stack Developer',
      period: 'Jan 2025 – Mar 2025',
      description: 'Engineered a comprehensive healthcare management system handling patient records, appointment scheduling, and billing operations with intuitive UX for 500+ concurrent users.',
      tags: ['Java', 'SQL', 'HTML5', 'CSS3', 'JavaScript', 'System Design'],
      impact: 'Data-Driven'
    },
    {
      badge: 'SIH 2025',
      title: 'Explore Jharkhand - AR/VR Tourism Platform',
      role: 'Team Lead',
      period: 'Aug 2025 – Oct 2025',
      description: 'Led a 6-member team to Top 25 in Smart India Hackathon, creating an immersive tourism platform with AR/VR experiences, AI trip planning, blockchain-verified bookings, and integrated UPI payments.',
      tags: ['React.js', 'FastAPI', 'MySQL', 'Cesium', 'WebXR', 'AI', 'Blockchain'],
      impact: 'Top 25 out of 500+ teams'
    }
  ];

  const internships = [
    {
      title: 'AI & Machine Learning Intern',
      organization: 'Chandigarh College of Engineering and Technology (PU)',
      period: 'May 2025 – Jul 2025',
      description: 'Implemented production-grade ML models for real-world datasets, mastering data preprocessing pipelines, model training optimization, and performance evaluation under expert faculty mentorship.',
      icon: '🔬',
      image: internshipCert,
      skills: ['Python', 'ML Algorithms', 'Data Preprocessing', 'Model Evaluation']
    },
    {
      title: 'Java Full Stack Developer Intern',
      organization: 'EduSkills (Cohort 13)',
      period: 'Mar 2024 – May 2024',
      description: 'Completed intensive virtual internship mastering enterprise full-stack development with Java ecosystem, Spring Boot framework, React frontend, and MySQL database integration with hands-on REST API development.',
      icon: '💻',
      image: eduskillCert,
      skills: ['Java', 'Spring Boot', 'React',,'HTML','CSS', 'MySQL', 'REST APIs']
    }
  ];

  const achievements = [
    {
      title: 'Smart India Hackathon 2025 — University Pre-Qualifier (Galgotias University)',
      subtitle: 'University Pre-Qualifiers - Top 25',
      description:
        'Led a cross-functional team of 6 developers at Galgotias University to build Explore Jharkhand\n'+
        '• An innovative AR/VR tourism platform integrating cutting-edge technologies: AI-powered trip planning, blockchain verification system, and seamless UPI payment gateway. \n ' +
        '• Contributed to system architecture, project coordination, and presentation for SIH internal selection.',
      icon: '🏆',
      image: sihCert,
      highlight: 'Ranked 25th among 500+ participating teams'
    },
    {
      title: 'Code Astra Hackathon',
      subtitle: 'IEEE, Galgotias University',
      description:
        'Competed in the "AI in Healthcare" category, developing a full-stack web application with real-time visualization for cancer detection using advanced deep learning models (YOLOv8 and EfficientB3Net), achieving 99% accuracy. \n' +
        '• Managed the database design and integration, ensuring efficient data handling and seamless communication between the backend and the ML models for real-time processing.',
      icon: '🎯',
      image: codeAstraCert,
      highlight: 'AI in Healthcare Theme'
    }
  ];



  const certificates = [
    {
      title: 'Python for Data Science',
      issuer: 'Kaggle',
      year: '2025',
      link: 'https://www.kaggle.com/learn/certification/princeraj15/python',
      image: null,
      category: 'Data Science'
    },
    {
      title: 'Pandas for Data Science',
      issuer: 'Kaggle',
      year: '2025',
      link: 'https://www.kaggle.com/learn/certification/princeraj15/pandas',
      image: null,
      category: 'Data Science'
    },
    {
      title: 'Data Science and Analytics',
      issuer: 'GUVI',
      year: '2025',
      link: 'https://www.guvi.in/verify-certificate?id=5w41E40C3857vtV71R',
      image: null,
      category: 'Analytics'
    },
    {
      title: 'MySQL Database Management',
      issuer: 'GUVI',
      year: '2025',
      link: 'https://www.guvi.in/verify-certificate?id=4f063349eF1S4D7745',
      image: null,
      category: 'Database'
    },
    {
      title: 'Java Programming',
      issuer: 'GUVI',
      year: '2025',
      link: 'https://www.guvi.in/verify-certificate?id=7d215z3BAj5781L4c2',
      image: null,
      category: 'Programming'
    },
    {
      title: '100 Days of Advanced Python',
      issuer: 'GUVI',
      year: '2025',
      link: 'https://www.guvi.in/verify-certificate?id=H1E6rh0921T0671cW1',
      image: null,
      category: 'Python'
    },
    {
      title: 'IoT Bootcamp Workshop',
      issuer: 'Galgotias University',
      year: '2024',
      link: null,
      image: iotCert,
      category: 'IoT'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} ${isDarkMode ? 'text-white' : 'text-gray-900'} relative overflow-hidden transition-colors duration-500`}>
      {/* Neural Network Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" style={{ opacity: isDarkMode ? 1 : 0.3 }} />

      {/* Header with Logo and Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${isDarkMode ? 'bg-black/40 border-cyan-500/30' : 'bg-white/40 border-cyan-500/50'} border-b shadow-lg shadow-cyan-500/10 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Professional Logo */}
          <div className="professional-logo" data-testid="logo">
            <div className="logo-inner">
              <span className="logo-text">PR</span>
            </div>
            <div className="logo-ring"></div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8" data-testid="nav-menu">
            <a href="#home" className={`nav-link ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-gray-800 hover:text-cyan-600'} transition-colors font-medium`}>
              Home
            </a>
            <a href="#expertise" className={`nav-link ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-gray-800 hover:text-cyan-600'} transition-colors font-medium`}>
              Expertise
            </a>
            <a href="#projects" className={`nav-link ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-gray-800 hover:text-cyan-600'} transition-colors font-medium`}>
              Projects
            </a>
            <a href="#internships" className={`nav-link ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-gray-800 hover:text-cyan-600'} transition-colors font-medium`}>
              Experience
            </a>
            <a href="#achievements" className={`nav-link ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-gray-800 hover:text-cyan-600'} transition-colors font-medium`}>
              Achievements
            </a>
            <a href="#certifications" className={`nav-link ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-gray-800 hover:text-cyan-600'} transition-colors font-medium`}>
              Certifications
            </a>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              data-testid="theme-toggle"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <span className="theme-icon">☀️</span>
              ) : (
                <span className="theme-icon">🌙</span>
              )}
            </button>
            
            <a href="#contact" className="cyber-button-small px-6 py-2">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 rounded-full text-sm text-cyan-400 font-semibold">
                🚀 Open to Opportunities
              </span>
            </div>
            <h1 className={`text-7xl md:text-9xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Prince Raj
            </h1>
            <div className="h-12 md:h-16">
              <p className="text-3xl md:text-4xl text-cyan-400 font-light tracking-wider neon-glow typing-effect">
                {typedText}<span className="typing-cursor">|</span>
              </p>
            </div>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto mt-6 leading-relaxed`}>
              <span className="font-semibold text-cyan-400">Computer Science @ Galgotias University</span> | Transforming ideas into elegant code
              <br />
              Exploring <span className="text-purple-400 font-semibold">AI/ML</span>, <span className="text-green-400 font-semibold">Full-Stack Development</span>, and <span className="text-orange-400 font-semibold">Data Science</span>
            </p>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto italic`}>
              "Building tomorrow's solutions with today's cutting-edge technologies"
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <a
                href="#projects"
                className="cyber-button px-8 py-4 text-lg font-semibold"
                data-testid="view-work-btn"
              >
                Explore My Work
              </a>
              <a
                href="#contact"
                className="cyber-button-outline px-8 py-4 text-lg font-semibold"
                data-testid="get-in-touch-btn"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </section>

        {/* Technical Expertise */}
        <section id="expertise" className="py-20 px-4 scroll-animate" data-testid="technical-expertise-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 gradient-text">
                Technical Expertise
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
                Mastering modern technologies to build next-generation applications
              </p>
              <p className="text-cyan-400 mt-4">✨ Click cards to view proficiency levels</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techExpertise.map((tech) => (
                <div
                  key={tech.id}
                  className={`tech-card-3d p-6 cursor-pointer transition-all duration-500 ${
                    activeCard === tech.id ? 'active scale-105' : ''
                  }`}
                  onClick={() => setActiveCard(activeCard === tech.id ? null : tech.id)}
                  data-testid={`tech-card-${tech.id}`}
                >
                  <div className="text-5xl mb-4">{tech.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400">{tech.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4 leading-relaxed`}>{tech.description}</p>
                  
                  {/* Progress Bar */}
                  {activeCard === tech.id && (
                    <div className="mb-4 animate-fade-in">
                      <div className="flex justify-between mb-2">
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Proficiency</span>
                        <span className="text-xs text-cyan-400 font-bold">{tech.proficiency}%</span>
                      </div>
                      <div className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'} rounded-full h-2 overflow-hidden`}>
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${tech.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {tech.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 px-4 overflow-hidden scroll-animate" data-testid="tech-stack-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Technical Arsenal
            </h2>
            <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-12 text-lg`}>
              Powering innovation through modern tools, frameworks, and languages.
            </p>
            <div className="tech-stack-scroll">
              <div className="tech-stack-track">
                {[...techStack, ...techStack].map((tech, idx) => (
                  <div key={idx} className="tech-badge-enhanced" style={{'--badge-color': tech.color}}>
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-4 scroll-animate" data-testid="projects-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Featured Projects
            </h2>
            <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-12 text-lg`}>
              Where innovation meets implementation - Real-world solutions, measurable impact
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div key={idx} className="project-card-enhanced p-6" data-testid={`project-card-${idx}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-xs font-bold text-green-400 inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50">
                      {project.badge}
                    </div>
                    {project.impact && (
                      <div className="text-xs font-bold text-purple-400 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50">
                        {project.impact}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400">{project.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm text-purple-400 font-semibold">{project.role}</p>
                    <span className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{project.period}</p>
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4 leading-relaxed`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internships */}
        <section id="internships" className="py-20 px-4 scroll-animate" data-testid="internships-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Professional Experience
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              Gaining real-world expertise and industry-level skills
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {internships.map((internship, idx) => (
                <div key={idx} className="award-card-enhanced p-6" data-testid={`internship-card-${idx}`}>
                  <div className="text-4xl mb-4">{internship.icon}</div>
                  <h4 className="text-xl font-bold mb-2 text-cyan-400">{internship.title}</h4>
                  <p className="text-sm text-purple-400 mb-1 font-semibold">{internship.organization}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} mb-3`}>{internship.period}</p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>{internship.description}</p>
                  
                  {/* Skills learned */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {internship.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {internship.image && (
                    <button
                      onClick={() => setModalImage(internship.image)}
                      className="cyber-button-small px-4 py-2 text-sm"
                      data-testid={`view-internship-cert-${idx}`}
                    >
                      View Certificate 🔍
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" className="py-20 px-4 scroll-animate" data-testid="achievements-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Achievements & Recognition
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              Competing at national level, delivering exceptional results
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="award-card-enhanced p-6" data-testid={`achievement-card-${idx}`}>
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h4 className="text-xl font-bold mb-2 text-cyan-400">{achievement.title}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-sm text-green-400 font-semibold">{achievement.subtitle}</p>
                    {achievement.highlight && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-xs text-purple-400">{achievement.highlight}</span>
                      </>
                    )}
                  </div>
                  <p
                    className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {achievement.description}
                  </p>
                  {achievement.image && (
                    <button
                      onClick={() => setModalImage(achievement.image)}
                      className="cyber-button-small px-4 py-2 text-sm"
                      data-testid={`view-achievement-cert-${idx}`}
                    >
                      View Certificate 🔍
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="py-20 px-4 scroll-animate" data-testid="certifications-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Certifications & Learning
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              Committed to continuous learning and skill enhancement
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, idx) => (
                <div key={idx} className="publication-card-enhanced p-6" data-testid={`cert-card-${idx}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-3xl">📜</div>
                    <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded border border-cyan-500/50">
                      {cert.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-cyan-400">{cert.title}</h4>
                  <p className="text-sm text-purple-400 mb-1 font-semibold">{cert.issuer}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} mb-4`}>{cert.year}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block cyber-button-small px-4 py-2 text-sm"
                        data-testid={`cert-link-${idx}`}
                      >
                        Verify →
                      </a>
                    )}
                    {cert.image && (
                      <button
                        onClick={() => setModalImage(cert.image)}
                        className="cyber-button-small px-4 py-2 text-sm"
                        data-testid={`view-cert-image-${idx}`}
                      >
                        View 🔍
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 scroll-animate" data-testid="contact-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Let's Build Something Amazing
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              Open to collaborations, internships, and innovative projects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="contact-card-enhanced p-8" data-testid="contact-form">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Send a Message</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                  Have a project in mind or want to discuss opportunities? Let's connect!
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 ${isDarkMode ? 'bg-gray-900/70 text-white' : 'bg-white text-gray-900'} border border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all`}
                      placeholder="Your Name"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 ${isDarkMode ? 'bg-gray-900/70 text-white' : 'bg-white text-gray-900'} border border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all`}
                      placeholder="your.email@example.com"
                      data-testid="contact-email-input"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className={`w-full px-4 py-3 ${isDarkMode ? 'bg-gray-900/70 text-white' : 'bg-white text-gray-900'} border border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all resize-none`}
                      placeholder="Your message..."
                      data-testid="contact-message-input"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full cyber-button py-4 text-lg font-semibold"
                    data-testid="contact-submit-btn"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="contact-card-enhanced p-8" data-testid="contact-info">
                  <h3 className="text-2xl font-bold mb-6 text-cyan-400">Contact Information</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                    Reach out through any of these channels - I respond within 24 hours!
                  </p>
                  <div className="space-y-4">
                    <a
                      href="mailto:princeraj1504@gmail.com"
                      className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
                      data-testid="email-link"
                    >
                      <div className="text-2xl">📧</div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                        <p className="text-cyan-400 font-medium">princeraj1504@gmail.com</p>
                      </div>
                    </a>
                    <a
                      href="tel:+919852244801"
                      className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
                      data-testid="phone-link"
                    >
                      <div className="text-2xl">📱</div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                        <p className="text-cyan-400 font-medium">+91-9852244801</p>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/prince-raj-930871306/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
                      data-testid="linkedin-link"
                    >
                      <div className="text-2xl">💼</div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>LinkedIn</p>
                        <p className="text-cyan-400 font-medium">Let's Connect Professionally</p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="contact-card-enhanced p-6">
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed`}>
                    <span className="opportunities-highlight-enhanced">Open to Opportunities</span> in Full-Stack Development, AI/ML Engineering, 
                     and exciting collaborative projects that push technological boundaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 px-4 border-t ${isDarkMode ? 'border-cyan-500/30' : 'border-cyan-500/50'}`}>
          <div className={`max-w-7xl mx-auto text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>© 2025 Prince Raj • Crafted with passion & innovation • Let's build the future together</p>
          </div>
        </footer>
      </div>

      {/* Certificate Modal - Handles both images and PDFs */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setModalImage(null)}
          data-testid="image-modal"
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-[90vh]">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-cyan-400 hover:scale-110 transition-all duration-300"
              data-testid="close-modal-btn"
            >
              ✕
            </button>
            {modalImage.endsWith('.pdf') ? (
              <iframe
                src={modalImage}
                title="Certificate"
                className="w-full h-full rounded-lg shadow-2xl shadow-cyan-500/30"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={modalImage}
                alt="Certificate"
                className="w-full h-full object-contain rounded-lg shadow-2xl shadow-cyan-500/30"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;