// components/AddClient.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Save, ArrowLeft } from "lucide-react";
import ClientService from "../services/ClientService";

function AddClient() {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    nom: "",
    age: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    ClientService.addClient(client)
      .then(() => {
        navigate("/clients");
      })
      .catch((error) => {
        console.error("Error adding client:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
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
            <UserPlus size={28} className="text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">Nouveau Client</h2>
          </div>
          <button
            onClick={() => navigate("/clients")}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              name="nom"
              value={client.nom}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Entrez le nom du client"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Âge
            </label>
            <input
              type="number"
              name="age"
              value={client.age}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Entrez l'âge du client"
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
              <span>Enregistrer le client</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClient;
