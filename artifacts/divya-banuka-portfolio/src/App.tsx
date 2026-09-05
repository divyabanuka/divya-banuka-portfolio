import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Network,
  PanelTop,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Recognition', href: '#certifications', id: 'certifications' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const skillGroups = [
  {
    label: 'Languages',
    icon: Braces,
    skills: ['C', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Web',
    icon: PanelTop,
    skills: ['HTML5', 'CSS3', 'React.js', 'Vite'],
  },
  {
    label: 'Data & workflow',
    icon: Database,
    skills: ['SQL', 'DBMS', 'Git', 'GitHub', 'Replit', 'VS Code'],
  },
  {
    label: 'Foundations',
    icon: Network,
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Machine Learning Fundamentals',
      'Generative AI',
      'Prompt Engineering',
    ],
  },
];

function ExternalAnchor({
  href,
  label,
  testId,
}: {
  href: string;
  label: string;
  testId: string;
}) {
  return (
    <a
      className="contact-link group"
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
    >
      <span>{label}</span>
      <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" />
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[1fr_1.5fr] md:items-end">
      <div>
        <p className="section-kicker" data-testid={`text-section-${eyebrow.toLowerCase()}`}>
          {eyebrow}
        </p>
        <div className="mt-4 h-px w-14 bg-[hsl(var(--accent))]" />
      </div>
      <div>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {detail ? (
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground" data-testid={`text-detail-${eyebrow.toLowerCase()}`}>
            {detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    document.title = 'Divya Banuka — AI & ML Student | Aspiring Software Developer';
    const description =
      'Portfolio of Divya Banuka, a B.Tech Artificial Intelligence & Machine Learning student and aspiring software developer.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.4, 0.8] },
    );
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-page min-h-[100dvh] w-full">
      <header className="site-header">
        <div className="portfolio-content mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="group flex items-center gap-3"
            data-testid="link-brand"
            aria-label="Divya Banuka, back to top"
          >
            <span className="grid size-9 place-items-center border border-primary bg-primary font-mono text-xs font-medium text-primary-foreground transition-transform duration-200 group-hover:-rotate-6">
              DB
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:block">
              Divya Banuka
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link font-mono text-[0.68rem] uppercase tracking-[0.12em] ${activeSection === item.id ? 'is-active' : ''}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
                data-testid={`link-nav-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="solid-button hidden min-h-10 px-4 text-[0.65rem] md:inline-flex" href="#contact" data-testid="link-header-contact">
            Let&apos;s connect <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button
            className="grid size-10 place-items-center border border-foreground/15 text-foreground md:hidden"
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
        {mobileOpen ? (
          <nav className="border-t border-foreground/10 bg-background px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center justify-between border-b border-foreground/8 py-3 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                  data-testid={`link-mobile-nav-${item.id}`}
                >
                  <span>{String(index + 1).padStart(2, '0')} / {item.label}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main id="top" className="portfolio-content">
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:px-12 lg:pb-36 lg:pt-28" aria-labelledby="hero-title">
          <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 font-mono-label text-[0.68rem] text-primary" data-testid="text-hero-kicker">
                  <span className="inline-block size-2 rounded-full bg-accent" />
                  Personal portfolio
                  <span className="text-foreground/30">/</span>
                  AI &amp; ML
                </div>
              </Reveal>
              <Reveal className="delay-one">
                <h1 id="hero-title" className="hero-title mt-7" data-testid="text-hero-name">
                  Divya
                  <br />
                  <span className="accent-word">Banuka</span>
                </h1>
              </Reveal>
              <Reveal className="delay-two">
                <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl" data-testid="text-hero-intro">
                  An AI &amp; ML student interested in building thoughtful software and exploring how intelligent systems can solve meaningful problems.
                </p>
              </Reveal>
              <Reveal className="delay-three">
                <p className="mt-5 max-w-lg font-mono text-xs uppercase leading-6 tracking-[0.08em] text-foreground/55" data-testid="text-hero-title">
                  B.Tech AI &amp; ML Student <span className="text-accent">|</span> Aspiring Software Developer
                </p>
              </Reveal>
              <Reveal className="delay-three">
                <div className="mt-9 flex flex-wrap gap-3">
                  <a className="solid-button" href="#projects" data-testid="link-view-projects">
                    View projects <ArrowDownRight size={15} aria-hidden="true" />
                  </a>
                  <a className="outline-button" href="#contact" data-testid="link-contact-me">
                    Contact me <Mail size={15} aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal className="delay-two">
              <div className="relative">
                <div className="hero-orbit" aria-hidden="true">
                  <div className="hero-core" />
                  <span className="orbit-node node-one" />
                  <span className="orbit-node node-two" />
                  <span className="orbit-node node-three" />
                </div>
                <div className="signal-card absolute bottom-1 right-0 w-[min(76%,270px)] p-4 sm:bottom-4" data-testid="card-focus-areas">
                  <div className="mb-3 flex items-center justify-between font-mono-label text-[0.58rem] text-muted-foreground">
                    <span>Focus areas</span>
                    <Code2 size={14} className="text-primary" aria-hidden="true" />
                  </div>
                  <div className="space-y-2 font-mono text-xs text-foreground/80">
                    <p className="flex items-center gap-2"><Check size={13} className="text-primary" /> Software development</p>
                    <p className="flex items-center gap-2"><Check size={13} className="text-primary" /> Artificial intelligence</p>
                    <p className="flex items-center gap-2"><Check size={13} className="text-primary" /> Web development</p>
                  </div>
                </div>
                <p className="absolute -left-2 top-1/2 -translate-y-1/2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-foreground/35 [writing-mode:vertical-rl]">
                  learning in public
                </p>
              </div>
            </Reveal>
          </div>
          <div className="mt-16 flex items-center gap-4 font-mono-label text-[0.62rem] text-foreground/40 sm:mt-24">
            <span className="h-px w-12 bg-foreground/20" />
            Scroll to explore
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-t border-foreground/10" aria-labelledby="about-title">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="01 / About"
                title="Curious about the space between an idea and a useful product."
                detail="A technical profile grounded in learning, experimentation, and an interest in building with care."
              />
            </Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
              <Reveal className="delay-one">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground" data-testid="text-about-label">
                  About Divya
                </p>
                <div className="mt-5 h-px w-full bg-foreground/10" />
                <div className="mt-5 flex items-center gap-2 text-sm text-primary">
                  <span className="size-2 rounded-full bg-accent" />
                  Artificial Intelligence &amp; Machine Learning
                </div>
              </Reveal>
              <Reveal className="delay-two">
                <p id="about-title" className="max-w-3xl text-2xl leading-[1.35] tracking-[-0.03em] text-foreground sm:text-3xl" data-testid="text-about-description">
                  B.Tech AI &amp; ML student interested in software development, AI, machine learning, web development, databases, and emerging technologies.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t border-foreground/10" aria-labelledby="projects-title">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="02 / Selected work"
                title="Projects that turn learning into something tangible."
                detail="A small, focused selection of work built through hands-on practice."
              />
            </Reveal>
            <div className="space-y-6">
              <Reveal className="delay-one">
                <article className="project-card grid gap-0 lg:grid-cols-[0.86fr_1.14fr]" data-testid="card-project-campusdesk">
                  <div className="project-visual m-4 lg:m-6">
                    <div className="window-bar" />
                    <div className="project-grid">
                      <span />
                      <span />
                    </div>
                    <span className="absolute bottom-7 left-8 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary/80">campus / desk</span>
                  </div>
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div>
                      <div className="flex items-start justify-between gap-5">
                        <p className="font-mono-label text-[0.63rem] text-primary">01 / Student portal</p>
                        <PanelTop size={20} className="shrink-0 text-accent" aria-hidden="true" />
                      </div>
                      <h3 id="projects-title" className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl" data-testid="text-project-campusdesk-title">
                        CampusDesk
                      </h3>
                      <p className="mt-2 text-sm font-mono uppercase tracking-[0.08em] text-muted-foreground">Student Management Portal</p>
                      <p className="mt-7 max-w-xl leading-7 text-muted-foreground" data-testid="text-project-campusdesk-description">
                        Student record management with add, search, edit, delete, and clear student records, presented in a responsive design.
                      </p>
                    </div>
                    <div className="mt-10">
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'HTML', 'CSS', 'Vite'].map((tech) => (
                          <span key={tech} className="skill-pill">{tech}</span>
                        ))}
                      </div>
                      <div className="mt-8 flex flex-wrap gap-5 border-t border-foreground/10 pt-5">
                        <a className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-primary transition-colors hover:text-accent" href="https://student-management-system--divyabanuka.replit.app" target="_blank" rel="noreferrer" data-testid="link-campusdesk-demo">
                          Live demo <ExternalLink size={14} aria-hidden="true" />
                        </a>
                        <a className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground" href="https://github.com/divyabanuka/campusdesk-student-management" target="_blank" rel="noreferrer" data-testid="link-campusdesk-github">
                          GitHub <Github size={14} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal className="delay-two">
                <article className="project-card grid gap-0 lg:grid-cols-[1.14fr_0.86fr]" data-testid="card-project-robotic-arm">
                  <div className="order-2 flex flex-col justify-between p-6 sm:p-8 lg:order-1 lg:p-10">
                    <div>
                      <div className="flex items-start justify-between gap-5">
                        <p className="font-mono-label text-[0.63rem] text-primary">02 / Hands-on exploration</p>
                        <Network size={20} className="shrink-0 text-accent" aria-hidden="true" />
                      </div>
                      <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl" data-testid="text-project-robotic-arm-title">
                        Robotic Arm
                      </h3>
                      <p className="mt-7 max-w-xl leading-7 text-muted-foreground" data-testid="text-project-robotic-arm-description">
                        A project exploring robotic arm concepts and control through hands-on experimentation.
                      </p>
                    </div>
                    <div className="mt-10 border-t border-foreground/10 pt-5 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                      Hardware concepts <span className="mx-2 text-accent">/</span> Control
                    </div>
                  </div>
                  <div className="project-visual arm-visual order-1 m-4 min-h-[230px] lg:order-2 lg:m-6">
                    <div className="arm-diagram" />
                    <span className="absolute bottom-7 right-8 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary/80">motion / control</span>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 border-t border-foreground/10" aria-labelledby="skills-title">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="03 / Skills"
                title="Tools, languages, and foundations in the toolkit."
                detail="An evolving technical toolkit spanning code, interfaces, data, and intelligent systems."
              />
            </Reveal>
            <div id="skills-title" className="grid gap-px border border-foreground/12 bg-foreground/12 sm:grid-cols-2">
              {skillGroups.map((group, index) => {
                const Icon = group.icon;
                return (
                  <Reveal key={group.label} className={index % 2 === 1 ? 'delay-one' : ''}>
                    <div className="h-full bg-background p-6 sm:p-8" data-testid={`card-skill-group-${group.label.toLowerCase().replaceAll(' ', '-')}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-foreground" data-testid={`text-skill-group-${index}`}>
                          {group.label}
                        </h3>
                        <Icon size={18} className="text-primary" aria-hidden="true" />
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span key={skill} className="skill-pill" data-testid={`text-skill-${skill.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="education" className="scroll-mt-24 border-t border-foreground/10" aria-labelledby="education-title">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="04 / Education"
                title="A strong academic base for the next build."
                detail="The context behind the work: a focused path through artificial intelligence and machine learning."
              />
            </Reveal>
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-24">
              <Reveal className="delay-one">
                <div className="border-l-2 border-primary pl-6 sm:pl-8">
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-primary">
                    <GraduationCap size={17} aria-hidden="true" />
                    B.Tech – Artificial Intelligence &amp; Machine Learning
                  </div>
                  <h3 id="education-title" className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl" data-testid="text-education-degree">
                    Kakatiya Institute of Technology and Science for Women
                  </h3>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground" data-testid="text-education-graduation">
                    Expected graduation 2028
                  </p>
                </div>
              </Reveal>
              <Reveal className="delay-two">
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="score-card p-5" data-testid="card-score-cgpa">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">CGPA</p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">8.47</p>
                  </div>
                  <div className="score-card p-5" data-testid="card-score-intermediate">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">Intermediate MPC</p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">96.2%</p>
                  </div>
                  <div className="score-card p-5" data-testid="card-score-tenth">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">10th CGPA</p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-foreground">9.2</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="certifications" className="border-t border-foreground/10" aria-labelledby="certifications-title">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="05 / Recognition"
                title="Learning, documented."
                detail="Certifications and recognition that mark the work so far."
              />
            </Reveal>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                'SQL and Relational Databases 101',
                'Prompt Engineering for Everyone',
                'AWS Student Builder Group – Outstanding Achievement',
              ].map((item, index) => (
                <Reveal key={item} className={index === 1 ? 'delay-one' : index === 2 ? 'delay-two' : ''}>
                  <div className="flex h-full flex-col justify-between border border-foreground/12 bg-card/50 p-6 sm:p-7" data-testid={`card-recognition-${index}`}>
                    <div>
                      <span className="font-mono text-[0.65rem] text-accent">{String(index + 1).padStart(2, '0')}</span>
                      <h3 id={index === 0 ? 'certifications-title' : undefined} className="mt-8 text-xl font-medium leading-snug tracking-[-0.03em] text-foreground" data-testid={`text-recognition-${index}`}>
                        {item}
                      </h3>
                    </div>
                    {index < 2 ? (
                      <p className="mt-10 border-t border-foreground/10 pt-4 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-muted-foreground">
                        IBM Skills Network / Cognitive Class
                      </p>
                    ) : (
                      <p className="mt-10 border-t border-foreground/10 pt-4 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-muted-foreground">
                        AWS Student Builder Group
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t border-foreground/10" aria-labelledby="contact-title">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
            <Reveal>
              <div className="contact-panel p-7 sm:p-12 lg:p-16">
                <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                  <div>
                    <p className="font-mono-label text-[0.68rem] text-accent">06 / Contact</p>
                    <h2 id="contact-title" className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.06em] sm:text-6xl" data-testid="text-contact-heading">
                      Let&apos;s make the next idea more useful.
                    </h2>
                    <p className="mt-6 max-w-xl leading-7 text-sidebar-foreground/65" data-testid="text-contact-description">
                      For conversations about software, AI &amp; ML, or thoughtful technical work, reach out.
                    </p>
                  </div>
                  <div className="space-y-5 font-mono text-sm">
                    <a className="contact-link text-base" href="mailto:divyabanuka3@gmail.com" data-testid="link-email">
                      <Mail size={17} className="text-accent" aria-hidden="true" />
                      divyabanuka3@gmail.com
                    </a>
                    <ExternalAnchor href="https://www.linkedin.com/in/divya-banuka-09b752422" label="LinkedIn" testId="link-linkedin" />
                    <ExternalAnchor href="https://github.com/divyabanuka" label="GitHub" testId="link-github" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="portfolio-content border-t border-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground" data-testid="text-footer-name">
            Divya Banuka <span className="mx-2 text-accent">/</span> AI &amp; ML student
          </p>
          <a href="#top" className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground" data-testid="link-back-to-top">
            Back to top <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
