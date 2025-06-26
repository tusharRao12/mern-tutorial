const SkillsSection = () => {
    const skills = [
        {name: "HTML", level:95, category: "frontend"},
        {name: "CSS", level:80, category: "frontend"},
        {name: "Javacript", level:80, category: "frontend"},
        {name: "React", level:70, category: "frontend"},

        {name: "Php", level:85, category: "backend"},
        {name: "Laravel", level:90, category: "backend"},
        {name: "Node.js", level:70, category: "backend"},
        {name: "Express", level:80, category: "backend"},

        {name: "Mysql Db", level:90, category: "tools"},
        {name: "Git", level:90, category: "tools"},
        {name: "Github", level:90, category: "tools"},
        {name: "VS Code", level:95, category: "tools"},
    ]
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:4xl font-bold mb-12 text-center">
                My <span className="text-primary">Skills</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill,key)=>(
                    <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                        <div className="text-left mb-4">
                            <h3 className="font-semibold text-lg">{skill.name}</h3>
                        </div>
                        <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out" style={{width:skill.level + "%"}}></div> 
                        </div>
                        <div className="text-right mt-1">
                        <span className="text-sm text-muted-foreground">{skill.level} %</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </section>
  )
}

export default SkillsSection;