// components/ClientList.jsx
import { useState, useEffect } from "react";
import { Users, Car, Loader, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ClientService from "../services/ClientService";
import VoitureService from "../services/VoitureService";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientVoitures, setClientVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    ClientService.getAllClients()
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors du chargement des clients");
        setLoading(false);
      });
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    VoitureService.getVoituresByClient(client.id)
      .then((response) => {
        setClientVoitures(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des voitures:", error);
        setClientVoitures([]);
      });
  };

  const filteredClients = clients.filter((client) =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with search and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gestion des Clients
          </h1>
          <p className="text-gray-600">Gérez vos clients et leurs voitures</p>
        </div>
        <Link
          to="/add-client"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          <span>Nouveau Client</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Clients List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <Users size={24} />
            <h2 className="text-xl font-semibold">Liste des Clients</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => handleClientClick(client)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedClient?.id === client.id
                      ? "bg-indigo-50 border-l-4 border-indigo-600"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">
                        {client.nom}
                      </div>
                      <div className="text-sm text-gray-600">
                        Age: {client.age} ans
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">ID: {client.id}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucun client trouvé
              </div>
            )}
          </div>
        </div>

        {/* Voitures Details */}
        <div>
          {selectedClient ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Car size={24} />
                  <h3 className="text-xl font-semibold">
                    Voitures de {selectedClient.nom}
                  </h3>
                </div>
                <Link
                  to="/add-voiture"
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Plus size={16} />
                  <span>Ajouter</span>
                </Link>
              </div>
              {clientVoitures.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marque
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Modèle
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Matricule
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {clientVoitures.map((voiture) => (
                        <tr key={voiture.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">{voiture.marque}</td>
                          <td className="px-4 py-3">{voiture.model}</td>
                          <td className="px-4 py-3">{voiture.matricule}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  Aucune voiture enregistrée pour ce client
                  <div className="mt-2">
                    <Link
                      to="/add-voiture"
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Ajouter une voiture
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center">
              <Car size={48} className="text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">
                Sélectionnez un client pour voir ses voitures
              </p>
              <p className="text-sm text-gray-400">
                Les détails des voitures apparaîtront ici
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientList;
