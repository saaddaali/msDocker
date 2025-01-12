// components/Sidebar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Car,
  UserPlus,
  CarFront,
  LayoutDashboard,
  ChevronRight,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Clients",
      path: "/clients",
      icon: <Users size={20} />,
    },
    {
      title: "Voitures",
      path: "/voitures",
      icon: <Car size={20} />,
    },
    {
      title: "Nouveau Client",
      path: "/add-client",
      icon: <UserPlus size={20} />,
    },
    {
      title: "Nouvelle Voiture",
      path: "/add-voiture",
      icon: <CarFront size={20} />,
    },
  ];

  return (
    <div
      className={`bg-gradient-to-b from-purple-700 to-blue-600 text-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } min-h-screen`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-3">
            <CarFront className="h-8 w-8" />
            <span className="text-xl font-bold">AutoPlus</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronRight
            className={`transform transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
              isActive(item.path)
                ? "bg-white/20 font-semibold"
                : "hover:bg-white/10"
            }`}
          >
            {item.icon}
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout button at bottom */}
      <div className="absolute bottom-0 w-full p-4">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors">
          <LogOut size={20} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
}
