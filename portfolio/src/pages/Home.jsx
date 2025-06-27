import ThemeToggle from "../components/ThemeToggle";
import StartBackground from "../components/StartBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
        <ThemeToggle/>
      {/* Background Effects */}
        <StartBackground/>
      {/* Navbar */}
        <Navbar/>
      {/* Main content */}
      <main>
        <HeroSection/>
        <AboutSection/>
        <SkillsSection/>
        <ProjectsSection/>
        <ContactSection/>
        <Footer/>
      </main>

      {/* Footer */}
    </div>
  )
}

export default Home;