import { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion } from 'framer-motion';

// Brazil map GeoJSON data
const geoUrl = "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/brazil-states.geojson";

interface Partner {
  name: string;
  location: string;
  address: string;
}

interface StateData {
  name: string;
  partners: Partner[];
}

interface PartnersData {
  [key: string]: StateData;
}

// Partners data with actual partners
const partnersData: PartnersData = {
  "pernambuco": {  // Mudando para minúsculo pois o GeoJSON usa assim
    name: "Pernambuco",
    partners: [
      { name: "Baixinho", location: "Garanhuns", address: "Av. Frei Caneca, 120 A – Heliópolis" },
      { name: "Barbeiros Club", location: "Garanhuns", address: "Av. Simoa Gomes, 85 – Heliópolis" },
      { name: "Academia Happy Fit", location: "Garanhuns", address: "R. Quinze de Novembro, 214 – Santo Antônio" },
      { name: "FIC", location: "Garanhuns", address: "Rodovia BR 423 – São José" },
    ]
  }
};

const Partners = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [, setHoveredState] = useState<string | null>(null);

  const handleStateClick = (stateCode: string) => {
    console.log('Clicked state:', stateCode);
    setSelectedState(stateCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-6 pb-20 pt-40">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Container */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-h-[600px] content-center">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 800,
                center: [-53, -15.5]
              }}
              width={1200}
              height={600}
              style={{
                width: "100%",
                height: "auto"
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo: any) => {
                    const stateCode = geo.properties.name.toLowerCase();
                    const hasPartners = Object.keys(partnersData).includes(stateCode);
                    const isSelected = selectedState === stateCode;
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => hasPartners && handleStateClick(stateCode)}
                        onMouseEnter={() => setHoveredState(stateCode)}
                        onMouseLeave={() => setHoveredState(null)}
                        style={{
                          default: {
                            fill: hasPartners 
                              ? (isSelected ? "#000000" : "#EAFD5C") 
                              : "#D6D6D6",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.75,
                            outline: "none",
                            cursor: hasPartners ? "pointer" : "default"
                          },
                          hover: {
                            fill: hasPartners 
                              ? "#000000"
                              : "#D6D6D6",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#000000",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {/* Partners List Container */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-h-[600px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {selectedState && partnersData[selectedState]
                ? `Parceiros em ${partnersData[selectedState].name}`
                : "Selecione um estado no mapa"}
            </h2>
            
            {selectedState && partnersData[selectedState] ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 max-h-[400px] overflow-y-auto pr-4"
              >
                {partnersData[selectedState].partners.map((partner: Partner, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-semibold text-lg text-black">{partner.name}</h3>
                    <p className="text-gray-600">{partner.location}</p>
                    <p className="text-gray-500 text-sm">{partner.address}</p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center">
                {selectedState ? (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Não há parceiros cadastrados em {selectedState} ainda.
                    </p>
                    <p className="text-sm text-gray-500">
                      Os estados destacados em amarelo possuem parceiros ativos.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Clique em um estado para ver os parceiros disponíveis.
                    </p>
                    <p className="text-sm text-gray-500">
                      Os estados destacados em amarelo possuem parceiros ativos.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners; 