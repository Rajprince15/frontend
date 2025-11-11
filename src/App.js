import { useState, useEffect, useRef } from 'react';
import '@/App.css';

function App() {
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [modalImage, setModalImage] = useState(null);
  const canvasRef = useRef(null);

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
      description: 'Building complete web applications with React.js frontend and Node.js backend',
      tags: ['React.js', 'Node.js', 'HTML', 'CSS', 'JavaScript'],
      icon: '🌐'
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      description: 'Implementing ML models for real-world applications using Python frameworks',
      tags: ['Python', 'ResNet', 'Deep Learning', 'Data Analysis'],
      icon: '🤖'
    },
    {
      id: 3,
      title: 'Database Management',
      description: 'Designing and managing databases for scalable applications',
      tags: ['MySQL', 'SQL', 'Database Design', 'Data Management'],
      icon: '💾'
    },
    {
      id: 4,
      title: 'Java Development',
      description: 'Creating robust backend systems and enterprise applications',
      tags: ['Java', 'Spring Boot', 'REST APIs', 'Backend Development'],
      icon: '☕'
    }
  ];

  const techStack = [
    'Python', 'Java', 'JavaScript', 'React.js', 'Node.js', 'HTML', 'CSS',
    'Tailwind CSS', 'Flask', 'FastAPI', 'MySQL', 'Pandas', 'Git', 'GitHub',
    'ResNet', 'Cesium', 'WebXR', 'VS Code', 'IntelliJ IDEA'
  ];

  const projects = [
    {
      badge: 'Deep Learning',
      title: 'Cancer Detection Website',
      role: 'Developer',
      period: 'Oct 2024 – Dec 2024',
      description: 'Built a cancer detection website using the ResNet deep learning model for medical image classification with Python and Flask backend.',
      tags: ['ResNet', 'Python', 'Flask', 'Deep Learning', 'Medical Imaging']
    },
    {
      badge: 'Full-Stack',
      title: 'Hospital Management System',
      role: 'Developer',
      period: 'Jan 2025 – Mar 2025',
      description: 'Developed a comprehensive web-based hospital system to manage patient data, appointments, and billing with a user-friendly interface.',
      tags: ['Java', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Database Design']
    },
    {
      badge: 'SIH 2025',
      title: 'Explore Jharkhand',
      role: 'Team Lead',
      period: 'Aug 2025 – Oct 2025',
      description: 'Created an AR/VR-enabled tourism platform with AI trip planning, blockchain bookings, and UPI payments. Led a 6-member team to Top 25 in Smart India Hackathon pre-qualifiers.',
      tags: ['React.js', 'FastAPI', 'MySQL', 'Cesium', 'WebXR', 'AI', 'Blockchain']
    }
  ];

  const internships = [
    {
      title: 'AI & ML Internship',
      organization: 'Chandigarh College of Engineering and Technology (PU)',
      period: 'May 2025 – Jul 2025',
      description: 'Implemented ML models for real-world data; performed preprocessing, training, and evaluation under faculty guidance.',
      icon: '🔬',
      image: '\assets\certificates\internship certificate.pdf' // PLACEHOLDER: Add your AI/ML internship certificate image here
    },
    {
      title: 'Java Full Stack Developer Internship',
      organization: 'EduSkills (Cohort 13)',
      period: 'Mar 2024 – May 2024',
      description: 'Completed a certified virtual internship focused on full-stack web development using Java, Spring Boot, React, and MySQL. Gained hands-on experience with backend logic, REST APIs, and database integration.',
      icon: '💻',
      image: '\assets\certificates\Eduskill cohort 13 internship Java full stack.pdf' // PLACEHOLDER: Add your Java Full Stack certificate image here
    }
  ];

  const achievements = [
    {
      title: 'Smart India Hackathon 2025',
      subtitle: 'Pre-Qualifiers - Top 25',
      description: 'Led a 6-member team at Galgotias University to develop Explore Jharkhand, an AR/VR-enabled tourism platform integrating AI trip planning, blockchain verification, and UPI payments.',
      icon: '🏆',
      image: 'frontend\src\assets\certificates\SIH 2025.png' // PLACEHOLDER: Add your SIH 2025 certificate/photo here
    },
    {
      title: 'Code Astra Hackathon',
      subtitle: 'IEEE, Galgotias University',
      description: 'Participated under the theme "AI in Healthcare", where the team developed a Cancer Detection Website using the ResNet deep learning model to assist in medical image classification.',
      icon: '🎯',
      image: '\assets\certificates\codeAstra.jpg' // PLACEHOLDER: Add your Code Astra certificate/photo here
    }
  ];

  const certificates = [
    {
      title: 'Python for Data Science',
      issuer: 'Kaggle',
      year: '2025',
      link: 'https://www.kaggle.com/learn/certification/princeraj15/python',
      image: null
    },
    {
      title: 'Pandas for Data Science',
      issuer: 'Kaggle',
      year: '2025',
      link: 'https://www.kaggle.com/learn/certification/princeraj15/pandas',
      image: null
    },
    {
      title: 'Data Science and Analytics',
      issuer: 'GUVI × Google',
      year: '2025',
      link: 'https://www.guvi.in/verify-certificate?id=5w41E40C3857vtV71R',
      image: null
    },
    {
      title: 'MySQL',
      issuer: 'GUVI',
      year: '2025',
      link: 'https://www.guvi.in/verify-certificate?id=4f063349eF1S4D7745',
      image: null
    },
    {
      title: 'Java for Beginners',
      issuer: 'GUVI',
      year: '2025',
      link: 'https://www.guvi.in/verify-certificate?id=7d215z3BAj5781L4c2',
      image: null
    },
    {
      title: '100 Days of Python Advance',
      issuer: 'GUVI',
      year: '2025',
      link: 'https://www.guvi.in/verify-certificate?id=H1E6rh0921T0671cW1',
      image: null
    },
    {
      title: 'IoT Bootcamp Workshop',
      issuer: 'Galgotias University',
      year: '2024',
      link: null,
      image: '\assets\certificates\IOTcertificatesAll_final-15.pdf' // PLACEHOLDER: Add your IoT Bootcamp certificate image here
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Neural Network Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />

      {/* Header with Logo and Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/30 border-b border-cyan-500/20">
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
            <a href="#home" className="nav-link text-white hover:text-cyan-400 transition-colors font-medium">
              Home
            </a>
            <a href="#expertise" className="nav-link text-white hover:text-cyan-400 transition-colors font-medium">
              Expertise
            </a>
            <a href="#projects" className="nav-link text-white hover:text-cyan-400 transition-colors font-medium">
              Projects
            </a>
            <a href="#internships" className="nav-link text-white hover:text-cyan-400 transition-colors font-medium">
              Internships
            </a>
            <a href="#achievements" className="nav-link text-white hover:text-cyan-400 transition-colors font-medium">
              Achievements
            </a>
            <a href="#certifications" className="nav-link text-white hover:text-cyan-400 transition-colors font-medium">
              Certifications
            </a>
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
            <h1 className="text-7xl md:text-9xl font-bold mb-4 text-white">
              Prince Raj
            </h1>
            <p className="text-3xl md:text-4xl text-cyan-400 font-light tracking-wider neon-glow">
              Full-Stack Developer & CS Student
            </p>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
              Computer Science student at Galgotias University passionate about Artificial Intelligence, 
              Data Science, and Full-Stack Web Development. Building innovative solutions with modern technologies.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <a
                href="#projects"
                className="cyber-button px-8 py-4 text-lg font-semibold"
                data-testid="view-work-btn"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="cyber-button-outline px-8 py-4 text-lg font-semibold"
                data-testid="get-in-touch-btn"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        {/* Technical Expertise */}
        <section id="expertise" className="py-20 px-4" data-testid="technical-expertise-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Technical Expertise
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Specialized in modern web technologies and AI/ML applications
            </p>
            <p className="text-center text-cyan-400 mb-12">✨ Click on any card to explore</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techExpertise.map((tech) => (
                <div
                  key={tech.id}
                  className={`tech-card p-6 cursor-pointer transition-all duration-500 ${
                    activeCard === tech.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveCard(activeCard === tech.id ? null : tech.id)}
                  data-testid={`tech-card-${tech.id}`}
                >
                  <div className="text-5xl mb-4">{tech.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400">{tech.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{tech.description}</p>
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
        <section className="py-20 px-4 overflow-hidden" data-testid="tech-stack-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Tech Stack
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Tools and technologies I work with to build innovative solutions
            </p>
            <div className="tech-stack-scroll">
              <div className="tech-stack-track">
                {[...techStack, ...techStack].map((tech, idx) => (
                  <div key={idx} className="tech-badge">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-4" data-testid="projects-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Projects
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Innovative solutions combining AI, web development, and emerging technologies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div key={idx} className="project-card p-6" data-testid={`project-card-${idx}`}>
                  <div className="text-xs font-bold text-green-400 mb-3 inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50">
                    {project.badge}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400">{project.title}</h3>
                  <p className="text-sm text-purple-400 mb-1">{project.role}</p>
                  <p className="text-xs text-gray-500 mb-3">{project.period}</p>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
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
        <section id="internships" className="py-20 px-4" data-testid="internships-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Internships
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Professional experience and hands-on learning
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {internships.map((internship, idx) => (
                <div key={idx} className="award-card p-6" data-testid={`internship-card-${idx}`}>
                  <div className="text-4xl mb-4">{internship.icon}</div>
                  <h4 className="text-xl font-bold mb-2 text-cyan-400">{internship.title}</h4>
                  <p className="text-sm text-purple-400 mb-1">{internship.organization}</p>
                  <p className="text-xs text-gray-500 mb-3">{internship.period}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{internship.description}</p>
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
        <section id="achievements" className="py-20 px-4" data-testid="achievements-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Achievements
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Recognition and competitive achievements
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="award-card p-6" data-testid={`achievement-card-${idx}`}>
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h4 className="text-xl font-bold mb-2 text-cyan-400">{achievement.title}</h4>
                  <p className="text-sm text-green-400 mb-3">{achievement.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{achievement.description}</p>
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
        <section className="py-20 px-4" data-testid="certifications-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Certifications
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Continuous learning and skill development
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, idx) => (
                <div key={idx} className="publication-card p-6" data-testid={`cert-card-${idx}`}>
                  <div className="text-4xl mb-4">📜</div>
                  <h4 className="text-lg font-bold mb-2 text-cyan-400">{cert.title}</h4>
                  <p className="text-sm text-purple-400 mb-1">{cert.issuer}</p>
                  <p className="text-xs text-gray-500 mb-4">{cert.year}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block cyber-button-small px-4 py-2 text-sm"
                        data-testid={`cert-link-${idx}`}
                      >
                        Verify Certificate →
                      </a>
                    )}
                    {cert.image && (
                      <button
                        onClick={() => setModalImage(cert.image)}
                        className="cyber-button-small px-4 py-2 text-sm"
                        data-testid={`view-cert-image-${idx}`}
                      >
                        View Certificate 🔍
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4" data-testid="contact-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Get In Touch
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Let's collaborate on innovative projects and create something amazing together
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="contact-card p-8" data-testid="contact-form">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Send a Message</h3>
                <p className="text-gray-300 mb-6">
                  Fill out the form below and I'll get back to you as soon as possible
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/70 border border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                      placeholder="Your Name"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/70 border border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white"
                      placeholder="your.email@example.com"
                      data-testid="contact-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-900/70 border border-cyan-500/40 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white resize-none"
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
                <div className="contact-card p-8" data-testid="contact-info">
                  <h3 className="text-2xl font-bold mb-6 text-cyan-400">Contact Information</h3>
                  <p className="text-gray-300 mb-6">
                    Feel free to reach out through any of these channels
                  </p>
                  <div className="space-y-4">
                    <a
                      href="mailto:princeraj1504@gmail.com"
                      className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                      data-testid="email-link"
                    >
                      <div className="text-2xl">📧</div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-cyan-400 font-medium">princeraj1504@gmail.com</p>
                      </div>
                    </a>
                    <a
                      href="tel:+919852244801"
                      className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                      data-testid="phone-link"
                    >
                      <div className="text-2xl">📱</div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-cyan-400 font-medium">+91-9852244801</p>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/prince-raj-930871306/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                      data-testid="linkedin-link"
                    >
                      <div className="text-2xl">💼</div>
                      <div>
                        <p className="text-sm text-gray-400">LinkedIn</p>
                        <p className="text-cyan-400 font-medium">Connect on LinkedIn</p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="contact-card p-6">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="opportunities-highlight">Open to opportunities</span> in Full-Stack Development, AI/ML engineering, 
                    internships, and collaborative projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-cyan-500/30">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>© 2025 Prince Raj. Built with passion for innovation.</p>
          </div>
        </footer>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setModalImage(null)}
          data-testid="image-modal"
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-cyan-400 transition-colors"
              data-testid="close-modal-btn"
            >
              ✕
            </button>
            <img
              src={modalImage}
              alt="Certificate"
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;