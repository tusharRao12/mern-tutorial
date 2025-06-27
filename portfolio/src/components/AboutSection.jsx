import { Briefcase, Code, User } from 'lucide-react';
const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Passionate Web Developer and Tech Creator</h3>
            <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nesciunt, officia necessitatibus numquam porro voluptas culpa nisi cumque harum amet?</p>
            <p className="text-muted-foreground">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum natus aperiam perspiciatis exercitationem possimus dolores quod libero eveniet et alias.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="cosmic-button">
                    Get In Touch
              </a>
              <a href="" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
                    Download CV
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primay/10">
                  <Code className="text-primary h-6 w-6"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Web Development</h4>
                  <p className="text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, repudiandae.</p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primay/10">
                  <User className="text-primary h-6 w-6"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">UI/UX Design</h4>
                  <p className="text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, repudiandae.</p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primay/10">
                  <Briefcase className="text-primary h-6 w-6"/>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Project Management</h4>
                  <p className="text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, repudiandae.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection;