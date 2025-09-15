/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/**
 * Represents the data for an object to be displayed in a card.
 * @property {string} id - A unique identifier for the object.
 * @property {string} name - The name of the object.
 * @property {string} imageUrl - The URL for the object's image.
 */
interface ObjectData {
    id: string;
    name: string;
    imageUrl: string;
}

/**
 * Props for the ObjectCard component.
 * @property {ObjectData} object - The data of the object to display.
 * @property {(id: string) => void} onSelect - Callback function when the card is selected.
 */
interface ObjectCardProps {
  object: ObjectData;
  onSelect: (id: string) => void;
}

/**
 * A component to display a single object or item in a card-like format.
 * This could be used in a selection list for objects to be added to a scene.
 * This component is currently a placeholder.
 *
 * @param {ObjectCardProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered object card.
 */
const ObjectCard: React.FC<ObjectCardProps> = ({ object, onSelect }) => {
  return (
    <div className="card-placeholder" onClick={() => onSelect(object.id)}>
      <img src={object.imageUrl} alt={object.name} />
      <h3>{object.name}</h3>
    </div>
  );
};

export default ObjectCard;
