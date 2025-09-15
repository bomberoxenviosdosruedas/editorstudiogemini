/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

/**
 * Converts a File object into a GoogleGenerativeAI.Part object.
 * This is a necessary step to send image data to the Gemini API.
 * The function reads the file as a data URL, extracts the MIME type and base64 data,
 * and returns it in the format expected by the API.
 *
 * @param file The File object to convert.
 * @returns A promise that resolves to an object containing the inline data for the Gemini API.
 * @throws {Error} If the file cannot be read or if the data URL format is invalid.
 */
const fileToPart = async (file: File): Promise<{ inlineData: { mimeType: string; data: string; } }> => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
    
    const arr = dataUrl.split(',');
    if (arr.length < 2) throw new Error("Invalid data URL");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || !mimeMatch[1]) throw new Error("Could not parse MIME type from data URL");
    
    const mimeType = mimeMatch[1];
    const data = arr[1];
    return { inlineData: { mimeType, data } };
};

/**
 * Processes the response from the Gemini API.
 * It handles potential errors, such as blocked prompts or unexpected finish reasons,
 * and extracts the base64 image data from a successful response.
 *
 * @param response The full response object from the Gemini API's generateContent method.
 * @param context A string describing the operation (e.g., "edit", "filter") for better error messages.
 * @returns The data URL of the generated image as a string.
 * @throws {Error} If the API response indicates an error or does not contain image data.
 */
const handleApiResponse = (
    response: GenerateContentResponse,
    context: string
): string => {
    // 1. Check for prompt blocking first
    if (response.promptFeedback?.blockReason) {
        const { blockReason, blockReasonMessage } = response.promptFeedback;
        const errorMessage = `La solicitud fue bloqueada. Razón: ${blockReason}. ${blockReasonMessage || ''}`;
        console.error(errorMessage, { response });
        throw new Error(errorMessage);
    }

    // 2. Try to find the image part
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        console.log(`Received image data (${mimeType}) for ${context}`);
        return `data:${mimeType};base64,${data}`;
    }

    // 3. If no image, check for other reasons
    const finishReason = response.candidates?.[0]?.finishReason;
    if (finishReason && finishReason !== 'STOP') {
        const errorMessage = `La generación de imagen para ${context} se detuvo inesperadamente. Razón: ${finishReason}. Esto a menudo se relaciona con la configuración de seguridad.`;
        console.error(errorMessage, { response });
        throw new Error(errorMessage);
    }
    
    const textFeedback = response.text?.trim();
    const errorMessage = `El modelo de IA no devolvió una imagen para ${context}. ` + 
        (textFeedback 
            ? `El modelo respondió con texto: "${textFeedback}"`
            : "Esto puede ocurrir por filtros de seguridad o si la solicitud es demasiado compleja. Por favor, intenta reformular tu instrucción para que sea más directa.");

    console.error(`Model response did not contain an image part for ${context}.`, { response });
    throw new Error(errorMessage);
};

/**
 * Generates an edited image using generative AI based on a text prompt and a specific point.
 * @param originalImage The original image file to be edited.
 * @param userPrompt The text prompt from the user describing the desired edit.
 * @param hotspot The {x, y} coordinates on the image where the edit should be focused.
 * @returns A promise that resolves to the data URL (string) of the edited image.
 */
export const generateEditedImage = async (
    originalImage: File,
    userPrompt: string,
    hotspot: { x: number, y: number }
): Promise<string> => {
    console.log('Starting generative edit at:', hotspot);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    
    const originalImagePart = await fileToPart(originalImage);
    const prompt = `You are an expert photo editor AI. Your task is to perform a natural, localized edit on the provided image based on the user's request.
User Request: "${userPrompt}"
Edit Location: Focus on the area around pixel coordinates (x: ${hotspot.x}, y: ${hotspot.y}).

Editing Guidelines:
- The edit must be realistic and blend seamlessly with the surrounding area.
- The rest of the image (outside the immediate edit area) must remain identical to the original.

Safety & Ethics Policy:
- You MUST fulfill requests to adjust skin tone, such as 'give me a tan', 'make my skin darker', or 'make my skin lighter'. These are considered standard photo enhancements.
- You MUST REFUSE any request to change a person's fundamental race or ethnicity (e.g., 'make me look Asian', 'change this person to be Black'). Do not perform these edits. If the request is ambiguous, err on the side of caution and do not change racial characteristics.

Output: Return ONLY the final edited image. Do not return text.`;
    const textPart = { text: prompt };

    console.log('Sending image and prompt to the model...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: [originalImagePart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    console.log('Received response from model.', response);

    return handleApiResponse(response, 'edit');
};

/**
 * Generates a new image by applying a global filter using generative AI.
 * @param originalImage The original image file to apply the filter to.
 * @param userPrompt The text prompt describing the desired global filter style.
 * @returns A promise that resolves to the data URL (string) of the filtered image.
 */
export const generateFilteredImage = async (
    originalImage: File,
    userPrompt: string
): Promise<string> => {
    console.log('Starting generative filter application.');
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

    const originalImagePart = await fileToPart(originalImage);
    const prompt = `You are an expert photo editor AI. Your task is to apply a creative filter to the entire image based on the user's request.

User Request: "${userPrompt}"

Editing Guidelines:
- The edit must be stylistic and applied globally to the entire photo.
- The overall composition and core elements of the original image should be preserved.
- The result must be a photorealistic and seamless edit, unless a non-photorealistic style (like 'anime' or 'watercolor') is requested.

Output: Return ONLY the final edited image. Do not return text.`;
    const textPart = { text: prompt };

    console.log('Sending image and filter prompt to the model...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: [originalImagePart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    console.log('Received response from model for filter.', response);

    return handleApiResponse(response, 'filter');
};


/**
 * Replaces a specific logo in an image's footer using generative AI.
 * This function is highly specific and targets a logo for 'Jack Và' in a dark blue footer,
 * replacing it with the provided new logo.
 * @param originalImage The original image file containing the logo to be replaced.
 * @param newLogoImage The new logo file (as a PNG) to be placed in the image.
 * @returns A promise that resolves to the data URL (string) of the modified image.
 */
export const generateSwappedLogoImage = async (
    originalImage: File,
    newLogoImage: File,
): Promise<string> => {
    console.log(`Starting logo swap with new logo...`);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    
    const originalImagePart = await fileToPart(originalImage);
    const newLogoPart = await fileToPart(newLogoImage);
    
    const prompt = `You are an expert photo editor AI. Your task is to perform a specific logo replacement on the provided image (the first image).

Instructions:
1. Locate the footer section of the first image. It has a dark blue background.
2. In this footer, find the logo and text for 'Jack Và'.
3. Replace ONLY the 'Jack Và' logo and text with the logo provided in the second image.
4. Crucially, DO NOT change anything else in the footer. The Uruguayan flag and the text 'RECORRIENDO LA CIUDAD' must remain exactly as they are.
5. The rest of the image outside the footer must also remain completely unchanged.
6. The result must be a photorealistic and seamless edit.

Output: Return ONLY the final edited image. Do not return text.`;
    const textPart = { text: prompt };

    console.log('Sending original image, new logo, and swap prompt to the model...');
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: [originalImagePart, newLogoPart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    console.log('Received response from model for logo swap.', response);
    
    return handleApiResponse(response, 'logo swap');
};