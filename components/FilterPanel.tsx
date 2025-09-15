/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { PaletteIcon } from './icons';

/**
 * Props for the FilterPanel component.
 * @property {(prompt: string) => void} onApplyFilter - Callback to apply a filter with the given AI prompt.
 * @property {boolean} isLoading - Flag indicating if a filter operation is in progress.
 */
interface FilterPanelProps {
  onApplyFilter: (prompt: string) => void;
  isLoading: boolean;
}

/**
 * A UI component that allows users to apply creative, global filters to an image.
 * It provides a selection of preset filters and a field for custom filter prompts.
 *
 * @param {FilterPanelProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered filter panel.
 */
const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilter, isLoading }) => {
  const [selectedPresetPrompt, setSelectedPresetPrompt] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  /**
   * A list of predefined filter presets. Each has a name for the UI and a
   * detailed prompt for the AI to generate the desired style.
   */
  const presets = [
    { name: 'Synthwave', prompt: 'Apply a vibrant 80s synthwave aesthetic with neon magenta and cyan glows, and subtle scan lines.' },
    { name: 'Anime', prompt: 'Give the image a vibrant Japanese anime style, with bold outlines, cel-shading, and saturated colors.' },
    { name: 'Lomo', prompt: 'Apply a Lomography-style cross-processing film effect with high-contrast, oversaturated colors, and dark vignetting.' },
    { name: 'Hologram', prompt: 'Transform the image into a futuristic holographic projection with digital glitch effects and chromatic aberration.' },
  ];
  
  const activePrompt = selectedPresetPrompt || customPrompt;

  /**
   * Handles the click event on a preset button.
   * @param {string} prompt - The prompt of the selected preset.
   */
  const handlePresetClick = (prompt: string) => {
    setSelectedPresetPrompt(prompt);
    setCustomPrompt('');
  };
  
  /**
   * Handles changes in the custom prompt input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedPresetPrompt(null);
  };

  /**
   * Triggers the filter application by calling the parent callback with the active prompt.
   */
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
        <h3 className="text-xl font-bold text-center text-gray-200">Apply a Creative Filter</h3>
        <p className="text-md text-gray-400 text-center max-w-lg -mt-2">
            Transform your photo with an artistic style. Pick a preset or describe your own.
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
            placeholder="Or describe a custom filter (e.g., '80s synthwave glow')"
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
                Apply Filter
            </button>
            </div>
        )}
      </form>
    </div>
  );
};

export default FilterPanel;