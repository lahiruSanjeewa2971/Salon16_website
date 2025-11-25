import { motion } from 'framer-motion';
import { Heart, Award, Users, Sparkles } from 'lucide-react';
import { team } from '@/data/mockData';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Beauty",
      description: "We believe beauty is an art form, and every client deserves a masterpiece."
    },
    {
      icon: Award,
      title: "Excellence Always",
      description: "Quality is never compromised. We set the highest standards in everything we do."
    },
    {
      icon: Users,
      title: "Client First",
      description: "Your satisfaction and comfort are at the heart of our service philosophy."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We embrace the latest techniques and technologies to deliver the best results."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 pb-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              About
              <span className="block mt-2 gradient-gold bg-clip-text text-transparent">
                Salon16
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Where luxury meets innovation in beauty salon management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              Founded with a vision to revolutionize the beauty industry, Salon16 was born from the understanding that salon owners needed more than just booking software—they needed a complete business partner.
            </p>
            <p>
              Our journey began when our founders, experienced salon owners themselves, recognized the gap between technology and the unique needs of beauty businesses. They set out to create a solution that would combine elegant design with powerful functionality.
            </p>
            <p>
              Today, Salon16 serves over 10,000 salons worldwide, helping them streamline operations, delight clients, and grow their businesses. Our commitment to excellence and innovation continues to drive everything we do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Our
              <span className="gradient-primary bg-clip-text text-transparent"> Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-card border border-border shadow-elegant hover:shadow-glow transition-smooth"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Meet Our
              <span className="gradient-primary bg-clip-text text-transparent"> Expert Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talented professionals dedicated to your beauty and satisfaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                  <div className="w-full h-full gradient-primary flex items-center justify-center text-white text-6xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                    <p className="text-white text-sm">{member.specialty}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 gradient-luxury text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-2xl text-white/90 leading-relaxed italic">
              "To empower beauty professionals with elegant technology that transforms their business and elevates every client experience."
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
