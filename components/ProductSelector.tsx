/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/**
 * Represents a product that can be selected.
 * @property {string} id - The unique ID of the product.
 * @property {string} name - The name of the product.
 * @property {string} thumbnailUrl - URL for the product's thumbnail image.
 */
interface Product {
    id: string;
    name: string;
    thumbnailUrl: string;
}

/**
 * Props for the ProductSelector component.
 * @property {Product[]} products - A list of products to display.
 * @property {(productId: string) => void} onProductSelect - Callback for when a product is selected.
 */
interface ProductSelectorProps {
  products: Product[];
  onProductSelect: (productId: string) => void;
}

/**
 * A component that displays a list of products for the user to select.
 * This might be used for placing products into an image or scene.
 * This component is currently a placeholder.
 *
 * @param {ProductSelectorProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered product selector.
 */
const ProductSelector: React.FC<ProductSelectorProps> = ({ products, onProductSelect }) => {
  return (
    <div className="product-selector-placeholder">
      <h3>Select a Product</h3>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} onClick={() => onProductSelect(product.id)}>
            <img src={product.thumbnailUrl} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
