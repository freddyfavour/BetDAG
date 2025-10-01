"use client";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

function TeamMember({ name, role, bio, imageSrc, socialLinks }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full aspect-square max-w-[320px] md:max-w-[340px] lg:max-w-[360px] xl:max-w-[380px] 2xl:max-w-[420px] mb-4 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={imageSrc}
          alt={name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <h3 className="text-lg font-semibold text-white text-center">{name}</h3>
      <p className="text-teal-400 font-medium text-center mb-2">{role}</p>
      <div className="flex space-x-3 mt-2">
        {socialLinks?.twitter && (
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        )}
        {socialLinks?.github && (
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        )}
        {socialLinks?.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function TeamSection() {
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Adeola Adeola",
      role: "AI & Backend Engineer",
      bio: "",
      imageSrc: "/team/Adeola.png",
      socialLinks: {
        twitter: "#",
        github: "#",
        linkedin: "#"
      }
    },
    {
      name: "George Babalola",
      role: "Product Designer",
      bio: "",
      imageSrc: "/team/George.png",
      socialLinks: {
        twitter: "#",
        github: "#",
        linkedin: "#"
      }
    },
    {
      name: "Hammed Hameed",
      role: "Software Developer",
      bio: "",
      imageSrc: "/team/Hammed.png",
      socialLinks: {
        twitter: "#",
        github: "#",
        linkedin: "#"
      }
    },
    {
      name: "Jude Popoola",
      role: "Data Scientist",
      bio: "",
      imageSrc: "/team/Jude.png",
      socialLinks: {
        twitter: "#",
        github: "#",
        linkedin: "#"
      }
    },
    {
      name: "Favour Alfred",
      role: "Software Engineer",
      bio: "",
      imageSrc: "/team/Favour.png",
      socialLinks: {
        twitter: "#",
        github: "#",
        linkedin: "#"
      }
    }
  ];

  // Split team members for 3+2 layout
  const firstRow = teamMembers.slice(0, 3);
  const secondRow = teamMembers.slice(3);

  return (
    <section className="py-16 bg-[#121114]" id="team">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">team</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            The BetDAG team is made up of some of the best global talents
          </p>
        </div>
        {/* First row: 3 members, centered */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {firstRow.map((member, idx) => (
            <div key={idx} className="flex-1 min-w-[220px] max-w-[380px] flex justify-center">
              <TeamMember {...member} />
            </div>
          ))}
        </div>
        {/* Second row: 2 members, centered */}
        <div className="flex flex-wrap justify-center gap-8">
          {secondRow.map((member, idx) => (
            <div key={idx} className="flex-1 min-w-[300px] max-w-[520px] flex justify-center">
              <TeamMember {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}