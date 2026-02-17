import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Calculator as CalculatorIcon, DollarSign, TrendingUp, Clock } from 'lucide-react';

const Calculator = () => {
    const [mode, setMode] = useState('efficiency'); // 'efficiency' or 'growth'
    const [currency, setCurrency] = useState('USD'); // 'USD' or 'COP'
    const EX_RATE = 4000; // Simplified approximate rate

    const [formData, setFormData] = useState({
        // Efficiency Data
        hoursPerWeek: '',
        hourlyRate: '',
        // Growth Data
        currentRevenue: '',
        growthPercentage: '',
        // Common Data
        implementationCost: ''
    });

    const [result, setResult] = useState(null);

    const formatCurr = (val) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val);
    };

    const calculateROI = (e) => {
        e.preventDefault();
        const cost = parseFloat(formData.implementationCost);
        if (isNaN(cost)) return;

        let monthlyBenefit = 0;
        let annualBenefit = 0;

        if (mode === 'efficiency') {
            const weeklyHours = parseFloat(formData.hoursPerWeek);
            const rate = parseFloat(formData.hourlyRate);
            if (isNaN(weeklyHours) || isNaN(rate)) return;

            // Eficiencia: Ahorro de costos (85% conservatively restored time)
            const timeSavedPercent = 0.85;
            const weeklySavings = weeklyHours * rate * timeSavedPercent;
            monthlyBenefit = weeklySavings * 4.33;
        } else {
            const revenue = parseFloat(formData.currentRevenue);
            const growth = parseFloat(formData.growthPercentage);
            if (isNaN(revenue) || isNaN(growth)) return;

            // Crecimiento: Incremento de facturación mensual
            monthlyBenefit = revenue * (growth / 100);
        }

        annualBenefit = monthlyBenefit * 12;

        // Cálculo de NPV a 5 años (Tasa descuento 12% - Tech Standard)
        let npv = -cost;
        const discountRate = 0.12;
        for (let year = 1; year <= 5; year++) {
            npv += annualBenefit / Math.pow(1 + discountRate, year);
        }

        const paybackMonths = monthlyBenefit > 0 ? (cost / monthlyBenefit) : 0;
        const roiPercent = ((npv) / cost) * 100;

        setResult({
            monthlyBenefit: Math.round(monthlyBenefit),
            annualBenefit: Math.round(annualBenefit),
            paybackMonths: paybackMonths.toFixed(1),
            npv5Years: Math.round(npv),
            roiPercent: Math.round(roiPercent),
            timeSavedYearly: Math.round(parseFloat(formData.hoursPerWeek || 0) * 0.85 * 52)
        });
    };

    return (
        <section className="py-24 container mx-auto px-4 relative" id="calculator">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 blur-[120px] rounded-full -z-10" />

            <Motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto bg-brand-panel/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-16 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative lines */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-lime/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

                <div className="text-center mb-12">
                    <Motion.div
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        className="w-20 h-20 bg-gradient-to-br from-brand-lime/20 to-brand-blue/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-lime border border-white/10"
                    >
                        <CalculatorIcon size={40} className="stroke-[1.5px]" />
                    </Motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Análisis de Valor Digital</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Evaluación estratégica del impacto financiero y operativo de tus proyectos de transformación.
                    </p>

                    {/* Currency & Mode Toggles */}
                    <div className="mt-12 flex flex-col items-center gap-6">
                        <div className="inline-flex bg-brand-deep/80 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 shadow-xl">
                            <button
                                onClick={() => { setMode('efficiency'); setResult(null); }}
                                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${mode === 'efficiency' ? 'bg-brand-blue text-white shadow-[0_0_20px_rgba(0,158,255,0.3)]' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Clock size={16} />
                                Optimización Operativa
                            </button>
                            <button
                                onClick={() => { setMode('growth'); setResult(null); }}
                                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${mode === 'growth' ? 'bg-brand-lime text-brand-deep shadow-[0_0_20px_rgba(212,242,64,0.3)]' : 'text-slate-400 hover:text-white'}`}
                            >
                                <TrendingUp size={16} />
                                Escalado Comercial
                            </button>
                        </div>

                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Moneda:</span>
                            <button
                                onClick={() => setCurrency('USD')}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${currency === 'USD' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                USD
                            </button>
                            <button
                                onClick={() => setCurrency('COP')}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${currency === 'COP' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                COP
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Formulario */}
                    <div className="lg:col-span-5">
                        <form onSubmit={calculateROI} className="space-y-8">
                            {mode === 'efficiency' ? (
                                <>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-slate-300 mb-3 ml-1 group-focus-within:text-brand-blue transition-colors">Carga Administrativa Semanal (Horas)</label>
                                        <div className="relative">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-blue transition-colors" size={20} />
                                            <input
                                                type="number"
                                                required
                                                className="w-full bg-brand-deep/30 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all placeholder:text-slate-700"
                                                placeholder="Ej: 40"
                                                value={formData.hoursPerWeek}
                                                onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-slate-300 mb-3 ml-1 group-focus-within:text-brand-blue transition-colors">Costo Horario Operativo ({currency})</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-blue transition-colors" size={20} />
                                            <input
                                                type="number"
                                                required
                                                className="w-full bg-brand-deep/30 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all placeholder:text-slate-700"
                                                placeholder={currency === 'USD' ? "Ej: 60" : "Ej: 150,000"}
                                                value={formData.hourlyRate}
                                                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-slate-300 mb-3 ml-1 group-focus-within:text-brand-lime transition-colors">Facturación Mensual Actual ({currency})</label>
                                        <div className="relative">
                                            <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-lime transition-colors" size={20} />
                                            <input
                                                type="number"
                                                required
                                                className="w-full bg-brand-deep/30 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-brand-lime focus:ring-4 focus:ring-brand-lime/10 transition-all"
                                                placeholder={currency === 'USD' ? "Ej: 20,000" : "Ej: 50,000,000"}
                                                value={formData.currentRevenue}
                                                onChange={(e) => setFormData({ ...formData, currentRevenue: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-slate-300 mb-3 ml-1 group-focus-within:text-brand-lime transition-colors">Crecimiento Proyectado (%)</label>
                                        <div className="relative">
                                            <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-lime transition-colors" size={20} />
                                            <input
                                                type="number"
                                                required
                                                className="w-full bg-brand-deep/30 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-brand-lime focus:ring-4 focus:ring-brand-lime/10 transition-all"
                                                placeholder="Ej: 15"
                                                value={formData.growthPercentage}
                                                onChange={(e) => setFormData({ ...formData, growthPercentage: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="group">
                                <label className="block text-sm font-semibold text-slate-300 mb-3 ml-1 group-focus-within:text-brand-blue transition-colors">Presupuesto de Transformación ({currency})</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-blue transition-colors" size={20} />
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-brand-deep/30 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all placeholder:text-slate-700"
                                        placeholder={currency === 'USD' ? "Ej: 5,000" : "Ej: 10,000,000"}
                                        value={formData.implementationCost}
                                        onChange={(e) => setFormData({ ...formData, implementationCost: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`w-full text-brand-deep font-extrabold py-5 rounded-2xl transition-all shadow-xl text-lg uppercase tracking-wider ${mode === 'efficiency' ? 'bg-brand-blue hover:shadow-brand-blue/30' : 'bg-brand-lime hover:shadow-brand-lime/30'}`}
                            >
                                Validar ROI de Proyecto
                            </button>
                        </form>
                    </div>

                    {/* Resultados & Insights */}
                    <div className="lg:col-span-7 bg-brand-deep/40 rounded-[2rem] border border-white/5 p-8 md:p-12 min-h-[500px] flex flex-col items-center justify-center relative shadow-inner">
                        {!result ? (
                            <div className="text-center">
                                <Motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="mb-8 opacity-20"
                                >
                                    <CalculatorIcon size={80} className="mx-auto text-white" />
                                </Motion.div>
                                <h3 className="text-xl font-bold text-white mb-3">Esperando Datos</h3>
                                <p className="text-slate-500 max-w-[280px]">Completa los campos para generar tu análisis ROI ejecutivo.</p>
                            </div>
                        ) : (
                            <Motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full space-y-10"
                            >
                                {/* Primary Result */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-brand-blue/30 transition-colors group">
                                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
                                            {mode === 'efficiency' ? 'Retorno Mensual' : 'Ingreso Mensual'}
                                            <DollarSign size={14} className="text-brand-blue" />
                                        </div>
                                        <div className={`text-4xl font-bold ${mode === 'efficiency' ? 'text-brand-blue' : 'text-brand-lime'}`}>
                                            {formatCurr(result.monthlyBenefit)}
                                        </div>
                                        <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                                            Impacto de {formatCurr(result.annualBenefit)} en el primer año.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-brand-lime/30 transition-colors">
                                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-between">
                                            Punto de Equilibrio
                                            <TrendingUp size={14} className="text-brand-lime" />
                                        </div>
                                        <div className="text-4xl font-bold text-white">
                                            {result.paybackMonths}
                                            <span className="text-lg font-light ml-2 text-slate-500">meses</span>
                                        </div>
                                        <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                                            Tiempo estimado para recuperar la inversión total.
                                        </p>
                                    </div>
                                </div>

                                {/* Executive Summary */}
                                <div className="p-8 bg-gradient-to-br from-brand-blue/5 to-white/5 rounded-3xl border border-white/5 space-y-6">
                                    <h4 className="text-white font-bold flex items-center gap-2 border-b border-white/5 pb-4">
                                        <TrendingUp size={18} className="text-brand-lime" />
                                        Insights Estratégicos (Benchmark)
                                    </h4>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-slate-300 font-bold mb-1">Valor Presente Neto (5 años)</div>
                                                <div className="text-2xl font-bold text-brand-lime">{formatCurr(result.npv5Years)}</div>
                                            </div>
                                            <div className="px-3 py-1 bg-brand-lime/10 text-brand-lime rounded-full text-[10px] font-bold uppercase tracking-tighter self-center">Standard ROI: {result.roiPercent}%</div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                            <div className="bg-black/20 p-4 rounded-xl">
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Reasignación de Tiempo</div>
                                                <div className="text-lg font-bold text-white">+{result.timeSavedYearly} hrs/año</div>
                                                <p className="text-[10px] text-slate-500 mt-1 italic">Libera capital intelectual para tareas core.</p>
                                            </div>
                                            <div className="bg-black/20 p-4 rounded-xl">
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Confianza Ejecutiva</div>
                                                <div className="text-lg font-bold text-white">99.8% Uptime</div>
                                                <p className="text-[10px] text-slate-500 mt-1 italic">Basado en arquitecturas de continuidad.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-[11px] text-slate-600 italic">
                                        * Basado en modelos de transformación digital con tasa de descuento del 12%. Los resultados son proyecciones sujetas a variables de mercado.
                                    </p>
                                </div>
                            </Motion.div>
                        )}
                    </div>
                </div>
            </Motion.div>
        </section>
    );
};

export default Calculator;
