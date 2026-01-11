"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Zap, Shield, TrendingUp, Mail, Instagram, CheckCircle2, Menu, X, Globe, Wrench, Share2, Paintbrush, Palette, Rocket, ExternalLink, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import LoadingScreen from './components/LoadingScreen';
import toast from "react-hot-toast";

type Project = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  featured: boolean;
};

// All Projects Data
// const allProjects = [
//   {
//     id: 1,
//     title: 'Urban Feast Restaurant',
//     category: 'Business Website',
//     description: 'Modern restaurant website with online ordering and table reservations',
//     image: 'https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbWVudSUyMHdlYnNpdGV8ZW58MXx8fHwxNzY4MDY4OTg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
//     url: 'https://www.opentable.com',
//     featured: true
//   },
//   {
//     id: 2,
//     title: 'ShopifyHub',
//     category: 'E-commerce',
//     description: 'Full-featured online store with seamless payment integration',
//     image: 'https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc2ODA1MTg5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
//     url: 'https://www.shopify.com',
//     featured: true
//   },
//   {
//     id: 3,
//     title: 'Analytics Pro Dashboard',
//     category: 'Web App',
//     description: 'Real-time analytics platform for business insights',
//     image: 'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY4MDUzOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
//     url: 'https://www.google.com/analytics',
//     featured: true
//   },
//   {
//     id: 4,
//     title: 'Creative Studio Portfolio',
//     category: 'Portfolio Website',
//     description: 'Stunning portfolio showcase for creative professionals',
//     image: 'https://images.unsplash.com/photo-1649000808933-1f4aac7cad9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2ODA1Mjk2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
//     url: 'https://www.behance.net',
//     featured: false
//   },
//   {
//     id: 5,
//     title: 'FitLife Gym',
//     category: 'Business Website',
//     description: 'Dynamic fitness center website with class scheduling',
//     image: 'https://images.unsplash.com/photo-1643369283064-f9146f94c6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd2Vic2l0ZSUyMG1vY2t1cHxlbnwxfHx8fDE3NjgxNTEyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
//     url: 'https://www.mindbodyonline.com',
//     featured: false
//   },
//   {
//     id: 6,
//     title: 'DreamHomes Realty',
//     category: 'Real Estate Website',
//     description: 'Property listing platform with advanced search features',
//     image: 'https://images.unsplash.com/photo-1687075430355-ed8df51c1670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjgxNTEyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
//     url: 'https://www.zillow.com',
//     featured: false
//   },
//   {
//     id: 7,
//     title: 'TechStart Hub',
//     category: 'Landing Page',
//     description: 'Conversion-optimized landing page for SaaS startup',
//     image: 'https://images.unsplash.com/photo-1649442746245-f51f4b76963f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMHdlYnNpdGV8ZW58MXx8fHwxNzY4MTUxMjkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
//     url: 'https://www.producthunt.com',
//     featured: false
//   },
//   {
//     id: 8,
//     title: 'Workspace Laptop',
//     category: 'Business Website',
//     description: 'Professional business consulting firm website',
//     image: 'https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBkZXNrJTIwbGFwdG9wfGVufDF8fHx8MTc2ODA0MjkzNHww&ixlib=rb-4.1.0&q=80&w=1080',
//     url: 'https://www.linkedin.com',
//     featured: false
//   }
// ];

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');

  const [submitting, setSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setAllProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const navigateToHome = () => {
    setCurrentPage('home');
    setMobileMenuOpen(false);
  };

  const navigateToProjects = () => {
    setCurrentPage('projects');
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // loading toast
    const toastId = toast.loading("Sending your message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      // success toast
      toast.success("Thanks for reaching out! We'll get back to you soon.", {
        id: toastId,
        duration: 3000,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error: any) {
      // error toast
      toast.error(
        error.message || "Server error. Please try again later.",
        {
          id: toastId,
          duration: 3000,
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navItems = [
    { label: 'Home', id: 'home', action: navigateToHome },
    { label: 'Services', id: 'services', action: () => scrollToSection('services') },
    { label: 'Work', id: 'work', action: navigateToProjects },
    { label: 'About', id: 'about', action: () => scrollToSection('about') },
    { label: 'Contact', id: 'contact', action: () => scrollToSection('contact') }
  ];

  const services = [
    {
      icon: <Code className="w-7 h-7" />,
      title: 'Website Development',
      description: 'Custom, high-performance websites built using modern frameworks like React, Next.js, and Node.js.'
    },
    {
      icon: <Palette className="w-7 h-7" />,
      title: 'UI/UX Design',
      description: 'Clean, intuitive, and conversion-focused interfaces designed for real users.'
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      title: 'Website Maintenance & Support',
      description: 'Ongoing updates, security checks, and smooth performance management.'
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      title: 'Bug Fixing & Performance Optimization',
      description: 'Fixing errors, improving speed, SEO, and overall website stability.'
    },
    {
      icon: <Paintbrush className="w-7 h-7" />,
      title: 'Graphic Design',
      description: 'Brand visuals, social media creatives, and marketing assets that stand out.'
    },
    {
      icon: <Share2 className="w-7 h-7" />,
      title: 'Digital Presence & Social Media Setup',
      description: 'Helping businesses establish a strong and consistent online presence.'
    }
  ];

  const reasons = [
    '5+ years of experience building successful web projects',
    'Mobile-first approach ensuring perfect display on all devices',
    'SEO-optimized code for better search engine rankings',
    'Fast turnaround times without compromising quality',
    'Ongoing support and maintenance after launch',
    'Transparent pricing with no hidden fees'
  ];

  const featuredProjects = allProjects.filter(p => p.featured);

  if (loading) return <LoadingScreen />;;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-slate-950/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-white/10'
          : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={navigateToHome}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent">
                NEXOWEB
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="text-blue-100 hover:text-emerald-400 transition-colors duration-300 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-4 border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="block w-full text-left py-3 text-blue-100 hover:text-emerald-400 transition-colors duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-4 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full font-semibold"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Conditional Page Rendering */}
      {currentPage === 'home' ? (
        <>
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ opacity: heroOpacity }}
              >
                <motion.div
                  className="inline-block mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-400 text-sm font-semibold">
                    🚀 Premium Web Solutions
                  </span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Modern Websites
                  <br />
                  That Help
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    Businesses Grow
                  </span>
                </h1>

                <p className="text-xl text-blue-200 mb-8 leading-relaxed max-w-xl">
                  We craft stunning, high-performance websites that drive results. From startups to established businesses, we turn your vision into reality.
                </p>

                <div className="flex items-center gap-4 mb-10 text-lg text-blue-200">
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    Fast
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Scalable
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Reliable
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 flex items-center gap-2"
                  >
                    Get a Website
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={navigateToProjects}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 border border-white/20 hover:border-emerald-400/50"
                  >
                    View Our Work
                  </button>
                </div>
              </motion.div>

              {/* Right: Hero Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-emerald-500/20 rounded-2xl blur-xl" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-2xl blur-xl" />

                  {/* Main Image Container */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGxhcHRvcCUyMGNvZGV8ZW58MXx8fHwxNzY4MDY4OTg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Web Development"
                      className="w-full h-auto"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  </div>

                  {/* Floating Stats Card */}
                  <motion.div
                    className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">98%</div>
                        <div className="text-xs text-blue-200">Client Satisfaction</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Performance Card */}
                  <motion.div
                    className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-xl"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">2.5s</div>
                        <div className="text-xs text-blue-200">Load Time</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-emerald-400 font-semibold mb-2 block">WHAT WE DO</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
                <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                  Everything you need to succeed online, from design to deployment and beyond
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="group p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="mb-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300 w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-blue-200 leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Selected Projects Section */}
          <section id="work" className="py-24 px-6 relative bg-black/20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-emerald-400 font-semibold mb-2 block">PORTFOLIO</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Projects</h2>
                <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                  Showcasing our latest work that delivered real results
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    className="group relative cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => handleProjectClick(project.url)}
                  >
                    {/* Project Card */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 group hover:-translate-y-2">

                      {/* Website Preview */}
                      <div className="relative overflow-hidden aspect-video bg-black">
                        <ImageWithFallback
                          src={`/api/image-proxy?url=${encodeURIComponent(project.image)}`}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="
        w-full h-full
        object-cover
        transform-gpu
        contrast-110
        saturate-110
        will-change-transform
        group-hover:scale-[1.03]
        transition-transform
        duration-500
      "
                        />

                        {/* LIGHTER overlay (important change) */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/95 rounded-full font-semibold shadow-lg">
                            <span>View Website</span>
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6 backdrop-blur-sm">
                        <div className="text-sm text-emerald-400 font-semibold mb-2">
                          {project.category}
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-blue-200 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button
                  onClick={navigateToProjects}
                  className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 border border-white/20 hover:border-emerald-400/50 flex items-center gap-2 mx-auto"
                >
                  View All Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </section>

          {/* Why Choose Nexoweb Section */}
          <section id="about" className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-emerald-400 font-semibold mb-2 block">WHY US</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Nexoweb?</h2>
                <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                  We're not just developers—we're your partners in digital success
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-lg text-blue-100 leading-relaxed pt-2">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 px-6 relative bg-black/20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-emerald-400 font-semibold mb-2 block">GET IN TOUCH</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
                <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                  Ready to transform your online presence? Drop us a message and let's make it happen.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Contact Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-blue-100">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-white placeholder-blue-300/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-blue-100">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-white placeholder-blue-300/50"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-blue-100">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-white placeholder-blue-300/50 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`
    w-full py-4 rounded-xl font-semibold text-lg
    transition-all duration-300
    flex items-center justify-center gap-3
    ${submitting
                        ? "bg-emerald-500/60 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-emerald-500/50"
                      }
  `}
                  >
                    {submitting ? (
                      <>
                        {/* Spinner */}
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>

                {/* Contact Image/Illustration */}
                <motion.div
                  className="relative hidden lg:block"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/20 rounded-2xl blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/20 rounded-2xl blur-2xl" />

                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <ImageWithFallback
                        src="https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBkZXNrJTIwbGFwdG9wfGVufDF8fHx8MTc2ODA0MjkzNHww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Contact Us"
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    </div>

                    {/* Contact Info Cards */}
                    <motion.div
                      className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <h3 className="text-xl font-bold mb-4">Let's create something amazing</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-blue-200">
                          <Mail className="w-5 h-5 text-emerald-400" />
                          <span>nexowebstudio8@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-blue-200">
                          <Instagram className="w-5 h-5 text-emerald-400" />
                          <span>@nexoweb8</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative py-16 px-6 bg-gradient-to-b from-slate-950/50 to-slate-950 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              {/* Main Footer Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Left Column - Brand Identity */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent">
                      NEXOWEB
                    </h3>
                  </div>
                  <p className="text-blue-100 mb-4 text-lg">
                    Modern digital solutions for growing businesses.
                  </p>
                  <div className="flex items-center gap-3 text-blue-200">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      Fast
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      Scalable
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      Reliable
                    </span>
                  </div>
                </div>

                {/* Middle Column - Services */}
                <div>
                  <h4 className="text-lg font-bold mb-4 text-white">Services</h4>
                  <ul className="space-y-3">
                    <li>
                      <button onClick={() => scrollToSection('services')} className="text-blue-200 hover:text-emerald-400 transition-colors duration-300">
                        Website Development
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('services')} className="text-blue-200 hover:text-emerald-400 transition-colors duration-300">
                        UI/UX Design
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('services')} className="text-blue-200 hover:text-emerald-400 transition-colors duration-300">
                        Website Maintenance
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('services')} className="text-blue-200 hover:text-emerald-400 transition-colors duration-300">
                        Bug Fixing & Optimization
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('services')} className="text-blue-200 hover:text-emerald-400 transition-colors duration-300">
                        Graphic Design
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('services')} className="text-blue-200 hover:text-emerald-400 transition-colors duration-300">
                        Digital Presence
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Right Column - Contact & CTA */}
                <div>
                  <h4 className="text-lg font-bold mb-4 text-white">Get in Touch</h4>
                  <div className="space-y-4 mb-6">
                    <a
                      href="mailto:nexowebstudio8@gmail.com"
                      className="flex items-center gap-3 text-blue-200 hover:text-emerald-400 transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span>nexowebstudio8@gmail.com</span>
                    </a>
                    <a
                      href="https://instagram.com/nexoweb8/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-blue-200 hover:text-emerald-400 transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <span>@nexoweb8</span>
                    </a>
                  </div>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2 group"
                  >
                    Let's build your website
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Bottom Footer Bar */}
              <div className="pt-8 border-t border-white/10 text-center text-sm text-blue-300">
                <p>© 2026 NEXOWEB. All rights reserved. Crafted with precision & passion.</p>
              </div>
            </div>
          </footer>
        </>
      ) : (
        // All Projects Page
        <div className="pt-32 pb-24 px-6 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <motion.button
              onClick={navigateToHome}
              className="flex items-center gap-2 text-blue-200 hover:text-emerald-400 transition-colors duration-300 mb-8 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </motion.button>

            {/* Page Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-emerald-400 font-semibold mb-2 block">OUR WORK</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">All Projects</h1>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Explore our complete portfolio of successful web projects
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleProjectClick(project.url)}
                >
                  {/* Project Card */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 group-hover:-translate-y-2">
                    {/* Website Preview */}
                    <div className="relative overflow-hidden aspect-video">
                      <ImageWithFallback
                        src={`/api/image-proxy?url=${project.image}`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/90 rounded-full font-semibold">
                          <span>View Website</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="text-sm text-emerald-400 font-semibold mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              className="mt-16 text-center p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-blue-200 text-lg mb-6 max-w-2xl mx-auto">
                Let's bring your vision to life with a stunning, high-performance website
              </p>
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setTimeout(() => scrollToSection('contact'), 100);
                }}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 flex items-center gap-2 mx-auto"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
