import { Link, useLocation } from "wouter";

export default function PageNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Accueil", isActive: location === "/" },
    { href: "/galerie", label: "Galerie", isActive: location === "/galerie" },
    { href: "/personnel", label: "Personnel", isActive: location === "/personnel" }
  ];

  return (
    <nav className="relative md:z-[9999]" style={{ zIndex: 10005 }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4 md:space-x-8 py-2 md:py-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`px-3 md:px-6 py-2 md:py-2 font-medium text-sm md:text-lg rounded-full transition-all duration-300 relative touch-manipulation cursor-pointer ${
                  item.isActive 
                    ? 'text-white shadow-lg' 
                    : 'text-brown-primary hover:text-white hover:shadow-md'
                }`}
                style={{
                  backgroundColor: item.isActive ? '#A38B87' : 'rgba(163, 139, 135, 0)',
                  minHeight: '44px',
                  minWidth: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  zIndex: 10006,
                  position: 'relative'
                }}
                onTouchStart={(e) => {
                  if (e.currentTarget) {
                    e.currentTarget.style.backgroundColor = '#A38B87';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onTouchEnd={(e) => {
                  if (!item.isActive && e.currentTarget) {
                    setTimeout(() => {
                      if (e.currentTarget) {
                        e.currentTarget.style.backgroundColor = 'rgba(163, 139, 135, 0)';
                        e.currentTarget.style.color = '';
                      }
                    }, 150);
                  }
                }}
                onMouseEnter={(e) => {
                  if (!item.isActive && e.currentTarget) {
                    e.currentTarget.style.backgroundColor = '#A38B87';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.isActive && e.currentTarget) {
                    e.currentTarget.style.backgroundColor = 'rgba(163, 139, 135, 0)';
                    e.currentTarget.style.color = '';
                  }
                }}
              >
                <span className="relative z-10">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}