<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI-Powered Image Editor

This repository contains a web-based image editing application that leverages the power of Google's Gemini AI to provide intelligent and context-aware image manipulation features.

View your app in AI Studio: https://ai.studio/apps/drive/1UDxBXmZmssb3v_OzbkBPG4_q-8U8JNHB

## About The Project

This application is an advanced image editor that goes beyond traditional tools by integrating generative AI. It allows users to upload their images and perform complex edits using simple text prompts. The editor is built with React, TypeScript, and Tailwind CSS, and it communicates with a backend service powered by the Gemini API.

### Key Features

*   **AI-Powered Retouching**: Make localized edits to a specific point on an image by simply clicking on it and describing the desired change (e.g., "change shirt color to blue").
*   **Creative Filters**: Apply global, stylistic filters to the entire image with a text prompt (e.g., "apply a vintage film look").
*   **Intelligent Logo Swap**: Automatically find and replace a specific logo within an image with a new one, while preserving the background and other elements.
*   **Undo/Redo & History**: Easily navigate through your editing history with undo and redo capabilities.
*   **Compare Original**: Instantly compare your edited masterpiece with the original image by holding down the "Compare" button.

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

*   **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **Gemini API Key**: You need an API key for the Gemini API. You can obtain one from [Google AI Studio](https://ai.studio/google-ai-for-developers/).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your Gemini API key as follows:
    ```
    API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1.  **Upload an Image**: Start by dragging and dropping an image file onto the start screen or by clicking to select a file.
2.  **Choose a Tool**:
    *   **Retouch**: Click anywhere on the image to select a "hotspot." Then, type a description of the edit you want to make in the text box and click "Generate."
    *   **Creative Filters**: Select the "Creative Filters" tab. Choose a predefined filter or write your own prompt and click "Apply Filter."
    *   **Swap Logo**: Go to the "Swap Logo" tab and click the button to perform the automated logo replacement.
3.  **Manage Edits**: Use the "Undo" and "Redo" buttons to move through your edit history. Press and hold the "Compare" button to see the original image.
4.  **Download**: Once you are happy with your edits, click the "Download Image" button to save your work.
5.  **Start Over**: Use the "Reset" button to revert all changes to the original uploaded image, or "Upload New" to start fresh with a different image.
