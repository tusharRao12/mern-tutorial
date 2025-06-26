import ThemeToggle from "../components/ThemeToggle";
import StartBackground from "../components/StartBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";

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
      </main>

      {/* Footer */}
    </div>
  )
}

export default Home;