export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand / Name */}
        <div className="flex flex-col mb-4 md:mb-0">
          <span className="heading-font text-xl font-bold text-white tracking-tighter">
            Yurii Dmytrenko
          </span>
          <span className="text-neutral-500 text-sm">
            Full-Stack Developer
          </span>
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-6">
          <FooterLink href="https://github.com/YuraItDeveloper14" text="GitHub" />
          <FooterLink href="https://www.linkedin.com/in/%D1%8E%D1%80%D1%87%D0%B8%D0%BA-0b550030b" text="LinkedIn" />
          <FooterLink href="https://t.me/ydmytrenko14" text="Telegram" />
        </div>
        
        {/* Copyright */}
        <div className="mt-8 md:mt-0 text-neutral-600 text-sm">
          &copy; {year} All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, text }: { href: string, text: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm uppercase tracking-widest font-medium relative group"
    >
      {text}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
}
