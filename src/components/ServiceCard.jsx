import React from 'react';
import { motion as Motion } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -7 }}
        className="bg-brand-panel/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-brand-lime/50 transition-all group relative overflow-hidden hover:shadow-[0_0_30px_rgba(0,158,255,0.1)] hover:-translate-y-2"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-brand-lime/20 blur-[80px] group-hover:bg-brand-lime/40 transition-all duration-500" />

        <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6 text-brand-blue group-hover:text-brand-deep group-hover:bg-brand-lime transition-all duration-500 transform group-hover:scale-110 shadow-lg shadow-black/20">
            <Icon size={28} />
        </div>

        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-lime transition-colors">{title}</h3>
        <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-200 transition-colors">{description}</p>
    </Motion.div>
);

export default ServiceCard;
