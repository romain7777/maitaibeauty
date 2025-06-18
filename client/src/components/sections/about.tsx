import { motion } from "framer-motion";

export default function About() {
  const features = [
    "- Équipe de professionnels certifiés",
    "- Équipements de dernière génération", 
    "- Produits de qualité premium",
    "- Ambiance relaxante et moderne"
  ];

  return (
    <section 
      id="about" 
      className="section-spacing relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/cailloux.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-8 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#A38B87' }}>À Propos de Maitai Beauty</h2>
            <p className="text-lg text-white mb-6 leading-relaxed">
              Situé dans le cadre idyllique de Punaauia, face au Carlton Plage, Maitai Beauty est votre destination privilégiée pour tous vos soins de beauté et de bien-être.
            </p>
            <p className="text-lg text-white mb-8 leading-relaxed">
              Notre équipe de professionnels qualifiés vous accueille dans un environnement moderne et apaisant, où chaque détail a été pensé pour votre confort et votre détente.
            </p>
            <div className="space-y-6 max-w-sm mx-auto md:max-w-none">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-brown-primary text-cream p-3 rounded-full soft-shadow-sm flex-shrink-0">
                    <div className="w-3 h-3 bg-cream rounded-full"></div>
                  </div>
                  <span className="text-white text-base text-left">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}