import { useState, useEffect, useRef } from 'react';
import '@/App.css';

function App() {
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
    window.location.href = `mailto:adityapoddar885@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const techExpertise = [
    {
      id: 1,
      title: 'Web Interfaces',
      description: 'React.js and Flask development for AI model deployment',
      tags: ['React.js', 'Flask', 'Web Development', 'UI/UX'],
      icon: '🌐'
    },
    {
      id: 2,
      title: 'Machine Learning & Deep Learning',
      description: 'Advanced Python frameworks for cutting-edge AI solutions',
      tags: ['Python', 'TensorFlow', 'PyTorch', 'Time Series Analysis'],
      icon: '🤖'
    },
    {
      id: 3,
      title: 'Medical Applications',
      description: 'AI-powered healthcare solutions for diagnostics and reconstruction',
      tags: ['Medical Imaging', 'YOLOv8', 'EfficientB3Net', 'Cancer Detection'],
      icon: '🏥'
    },
    {
      id: 4,
      title: 'Large Language Models',
      description: 'Fine-tuning and RAG implementation for intelligent chatbots',
      tags: ['LLM Fine-tuning', 'RAG', 'NLP', 'Conversational AI'],
      icon: '💬'
    }
  ];

  const techStack = [
    'Python', 'JavaScript', 'C++', 'SQL', 'TensorFlow', 'PyTorch', 'YOLO',
    'Scikit-learn', 'React.js', 'Flask', 'Node.js', 'Qt', 'Git', 'Docker', 'OpenCV'
  ];

  const projects = [
    {
      badge: 'Patented Invention',
      title: 'Custom Cranial Implant using Deep Learning',
      role: 'Project Team Lead',
      description: 'Developed a patented deep learning solution for cranial reconstruction with an intuitive web interface for one-click medical image uploads and processing.',
      tags: ['Deep Learning', 'Medical Imaging', 'Web Interface', 'Python', 'Flask']
    },
    {
      badge: '99% Accuracy',
      title: 'AI-Powered Cancer Detection System',
      role: 'Lead Developer',
      description: 'Created a full-stack web application with real-time visualization for cancer detection using advanced deep learning models, achieving 99% accuracy.',
      tags: ['YOLOv8', 'EfficientB3Net', 'React.js', 'Python', 'Real-time Processing']
    },
    {
      badge: 'High Accuracy',
      title: 'EMG Signal Classification',
      role: 'Machine Learning Engineer',
      description: 'Developed machine learning models to classify EMG signals for 8 distinct hand gestures with high accuracy. Specialized in time series data analysis and signal processing.',
      tags: ['Machine Learning', 'Time Series Analysis', 'Signal Processing', 'Python', 'EMG Data']
    },
    {
      badge: 'Fast & Accurate',
      title: 'Brain Tumor Object Detection',
      role: 'Computer Vision Engineer',
      description: 'Implemented a YOLO-based object detection system for fast and accurate localization of brain tumors in MRI/CT scans, enabling early diagnosis and treatment planning.',
      tags: ['YOLO', 'Object Detection', 'Medical Imaging', 'MRI/CT Analysis', 'Computer Vision']
    },
    {
      badge: 'Research Innovation',
      title: 'SAR Image Colorization Project',
      role: 'Research Developer',
      description: 'Implemented deep learning-based colorization for SAR images using OpenCV and transfer learning techniques to produce realistic colorized outputs.',
      tags: ['Deep Learning', 'OpenCV', 'Transfer Learning', 'Image Processing']
    },
    {
      badge: 'Enterprise Solution',
      title: 'ArtLink - Content Creation Platform',
      role: 'Full-Stack Developer',
      description: 'Built a comprehensive content creation and publishing platform with real-time collaboration features and role-based access control.',
      tags: ['C++', 'Qt', 'SQL', 'Real-time Collaboration', 'Access Control']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Neural Network Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />

      {/* Professional Logo in Top Left */}
      <div className="fixed top-6 left-6 z-50" data-testid="logo">
        <div className="professional-logo">
          <div className="logo-inner">
            <span className="logo-text">AP</span>
          </div>
          <div className="logo-ring"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-bold mb-4 text-white">
              Aditya Poddar
            </h1>
            <p className="text-3xl md:text-4xl text-cyan-400 font-light tracking-wider neon-glow">
              AI/ML Engineer & Innovator
            </p>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6 leading-relaxed">
              Computer Science student passionate about transforming ideas into reality through
              cutting-edge technology and innovative solutions in AI and medical applications.
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
        <section className="py-20 px-4" data-testid="technical-expertise-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Technical Expertise
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Specialized in cutting-edge technologies and innovative solutions
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
              Projects & Experience
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Innovative solutions at the intersection of AI, healthcare, and technology
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div key={idx} className="project-card p-6" data-testid={`project-card-${idx}`}>
                  <div className="text-xs font-bold text-green-400 mb-3 inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50">
                    {project.badge}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400">{project.title}</h3>
                  <p className="text-sm text-purple-400 mb-3">{project.role}</p>
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

        {/* Awards & Publications */}
        <section className="py-20 px-4" data-testid="awards-publications-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 gradient-text">
              Awards & Publications
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Recognition and contributions to the field of AI and technology
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Achievements */}
              <div className="flex flex-col h-full">
                <h3 className="text-3xl font-bold text-cyan-400 mb-6">Achievements</h3>
                <div className="space-y-6 flex-1">
                  <div className="award-card p-6" data-testid="award-card-1">
                    <div className="text-4xl mb-4">🏆</div>
                    <h4 className="text-xl font-bold mb-2">3rd Place Winner</h4>
                    <p className="text-sm text-purple-400 mb-2">2024 • EXECUTE-4.0 Hackathon</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Recognized for innovative AI solution in competitive hackathon environment
                    </p>
                  </div>
                  <div className="award-card p-6" data-testid="award-card-2">
                    <div className="text-4xl mb-4">🎯</div>
                    <h4 className="text-xl font-bold mb-2">Exhibition Participant</h4>
                    <p className="text-sm text-purple-400 mb-2">2025 • NCEEITET 2025 at GCET Jammu</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Selected to showcase cutting-edge research and innovation at national exhibition
                    </p>
                  </div>
                </div>
              </div>

              {/* Publications */}
              <div className="flex flex-col h-full">
                <h3 className="text-3xl font-bold text-cyan-400 mb-6">Publications</h3>
                <div className="space-y-6 flex-1">
                  <div className="publication-card p-6" data-testid="publication-card-1">
                    <div className="text-4xl mb-4">📄</div>
                    <h4 className="text-xl font-bold mb-2">AI Framework for Cranial Reconstruction</h4>
                    <p className="text-sm text-green-400 mb-2">Published</p>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      Co-authored research on deep learning applications in medical cranial implant
                      design and reconstruction
                    </p>
                    <a
                      href="https://doi.org/10.1016/j.compbiomed.2025.110504"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block cyber-button-small px-4 py-2 text-sm"
                      data-testid="publication-link-1"
                    >
                      View Publication →
                    </a>
                  </div>
                  <div className="publication-card p-6" data-testid="publication-card-2">
                    <div className="text-4xl mb-4">📄</div>
                    <h4 className="text-xl font-bold mb-2">Advanced Diagnosis Systems using AI</h4>
                    <p className="text-sm text-green-400 mb-2">Published</p>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      Collaborative research on artificial intelligence frameworks for medical
                      diagnosis and treatment planning
                    </p>
                    <a
                      href="https://doi.org/10.3390/bioengineering12020188"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block cyber-button-small px-4 py-2 text-sm"
                      data-testid="publication-link-2"
                    >
                      View Publication →
                    </a>
                  </div>
                </div>
              </div>
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
                      href="mailto:adityapoddar885@gmail.com"
                      className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                      data-testid="email-link"
                    >
                      <div className="text-2xl">📧</div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-cyan-400 font-medium">adityapoddar885@gmail.com</p>
                      </div>
                    </a>
                    <a
                      href="tel:+919541385990"
                      className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                      data-testid="phone-link"
                    >
                      <div className="text-2xl">📱</div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-cyan-400 font-medium">+91-9541385990</p>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aditya-poddar-03295a296/"
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
                    <span className="opportunities-highlight">Open to opportunities</span> in AI/ML engineering, research collaborations, and
                    innovative technology projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-cyan-500/30">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>© 2025 Aditya Poddar. Built with passion for innovation.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;