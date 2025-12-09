import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientButton from '@/components/GradientButton';
import sideImage from '@/assets/home_screen_scrolling_1.jpg';

const HomeStatsSection = () => {
    return (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background via-secondary/5 to-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Image - Left side on medium+, Top on mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="order-1 md:order-1"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative rounded-2xl overflow-hidden shadow-elegant"
                        >
                            <img
                                src={sideImage}
                                alt="Salon16 Experience"
                                className="w-full h-full object-cover aspect-[4/3] md:aspect-square"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                    </motion.div>

                    {/* Text Content - Right side on medium+, Bottom on mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="order-2 md:order-2 text-center md:text-left"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                        >
                            Experience{' '}
                            <span className="bg-clip-text">
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
                            className="flex justify-center md:justify-start"
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
            </div>
        </section>
    );
};

export default HomeStatsSection;

