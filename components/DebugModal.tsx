/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/**
 * Props for the DebugModal component.
 * @property {boolean} isOpen - Whether the modal is currently open.
 * @property {() => void} onClose - Function to call when the modal should be closed.
 * @property {any} debugInfo - The information to be displayed within the debug modal.
 */
interface DebugModalProps {
  isOpen: boolean;
  onClose: () => void;
  debugInfo: any;
}

/**
 * A modal dialog for displaying debugging information.
 * This component is intended for development and troubleshooting purposes.
 * It is currently a placeholder and does not contain any implementation.
 *
 * @param {DebugModalProps} props - The props for the component.
 * @returns A placeholder div element, or null if not open.
 */
const DebugModal: React.FC<DebugModalProps> = ({ isOpen, onClose, debugInfo }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-placeholder">
      <h2>Debug Information</h2>
      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DebugModal;
