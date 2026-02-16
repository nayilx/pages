import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Calculator as CalculatorIcon, DollarSign, TrendingUp, Clock } from 'lucide-react';

const Calculator = () => {
    const [mode, setMode] = useState('efficiency'); // 'efficiency' or 'growth'

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

            // Eficiencia: Ahorro de costos (90% de tiempo recuperado)
            const timeSavedPercent = 0.90;
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

        // Cálculo de NPV a 5 años (Tasa descuento 10%)
        let npv = -cost;
        const discountRate = 0.10;
        for (let year = 1; year <= 5; year++) {
            npv += annualBenefit / Math.pow(1 + discountRate, year);
        }

        const paybackMonths = monthlyBenefit > 0 ? (cost / monthlyBenefit) : 0;
        const roiPercent = ((npv) / cost) * 100;

        setResult({
            monthlyBenefit: Math.round(monthlyBenefit),
            paybackMonths: paybackMonths.toFixed(1),
            npv5Years: Math.round(npv),
            roiPercent: Math.round(roiPercent)
        });
    };

    return (
        <section className="py-20 container mx-auto px-4" id="calculator">
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto bg-brand-panel/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-14 shadow-2xl shadow-brand-blue/5 relative overflow-hidden"
            >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-lime/50 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-brand-lime/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-lime">
                        <CalculatorIcon size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Calculadora de Valor Digital</h2>
                    <p className="text-slate-400 mb-8">Proyecta el retorno de tu inversión según el tipo de solución.</p>

                    {/* Mode Toggles */}
                    <div className="inline-flex bg-brand-deep border border-white/10 rounded-lg p-1">
                        <button
                            onClick={() => { setMode('efficiency'); setResult(null); }}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${mode === 'efficiency' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                Eficiencia Operativa
                            </div>
                        </button>
                        <button
                            onClick={() => { setMode('growth'); setResult(null); }}
                            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${mode === 'growth' ? 'bg-brand-lime text-brand-deep shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} />
                                Crecimiento Comercial
                            </div>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Formulario */}
                    <form onSubmit={calculateROI} className="space-y-6">
                        {mode === 'efficiency' ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Horas semanales dedicadas al proceso</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-3.5 text-slate-500" size={18} />
                                        <input
                                            type="number"
                                            required
                                            className="w-full bg-brand-deep/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-blue transition-colors"
                                            placeholder="Ej: 20"
                                            value={formData.hoursPerWeek}
                                            onChange={(e) => setFormData({ ...formData, hoursPerWeek: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Costo por hora operativa ($)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-3.5 text-slate-500" size={18} />
                                        <input
                                            type="number"
                                            required
                                            className="w-full bg-brand-deep/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-blue transition-colors"
                                            placeholder="Ej: 50"
                                            value={formData.hourlyRate}
                                            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Ingreso Mensual Actual ($)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-3.5 text-slate-500" size={18} />
                                        <input
                                            type="number"
                                            required
                                            className="w-full bg-brand-deep/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-lime transition-colors"
                                            placeholder="Ej: 10000"
                                            value={formData.currentRevenue}
                                            onChange={(e) => setFormData({ ...formData, currentRevenue: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Incremento estimado de ventas (%)</label>
                                    <div className="relative">
                                        <TrendingUp className="absolute left-4 top-3.5 text-slate-500" size={18} />
                                        <input
                                            type="number"
                                            required
                                            className="w-full bg-brand-deep/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-lime transition-colors"
                                            placeholder="Ej: 20"
                                            value={formData.growthPercentage}
                                            onChange={(e) => setFormData({ ...formData, growthPercentage: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Inversión Estimada ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-3.5 text-slate-500" size={18} />
                                <input
                                    type="number"
                                    required
                                    className="w-full bg-brand-deep/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-blue transition-colors"
                                    placeholder="Ej: 5000"
                                    value={formData.implementationCost}
                                    onChange={(e) => setFormData({ ...formData, implementationCost: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full text-white font-bold py-4 rounded-xl transition-all shadown-lg ${mode === 'efficiency' ? 'bg-brand-blue hover:bg-brand-blue/90 shadow-brand-blue/20' : 'bg-brand-lime text-brand-deep hover:bg-brand-lime/90 shadow-brand-lime/20'}`}
                        >
                            Calcular Impacto
                        </button>
                    </form>

                    {/* Resultados */}
                    <div className="bg-brand-deep/50 rounded-2xl p-8 border border-white/5 flex flex-col justify-center">
                        {!result ? (
                            <div className="text-center text-slate-500">
                                <p>Ingresa los datos para ver la proyección financiera.</p>
                            </div>
                        ) : (
                            <Motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div>
                                    <div className="text-slate-400 text-sm mb-1">
                                        {mode === 'efficiency' ? 'Ahorro Mensual Estimado' : 'Ingreso Adicional Mensual'}
                                    </div>
                                    <div className={`text-3xl font-bold ${mode === 'efficiency' ? 'text-brand-blue' : 'text-brand-lime'}`}>
                                        $ {result.monthlyBenefit.toLocaleString()}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-slate-400 text-sm mb-1">Payback (Meses para recuperar)</div>
                                    <div className="text-2xl font-bold text-white">{result.paybackMonths} meses</div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="text-slate-400 text-sm mb-1">Valor Presente Neto (5 años)</div>
                                    <div className={`text-xl font-bold ${mode === 'efficiency' ? 'text-brand-lime' : 'text-brand-blue'}`}>
                                        $ {result.npv5Years.toLocaleString()}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Retorno total de la inversión (ROI): {result.roiPercent}%
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
