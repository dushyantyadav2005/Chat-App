import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Menu, X, UsersRound } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <UsersRound  className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">GOSSIPY</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
          {authUser && (
            <>
              <Link to="/profile" className="btn btn-sm gap-2">
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button className="flex gap-2 items-center btn btn-sm" onClick={logout}>
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="btn btn-sm btn-ghost" aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300">
          <nav className="flex flex-col p-4 space-y-2">
            <Link to="/settings" className="btn btn-sm justify-start gap-2" onClick={toggleMobileMenu}>
              <Settings className="w-4 h-4" /> Settings
            </Link>
            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm justify-start gap-2" onClick={toggleMobileMenu}>
                  <User className="size-5" /> Profile
                </Link>
                <button className="btn btn-sm justify-start gap-2" onClick={() => { logout(); toggleMobileMenu(); }}>
                  <LogOut className="size-5" /> Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;