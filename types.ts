/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Represents a single step in the image editing history.
 */
export interface HistoryStep {
    /** The image file at this state. */
    image: File;
    /** A brief description of the action that led to this state. */
    description: string;
}

/**
 * Defines the coordinates for a point on an image.
 */
export interface Point {
    /** The x-coordinate (horizontal position). */
    x: number;
    /** The y-coordinate (vertical position). */
    y: number;
}

/**
 * Represents a rectangular area on an image.
 */
export interface Rect {
    /** The x-coordinate of the top-left corner. */
    x: number;
    /** The y-coordinate of the top-left corner. */
    y: number;
    /** The width of the rectangle. */
    width: number;
    /** The height of the rectangle. */
    height: number;
}
