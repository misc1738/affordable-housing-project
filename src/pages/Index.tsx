import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import PropertySlider from "@/components/home/PropertySlider";
import { Link } from "react-router-dom";
import JoinButton from "@/components/ui/JoinButton";
import { motion } from "framer-motion";
import TeamSection from "@/components/home/TeamSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Hero />

      <div className="pb-32">
        <PropertySlider />

        {/* Parallax Luxury Section */}
        <section className="relative h-[60vh] overflow-hidden flex items-center justify-center bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/images/hero_luxury_nairobi.png')" }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-4">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                <span className="text-gold">Experience</span> True Luxury
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 font-light">
                Elevate your lifestyle with our exclusive collection of premium properties.
              </p>
              <Link to="/properties">
                <Button size="lg" className="rounded-full bg-gold text-black hover:bg-white/90 border-none px-8 py-6 text-lg font-semibold transition-all hover:scale-105">
                  Explore Collection
                </Button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-32 bg-secondary/5 relative overflow-hidden">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gold/20 rounded-[2.5rem] blur-2xl" />
                  <img
                    src="/images/mission_interior.png"
                    alt="Luxury Interior"
                    className="relative rounded-[2rem] shadow-2xl w-full object-cover h-[600px]"
                  />

                </div>
              </FadeIn>

              <FadeIn direction="left">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                  Redefining <span className="text-gold">Modern Living</span> in Nairobi
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  At Affordable Abode, we believe luxury shouldn't be out of reach. We curate exceptional properties that blend sophisticated design with practical living, ensuring you find a home that reflects your success.
                </p>

                <ul className="space-y-6 mb-10">
                  {[
                    "Exclusive access to off-market listings",
                    "Premium locations in Karen, Muthaiga & Runda",
                    "Smart home integration & modern amenities",
                    "Dedicated concierge support for buyers"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 text-lg"
                    >
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-gold" />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <Link to="/about">
                  <Button variant="outline" size="lg" className="rounded-full border-gold/50 text-yellow-600 hover:bg-gold hover:text-black px-8">
                    Learn More About Us
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <TeamSection /> */}

        {/* CTA Section */}
        <section className="py-32 bg-background relative overflow-hidden">
          <div className="container px-4 text-center relative z-10">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready to Find Your Sanctuary?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Let us guide you to the home you've always dreamed of.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/properties">
                  <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                    Start Your Search
                  </Button>
                </Link>
                <a href="tel:+254702005992">
                  <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg border-2 hover:bg-secondary/50">
                    Contact an Agent
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
