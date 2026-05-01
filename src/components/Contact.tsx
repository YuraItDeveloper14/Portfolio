"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setStatus("sending");

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", "40e29eae-51f0-4caf-bfbf-ad6142266589"); // Your Web3Forms key
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("message", formData.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section className="relative w-full py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-white tracking-[0.2em] uppercase text-sm font-bold mb-4 block">
            Get In Touch
          </span>
          
          <h2 className="heading-font text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Send me a message
          </h2>
          
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Fill out the form below or reach me directly at{" "}
            <a href="tel:+380685529395" className="text-white hover:text-neutral-300 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white">+380 68 552 9395</a>.
          </p>
        </div>

        {/* Contact Form - Optimized Glassmorphism Design */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 bg-white/[0.01] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden group/form">
          
          {/* Subtle hover gradient inside form */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold ml-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-white focus:bg-white/[0.05] transition-all" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold ml-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-white focus:bg-white/[0.05] transition-all" 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 relative z-10">
            <label className="text-xs uppercase tracking-widest text-neutral-500 font-bold ml-2">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or idea..." 
              rows={5} 
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-neutral-700 focus:outline-none focus:border-white focus:bg-white/[0.05] transition-all resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={status === "sending"}
            className="w-full bg-white/10 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl transition-all duration-300 text-lg relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] mt-2 z-10"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {status === "sending" ? "Sending..." : status === "sent" ? "✓ Message Sent!" : "Send Message"}
              {status === "idle" && (
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </span>
          </button>

          {/* Error message */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mt-2 relative z-10"
            >
              <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-400 text-sm">{errorMsg}</p>
            </motion.div>
          )}

          {/* Success message */}
          {status === "sent" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 mt-2 relative z-10"
            >
              <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-400 text-sm">Message sent successfully! I'll get back to you soon.</p>
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
}
