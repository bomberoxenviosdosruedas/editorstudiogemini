/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { SwapIcon, PaletteIcon } from './icons';

/**
 * Props for the SwapLogoPanel component.
 * @property {() => void} onPerformSwap - Callback to initiate the logo swap process.
 * @property {boolean} isLoading - Flag indicating if an operation is in progress.
 * @property {boolean} swapCompleted - Flag indicating if the logo swap has successfully completed.
 * @property {() => void} onApplySynthwave - Callback to apply a post-swap synthwave filter.
 */
interface SwapLogoPanelProps {
  onPerformSwap: () => void;
  isLoading: boolean;
  swapCompleted: boolean;
  onApplySynthwave: () => void;
}

/**
 * A specialized UI panel for performing a specific logo swap operation.
 * It replaces a 'Jack Và' logo with a 'PH Precio Hogar' logo from a local SVG file.
 * After a successful swap, it presents an option to apply a thematic synthwave filter.
 *
 * @param {SwapLogoPanelProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered logo swap panel.
 */
const SwapLogoPanel: React.FC<SwapLogoPanelProps> = ({ onPerformSwap, isLoading, swapCompleted, onApplySynthwave }) => {
  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col items-center gap-4 animate-fade-in backdrop-blur-sm">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-2">
        <SwapIcon className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-center text-gray-200">Swap Footer Logo</h3>
      <p className="text-md text-gray-400 text-center max-w-lg">
        This specialized tool automatically replaces the 'Jack Và' logo in the footer with the 'PH Precio Hogar' logo from the provided 'logo_nuevo.svg' file.
      </p>
      <button
        onClick={onPerformSwap}
        className="mt-4 w-full max-w-xs bg-gradient-to-br from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-lg disabled:from-blue-800 disabled:to-blue-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
        disabled={isLoading}
      >
        Perform Swap
      </button>

      {swapCompleted && !isLoading && (
        <div className="mt-6 pt-6 border-t border-gray-700 w-full flex flex-col items-center gap-4 animate-fade-in">
            <p className="text-lg font-semibold text-green-300">Logo swapped successfully!</p>
            <p className="text-md text-gray-400 text-center max-w-lg -mt-2">
                You can now apply a synthwave filter to your new image.
            </p>
            <button
                onClick={onApplySynthwave}
                className="mt-2 w-full max-w-xs bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-px active:scale-95 active:shadow-inner text-lg disabled:opacity-50"
                disabled={isLoading}
                aria-label="Apply Synthwave Filter"
            >
                <PaletteIcon className="w-5 h-5 mr-3 inline-block" />
                Apply Synthwave Filter
            </button>
        </div>
      )}
    </div>
  );
};

export default SwapLogoPanel;