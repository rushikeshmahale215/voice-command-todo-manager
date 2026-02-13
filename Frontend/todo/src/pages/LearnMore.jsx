import { motion } from "framer-motion";
import { Mic, CheckCircle, Shield } from "lucide-react";
import './LearnMore.css'

const features = [
  {
    icon: <Mic size={32} />,
    title: "Speak Your Task",
    desc: "Just say what you need to do. VoiceTodo understands natural language commands instantly.",
    example: "“Add buy groceries tomorrow at 7 PM”",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Instant Task Creation",
    desc: "Your voice is converted into a task with date and time — no typing required.",
  },
  {
    icon: <Shield size={32} />,
    title: "Secure & Accessible Anywhere",
    desc: "Your tasks are safely stored in the cloud and available on all your devices.",
  },
];

const LearnMore = () => {
  return (
  
    <section id="learn-more" className="learn-more">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        How Voice Todo Command Manager Works
      </motion.h2>

      

      <div className="columns">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="column-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            {item.example && (
              <span className="example">{item.example}</span>
            )}
          </motion.div>
        ))}
      </div>

      
    </section>
 
  );
};

export default LearnMore;