// components/VoitureList.jsx
import { useState, useEffect } from "react";
import { Car, Loader } from "lucide-react";
import VoitureService from "../services/VoitureService";

function VoitureList() {
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVoitures();
  }, []);

  const loadVoitures = () => {
    VoitureService.getAllVoitures()
      .then((response) => {
        setVoitures(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors du chargement des voitures");
        setLoading(false);
      });
  };

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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 text-indigo-600">
          <Car size={24} />
          <h2 className="text-xl font-semibold">Liste des Voitures</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modèle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matricule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Client
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {voitures.map((voiture) => (
              <tr
                key={voiture.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {voiture.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {voiture.marque}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {voiture.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {voiture.matricule}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                    Client #{voiture.idclient}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VoitureList;
