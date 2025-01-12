// components/AddVoiture.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarFront, Save, ArrowLeft } from "lucide-react";
import VoitureService from "../services/VoitureService";

function AddVoiture() {
  const navigate = useNavigate();
  const [voiture, setVoiture] = useState({
    marque: "",
    model: "",
    matricule: "",
  });
  const [clientId, setClientId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    VoitureService.addVoiture(clientId, voiture)
      .then(() => {
        navigate("/voitures");
      })
      .catch((error) => {
        console.error("Error adding voiture:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoiture((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-t-xl p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CarFront size={28} className="text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Nouvelle Voiture
            </h2>
          </div>
          <button
            onClick={() => navigate("/voitures")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-b-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Client
            </label>
            <input
              type="number"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Entrez l'ID du client"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marque
              </label>
              <input
                type="text"
                name="marque"
                value={voiture.marque}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ex: Toyota"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modèle
              </label>
              <input
                type="text"
                name="model"
                value={voiture.model}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ex: Corolla"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Matricule
            </label>
            <input
              type="text"
              name="matricule"
              value={voiture.matricule}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Ex: 123-ABC-45"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              <Save size={20} />
              <span>Enregistrer la voiture</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVoiture;
