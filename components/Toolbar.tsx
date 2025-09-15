/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/**
 * Defines the names of the tools that can be present in the toolbar.
 */
type ToolName = 'select' | 'brush' | 'eraser' | 'text' | 'crop';

/**
 * Props for the Toolbar component.
 * @property {(tool: ToolName) => void} onSelectTool - Callback function for when a tool is selected.
 * @property {ToolName} activeTool - The name of the currently active tool.
 */
interface ToolbarProps {
  onSelectTool: (tool: ToolName) => void;
  activeTool: ToolName;
}

/**
 * A toolbar component for selecting different editing tools.
 * It displays a list of tool buttons and highlights the active one.
 * This component is currently a placeholder.
 *
 * @param {ToolbarProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered toolbar.
 */
const Toolbar: React.FC<ToolbarProps> = ({ onSelectTool, activeTool }) => {
  const tools: ToolName[] = ['select', 'brush', 'eraser', 'text', 'crop'];

  return (
    <div className="toolbar-placeholder">
      {tools.map(tool => (
        <button
          key={tool}
          className={tool === activeTool ? 'active' : ''}
          onClick={() => onSelectTool(tool)}
        >
          {tool.charAt(0).toUpperCase() + tool.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
