import React from 'react';
import { motion as Motion } from 'framer-motion';
import {
  ShieldCheck,
  Server,
  Eye,
  Zap,
  RefreshCw,
  Briefcase,
  ChevronRight,
  MessageSquare,
  Smartphone
} from 'lucide-react';
import Calculator from './components/Calculator';
import ServiceCard from './components/ServiceCard';



function App() {
  const services = [
    {
      icon: Zap,
      title: "Automatización de Procesos",
      description: "Desarrollo de scripts y workflows para integrar tus sistemas, eliminar tareas manuales y reducir errores operativos."
    },
    {
      icon: Smartphone,
      title: "Desarrollo de Software",
      description: "Diseño y construcción de aplicaciones web, móviles y plataformas a medida que se adaptan a las reglas de tu negocio."
    },
    {
      icon: Briefcase,
      title: "Consultoría de Negocio",
      description: "Análisis profundo de tus flujos de trabajo para identificar ineficiencias y proponer soluciones tecnológicas de alto impacto."
    },
    {
      icon: RefreshCw,
      title: "Transformación Digital",
      description: "Modernización integral de herramientas y cultura corporativa para digitalizar tu operación y mejorar la competitividad."
    },
    {
      icon: Server,
      title: "Infraestructura Cloud",
      description: "Arquitectura y migración a la nube (AWS/Azure) para garantizar escalabilidad, seguridad y disponibilidad de tus servicios."
    },
    {
      icon: Eye,
      title: "Monitoreo & Soporte",
      description: "Supervisión técnica continua para asegurar que tus sistemas funcionen correctamente y resolver incidencias proactivamente."
    },
    {
      icon: ShieldCheck,
      title: "Continuidad del Negocio",
      description: "Diseño de arquitecturas resilientes y planes de recuperación para garantizar la operatividad ininterrumpida de tu empresa."
    }
  ];

  return (
    <div className="min-h-screen font-['Outfit'] selection:bg-brand-lime/30 selection:text-brand-lime">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-32 text-center relative">
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block mb-12 animate-float"
        >
          <div className="absolute inset-0 bg-brand-blue blur-[100px] opacity-20 -z-10 animate-pulse-slow" />
          <img src="/LogoNayilX.png" alt="NAYILX Logo" className="w-72 md:w-80 mx-auto drop-shadow-[0_10px_30px_rgba(0,158,255,0.3)]" />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-[1px] w-8 bg-brand-lime/50"></div>
            <span className="text-brand-lime uppercase tracking-[0.3em] text-xs font-bold shadow-brand-lime/50 drop-shadow-sm">
              Consultoría Tecnológica
            </span>
            <div className="h-[1px] w-8 bg-brand-lime/50"></div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter text-white">
            Transformación <span className="text-transparent bg-clip-text bg-brand-gradient">Digital</span>, <br />
            <span className="text-slate-500 text-3xl md:text-5xl lg:text-6xl font-semibold block mt-4">
              Automatización Inteligente & Continuidad del Negocio.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Reducimos riesgos tecnológicos y garantizamos la continuidad operativa de tu empresa mediante consultoría estratégica e infraestructura resiliente.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Motion.a
              href="https://wa.me/"
              whileHover={{ scale: 1.05, translateY: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-gradient text-brand-deep font-extrabold px-12 py-5 rounded-full shadow-[0_0_40px_rgba(212,242,64,0.3)] hover:shadow-[0_0_60px_rgba(212,242,64,0.5)] transition-all flex items-center gap-3 text-lg"
            >
              Iniciar Transformación
              <ChevronRight size={20} className="stroke-[3px]" />
            </Motion.a>
          </div>
        </Motion.div>
      </header>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Soluciones Especializadas
          </Motion.h2>
          <div className="w-20 h-1 bg-brand-gradient mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <Calculator />

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <div className="container mx-auto px-4 relative text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent px-2 py-2">
              Lleva tu empresa al siguiente nivel
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Agenda una sesión estratégica para diseñar la hoja de ruta digital que acelerará tu crecimiento.
            </p>
            <Motion.a
              href="https://wa.me/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full backdrop-blur-md transition-all font-semibold"
            >
              <MessageSquare size={20} className="text-brand-lime" />
              Hablar con un consultor
            </Motion.a>
          </Motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} NAYILX. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
