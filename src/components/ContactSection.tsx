import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Pesan berhasil dikirim ✨");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sepatuuterbang@gmail.com",
      href: "mailto:sepatuuterbang@gmail.com",
    },
    {
      icon: Phone,
      label: "Telepon",
      value: "+62 82363757611",
      href: "https://wa.me/6282363757611",
    },
    {
      icon: MapPin,
      label: "Lokasi",
      value: "Banda Aceh, Indonesia",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden
      bg-gradient-to-br from-[#08111f] via-[#0b1f35] to-[#0f4c5c]"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-400/10 to-cyan-300/10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-200 font-medium mb-2 block">
            Contact
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
           Contact ✨
          </h2>

          <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* LEFT */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                className="flex items-center gap-4 p-4
                bg-white/10 border border-cyan-200/10
                rounded-xl backdrop-blur-md
                hover:bg-white/15 transition-all group"
              >
                <div
                  className="p-3 bg-cyan-400/10 rounded-lg
                  group-hover:bg-cyan-400/20 transition"
                >
                  <info.icon className="text-cyan-200 w-6 h-6" />
                </div>

                <div>
                  <p className="text-cyan-100/70 text-sm">
                    {info.label}
                  </p>
                  <p className="text-white font-medium">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* RIGHT FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6
            bg-white/10 border border-cyan-200/10
            rounded-2xl backdrop-blur-xl"
          >
            <input
              name="name"
              placeholder="Nama✨"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg
              bg-white/10 text-white placeholder:text-cyan-100/50
              border border-cyan-200/10 outline-none"
            />

            <input
              name="email"
              type="email"
              placeholder="Email 📩"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg
              bg-white/10 text-white placeholder:text-cyan-100/50
              border border-cyan-200/10 outline-none"
            />

            <input
              name="subject"
              placeholder="Subject 💬"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-lg
              bg-white/10 text-white placeholder:text-cyan-100/50
              border border-cyan-200/10 outline-none"
            />

            <textarea
              name="message"
              placeholder="Pesan 🚀"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg min-h-[150px]
              bg-white/10 text-white placeholder:text-cyan-100/50
              border border-cyan-200/10 outline-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl
              bg-cyan-400 hover:bg-cyan-300
              text-slate-900 font-bold transition"
            >
              {isSubmitting ? "Sending..." : "Kirim Pesan"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}