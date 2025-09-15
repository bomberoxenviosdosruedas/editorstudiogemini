/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/**
 * Defines the types of tools available.
 */
type Tool = 'select' | 'brush' | 'eraser' | 'text';

/**
 * Props for the ToolOptions component.
 * @property {Tool} selectedTool - The currently selected tool.
 * @property {(value: any) => void} onOptionChange - Callback function for when a tool option is changed.
 */
interface ToolOptionsProps {
  selectedTool: Tool;
  onOptionChange: (option: string, value: any) => void;
}

/**
 * A component that displays options specific to the currently selected tool.
 * For example, it might show brush size options when the brush tool is active.
 * This component is currently a placeholder.
 *
 * @param {ToolOptionsProps} props - The props for the component.
 * @returns {React.ReactElement | null} The rendered tool options, or null if no tool is selected.
 */
const ToolOptions: React.FC<ToolOptionsProps> = ({ selectedTool, onOptionChange }) => {
  const renderOptions = () => {
    switch (selectedTool) {
      case 'brush':
        return (
          <div>
            <label>Brush Size:</label>
            <input
              type="range"
              min="1"
              max="100"
              onChange={(e) => onOptionChange('size', e.target.value)}
            />
          </div>
        );
      case 'text':
        return (
          <div>
            <label>Font Family:</label>
            <input
              type="text"
              onChange={(e) => onOptionChange('font', e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tool-options-placeholder">
      {renderOptions()}
    </div>
  );
};

export default ToolOptions;
