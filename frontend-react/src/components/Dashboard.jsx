// components/Dashboard.jsx
import { Users, Car, UserPlus, CarFront } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/clients"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Clients</h2>
              <p className="text-gray-600">Gérer vos clients</p>
            </div>
          </div>
        </Link>

        <Link
          to="/voitures"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Voitures</h2>
              <p className="text-gray-600">Gérer vos voitures</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Actions rapides
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/add-client"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <UserPlus className="h-6 w-6 text-purple-600" />
            <span className="font-medium text-gray-700">Ajouter un client</span>
          </Link>

          <Link
            to="/add-voiture"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <CarFront className="h-6 w-6 text-blue-600" />
            <span className="font-medium text-gray-700">
              Ajouter une voiture
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
