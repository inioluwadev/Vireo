'use server';

/**
 * @fileOverview AI-Driven Design Inspiration: Generate random inspirational architectural concepts based on the parameters you select with this tool.
 *
 * - generateArchitectureConcept - A function that handles the generation of architectural concepts.
 * - GenerateArchitectureConceptInput - The input type for the generateArchitectureConcept function.
 * - GenerateArchitectureConceptOutput - The return type for the generateArchitectureConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArchitectureConceptInputSchema = z.object({
  buildingType: z
    .string()
    .describe('The type of building (e.g., residential, commercial, cultural).'),
  style: z.string().describe('The architectural style (e.g., modern, Bauhaus, Art Deco).'),
  materials: z.string().describe('The primary building materials (e.g., concrete, glass, wood).'),
  additionalFeatures: z.string().optional().describe('Any additional features to include in the design.'),
});

export type GenerateArchitectureConceptInput = z.infer<
  typeof GenerateArchitectureConceptInputSchema
>;

const GenerateArchitectureConceptOutputSchema = z.object({
  conceptDescription: z
    .string()
    .describe('A detailed description of the generated architectural concept.'),
});

export type GenerateArchitectureConceptOutput = z.infer<
  typeof GenerateArchitectureConceptOutputSchema
>;

export async function generateArchitectureConcept(
  input: GenerateArchitectureConceptInput
): Promise<GenerateArchitectureConceptOutput> {
  return generateArchitectureConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArchitectureConceptPrompt',
  input: {schema: GenerateArchitectureConceptInputSchema},
  output: {schema: GenerateArchitectureConceptOutputSchema},
  prompt: `You are an AI architect tasked with generating novel architectural concepts based on user-provided parameters.

  Building Type: {{{buildingType}}}
  Architectural Style: {{{style}}}
  Primary Building Materials: {{{materials}}}
  Additional Features: {{{additionalFeatures}}}

  Generate a detailed and inspirational architectural concept description, incorporating the specified parameters to create a unique and innovative design.
  `,
});

const generateArchitectureConceptFlow = ai.defineFlow(
  {
    name: 'generateArchitectureConceptFlow',
    inputSchema: GenerateArchitectureConceptInputSchema,
    outputSchema: GenerateArchitectureConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
