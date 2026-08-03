import Navbar from "@/components/ui/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Challenges from "@/components/sections/Challenges";
import Approach from "@/components/sections/Approach";
import Programs from "@/components/sections/Programs";
import Impact from "@/components/sections/Impact";
import Frameworks from "@/components/sections/Frameworks";
import JoinMovement from "@/components/sections/JoinMovement";
import Footer from "@/components/sections/Footer";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* About Section - Challenges We Aim To Solve */}
        <section id="about" className="scroll-mt-20">
          <Challenges />
        </section>

        {/* Journaling & Scientific Approach Section */}
        <div id="journaling" className="scroll-mt-20">
          <SectionDivider variant="wave" color="#FAFAF7" />
          <Approach />
        </div>

        {/* Programs We Offer */}
        <div id="programs" className="scroll-mt-20">
          <SectionDivider variant="curve" color="#FAFAF7" />
          <Programs />
        </div>

        {/* Impact So Far */}
        <div id="impact" className="scroll-mt-20">
          <SectionDivider variant="organic" color="#FAFAF7" />
          <Impact />
        </div>

        {/* Product & Educational Frameworks */}
        <section id="product" className="scroll-mt-20">
          <Frameworks />
        </section>

        {/* Career & Join Movement (Volunteer / Team) */}
        <section id="career" className="scroll-mt-20">
          <div id="volunteer" className="scroll-mt-20">
            <div id="team" className="scroll-mt-20">
              <JoinMovement />
            </div>
          </div>
        </section>
      </main>

      {/* Footer / Contact */}
      <section id="contact" className="scroll-mt-20">
        <Footer />
      </section>
    </>
  );
}