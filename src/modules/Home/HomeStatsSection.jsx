import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/GradientButton';

const HomeStatsSection = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background via-secondary/5 to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                    >
                        Experience{' '}
                        <span className="gradient-primary bg-clip-text text-transparent">
                            Luxury
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-serif mb-8"
                    >
                        Where elegance meets expertise, and every visit transforms into an unforgettable experience
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/services">
                            <GradientButton
                                variant="primary"
                                className="group/btn text-lg px-8 py-4"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Book a Service
                                    <motion.span
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ArrowRight size={20} />
                                    </motion.span>
                                </span>
                            </GradientButton>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeStatsSection;

