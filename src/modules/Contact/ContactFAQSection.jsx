import { motion } from 'framer-motion';

const ContactFAQSection = () => {
  const faqs = [
    {
      q: "How do I book a service?",
      a: "You can book a service through our website or mobile app by browsing our services page, selecting your preferred service, choosing a date and time slot, and confirming your booking. You'll need to be logged in to make a booking."
    },
    {
      q: "Do you have a mobile app?",
      a: "Yes! Salon16 has a mobile app available for both Android and iOS. You can check and book services through the app, just like on the website. Installable APK files for both platforms will be available for download on this website in the near future."
    },
    {
      q: "Can I cancel or reschedule my booking?",
      a: "Yes! You can cancel pending bookings from your Bookings page on both the website and mobile app. For rescheduling, you can use the reschedule option (coming soon) or cancel and create a new booking."
    },
    {
      q: "What are your working hours?",
      a: "We're open Monday, Wednesday through Sunday from 8:30 AM to 8:00 PM. We're closed on Tuesdays. You can book services during our operating hours through our website or mobile app."
    },
    {
      q: "How can I contact you?",
      a: "You can reach us by phone at 0789109693, email at hello@salon16.com, or visit us at Salon 16, Malpitiya, Boyagane. You can also use the contact form on this page."
    }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Quick
            <span className="bg-clip-text"> Answers</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Common questions about Salon16
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFAQSection;

