'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting text, styling, and graphic design options for portfolio items.
 *
 * - getDynamicContentSuggestions - A function that generates content suggestions for a portfolio item.
 * - DynamicContentSuggestionsInput - The input type for the getDynamicContentSuggestions function.
 * - DynamicContentSuggestionsOutput - The return type for the getDynamicContentSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const DynamicContentSuggestionsInputSchema = z.object({
  projectTitle: z.string().describe('The title of the portfolio project.'),
  projectDescription: z.string().describe('A brief description of the project.'),
  projectCategory: z.string().describe('The category of the project (e.g., Web App, Mobile App, AI/ML).'),
  technologiesUsed: z.string().describe('A comma-separated list of technologies used in the project.'),
  brandStyleGuide: z.string().describe('A description of the brand style guide, including colors, fonts, and visual elements.'),
});
export type DynamicContentSuggestionsInput = z.infer<typeof DynamicContentSuggestionsInputSchema>;

const DynamicContentSuggestionsOutputSchema = z.object({
  suggestedText: z.string().describe('Suggested text for the project description, highlighting key features and benefits.'),
  suggestedStyling: z.string().describe('Suggested styling options, including color palette, font choices, and layout recommendations.'),
  suggestedGraphics: z.string().describe('Suggested graphic design options, such as images, icons, and illustrations that align with the project and brand.'),
});
export type DynamicContentSuggestionsOutput = z.infer<typeof DynamicContentSuggestionsOutputSchema>;

export async function getDynamicContentSuggestions(input: DynamicContentSuggestionsInput): Promise<DynamicContentSuggestionsOutput> {
  return dynamicContentSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicContentSuggestionsPrompt',
  input: {schema: DynamicContentSuggestionsInputSchema},
  output: {schema: DynamicContentSuggestionsOutputSchema},
  prompt: `You are an expert portfolio manager and creative director. Given the following project details and brand style guide, suggest text, styling, and graphic design options to create a visually appealing and informative project showcase.

Project Title: {{{projectTitle}}}
Project Description: {{{projectDescription}}}
Project Category: {{{projectCategory}}}
Technologies Used: {{{technologiesUsed}}}
Brand Style Guide: {{{brandStyleGuide}}}

Consider the project category and technologies used when making suggestions. The text suggestions should highlight key features and benefits. The styling suggestions should include a color palette, font choices, and layout recommendations. The graphic design suggestions should include images, icons, and illustrations that align with the project and brand.

Output your response in a structured JSON format.
`,
});

const dynamicContentSuggestionsFlow = ai.defineFlow(
  {
    name: 'dynamicContentSuggestionsFlow',
    inputSchema: DynamicContentSuggestionsInputSchema,
    outputSchema: DynamicContentSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
