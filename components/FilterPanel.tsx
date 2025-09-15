/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { PaletteIcon } from './icons';

interface FilterPanelProps {
  onApplyFilter: (prompt: string) => void;
  isLoading: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilter, isLoading }) => {
  const [selectedPresetPrompt, setSelectedPresetPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  const presets = [
    { name: 'Synthwave', prompt: 'Apply a vibrant 80s synthwave aesthetic with neon magenta and cyan glows, and subtle scan lines.' },
    { name: 'Anime', prompt: 'Give the image a vibrant Japanese anime style, with bold outlines, cel-shading, and saturated colors.' },
    { name: 'Lomo', prompt: 'Apply a Lomography-style cross-processing film effect with high-contrast, oversaturated colors, and dark vignetting.' },
    { name: 'Holograma', prompt: 'Transform the image into a futuristic holographic projection with digital glitch effects and chromatic aberration.' },
  ];
  
  const activePrompt = selectedPresetPrompt || customPrompt;

  const handlePresetClick = (prompt: string) => {
    setSelectedPresetPrompt(prompt);
    setCustomPrompt('');
  };
  
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedPresetPrompt(null);
  };

  const handleApply = () => {
    if (activePrompt) {
      onApplyFilter(activePrompt);
    }
  };

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col items-center gap-4 animate-fade-in backdrop-blur-sm">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-2">
            <PaletteIcon className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-center text-gray-200">Aplica un Filtro Creativo</h3>
        <p className="text-md text-gray-400 text-center max-w-lg -mt-2">
            Transforma tu foto con un estilo artístico. Elige un preajuste o describe el tuyo.
        </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
        {presets.map(preset => (
          <button
            key={preset.name}
            onClick={() => handlePresetClick(preset.prompt)}
            disabled={isLoading}
            className={`w-full text-center bg-white/10 border border-transparent text-gray-200 font-semibold py-3 px-4 rounded-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:border-white/20 active:scale-95 text-base disabled:opacity-50 disabled:cursor-not-allowed ${selectedPresetPrompt === preset.prompt ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-blue-500' : ''}`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleApply(); }} className="w-full flex flex-col items-center gap-4">
        <input
            type="text"
            value={customPrompt}
            onChange={handleCustomChange}
            placeholder="O describe un filtro personalizado (ej., 'brillo synthwave de los 80')"
            className="flex-grow bg-gray-800 border border-gray-600 text-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition w-full disabled:cursor-not-allowed disabled:opacity-60 text-base"
            disabled={isLoading}
        />
        
        {activePrompt && (
            <div className="animate-fade-in flex flex-col gap-4 pt-2 w-full max-w-xs">
            <button
                type="submit"
                className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-lg disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading || !activePrompt.trim()}
            >
                Aplicar Filtro
            </button>
            </div>
        )}
      </form>
    </div>
  );
};

export default FilterPanel;