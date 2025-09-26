import React from "react";
import cerebrohome from "../assets/cerebrohome.png";
import mindsethome from "../assets/mindsethome.png";

export const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white px-8 py-12">
      {/* Título principal */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-dark text-center mb-16 leading-tight">
        VOCÊ <br />
        IMPORTA!
      </h1>

      {/* Container principal */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-16 relative">
        {/* Lado esquerdo */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-8">
          <p className="text-2xl md:text-4xl font-bold max-w-xs leading-snug text-left">
            VOCÊ <span className="text-blue-500">NÃO</span><br />
            PRECISA <span className="text-blue-500">SOFRER</span><br />
            EM <span className="text-blue-500">SILÊNCIO</span>
          </p>
        </div>

        {/* Centro */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Mindset gigante */}
          <img
            src={mindsethome}
            alt="Mindset"
            className="w-[700px] md:w-[900px] object-contain"
          />

          {/* Cérebro grande acima do texto da direita */}
          <img
            src={cerebrohome}
            alt="Cérebro"
            className="absolute top-[110%] md:top-[75%] right-0 w-60 md:w-80 object-contain"
          />
        </div>

        {/* Lado direito */}
        <div className="flex-1 flex flex-col items-center md:items-end justify-center gap-8">
          <p className="text-2xl md:text-4xl font-bold max-w-xs leading-snug text-right">
            EXISTE <span className="text-blue-500">ESPERANÇA</span><br />
            MESMO<br />
            QUANDO SEU<br />
            CÉREBRO DIZ<br />
            QUE NÃO
          </p>
        </div>
      </div>
    </div>
  );
};
