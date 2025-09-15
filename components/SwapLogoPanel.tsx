/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { SwapIcon, PaletteIcon } from './icons';

interface SwapLogoPanelProps {
  onPerformSwap: () => void;
  isLoading: boolean;
  swapCompleted: boolean;
  onApplySynthwave: () => void;
}

const SwapLogoPanel: React.FC<SwapLogoPanelProps> = ({ onPerformSwap, isLoading, swapCompleted, onApplySynthwave }) => {
  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col items-center gap-4 animate-fade-in backdrop-blur-sm">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-2">
        <SwapIcon className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-center text-gray-200">Cambiar Logo del Pie de Página</h3>
      <p className="text-md text-gray-400 text-center max-w-lg">
        Reemplaza automáticamente el logo 'Jack Và' en el pie de página por el logo 'PH Precio Hogar' usando el archivo 'logo_nuevo.svg' proporcionado. Esta es una herramienta especializada para un formato de anuncio específico.
      </p>
      <button
        onClick={onPerformSwap}
        className="mt-4 w-full max-w-xs bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-lg disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
        disabled={isLoading}
      >
        Realizar Cambio
      </button>

      {swapCompleted && !isLoading && (
        <div className="mt-6 pt-6 border-t border-gray-700 w-full flex flex-col items-center gap-4 animate-fade-in">
            <p className="text-lg font-semibold text-green-300">¡Logo cambiado con éxito!</p>
            <p className="text-md text-gray-400 text-center max-w-lg -mt-2">
                Ahora puedes aplicar un filtro Synthwave a tu nueva imagen.
            </p>
            <button
                onClick={onApplySynthwave}
                className="mt-2 w-full max-w-xs bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-px active:scale-95 active:shadow-inner text-lg disabled:opacity-50"
                disabled={isLoading}
                aria-label="Aplicar Filtro Synthwave"
            >
                <PaletteIcon className="w-5 h-5 mr-3 inline-block" />
                Aplicar Filtro Synthwave
            </button>
        </div>
      )}
    </div>
  );
};

export default SwapLogoPanel;