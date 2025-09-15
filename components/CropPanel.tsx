/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

/**
 * Props for the CropPanel component.
 * @property {() => void} onApplyCrop - Callback function to execute when the crop is applied.
 * @property {(aspect: number | undefined) => void} onSetAspect - Callback to set the desired aspect ratio for the crop area.
 * @property {boolean} isLoading - Indicates if a parent process is running, disabling the panel.
 * @property {boolean} isCropping - Indicates if a crop area is currently being selected.
 */
interface CropPanelProps {
  onApplyCrop: () => void;
  onSetAspect: (aspect: number | undefined) => void;
  isLoading: boolean;
  isCropping: boolean;
}

/**
 * Defines the available aspect ratio options for cropping.
 */
type AspectRatio = 'free' | '1:1' | '16:9';

/**
 * A UI panel for controlling image cropping.
 * It provides options for setting a fixed aspect ratio and a button to apply the crop.
 * This component is currently a placeholder for a potential cropping feature.
 *
 * @param {CropPanelProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered crop panel.
 */
const CropPanel: React.FC<CropPanelProps> = ({ onApplyCrop, onSetAspect, isLoading, isCropping }) => {
  const [activeAspect, setActiveAspect] = useState<AspectRatio>('free');
  
  /**
   * Handles changing the aspect ratio.
   * @param {AspectRatio} aspect - The name of the aspect ratio preset.
   * @param {number | undefined} value - The numerical value of the aspect ratio, or undefined for freeform.
   */
  const handleAspectChange = (aspect: AspectRatio, value: number | undefined) => {
    setActiveAspect(aspect);
    onSetAspect(value);
  }

  /**
   * A list of aspect ratio presets available to the user.
   */
  const aspects: { name: AspectRatio, value: number | undefined }[] = [
    { name: 'free', value: undefined },
    { name: '1:1', value: 1 / 1 },
    { name: '16:9', value: 16 / 9 },
  ];

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex flex-col items-center gap-4 animate-fade-in backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-gray-300">Crop Image</h3>
      <p className="text-sm text-gray-400 -mt-2">Click and drag on the image to select a crop area.</p>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-400">Aspect Ratio:</span>
        {aspects.map(({ name, value }) => (
          <button
            key={name}
            onClick={() => handleAspectChange(name, value)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-base font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 ${
              activeAspect === name 
              ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/20' 
              : 'bg-white/10 hover:bg-white/20 text-gray-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <button
        onClick={onApplyCrop}
        disabled={isLoading || !isCropping}
        className="w-full max-w-xs mt-2 bg-gradient-to-br from-green-600 to-green-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-px active:scale-95 active:shadow-inner text-base disabled:from-green-800 disabled:to-green-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
      >
        Apply Crop
      </button>
    </div>
  );
};

export default CropPanel;
