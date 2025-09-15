/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/**
 * Props for the EditorCanvas component.
 * @property {File | null} image - The image file to be displayed on the canvas.
 * @property {(e: React.MouseEvent<HTMLCanvasElement>) => void} onCanvasClick - Callback for when the canvas is clicked.
 */
interface EditorCanvasProps {
    image: File | null;
    onCanvasClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}

/**
 * A component responsible for rendering the main image editor canvas.
 * It would handle displaying the image and capturing user interactions like clicks or drags.
 * This component is currently a placeholder.
 *
 * @param {EditorCanvasProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered canvas element.
 */
const EditorCanvas: React.FC<EditorCanvasProps> = ({ image, onCanvasClick }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if (image && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const img = new Image();
                img.onload = () => {
                    canvasRef.current!.width = img.width;
                    canvasRef.current!.height = img.height;
                    ctx.drawImage(img, 0, 0);
                };
                img.src = URL.createObjectURL(image);
            }
        }
    }, [image]);

    return (
        <canvas
            ref={canvasRef}
            onClick={onCanvasClick}
            style={{ cursor: 'crosshair' }}
        />
    );
};

export default EditorCanvas;
