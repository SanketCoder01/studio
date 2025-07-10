'use server';

/**
 * @fileOverview A content improvement suggestion AI agent.
 *
 * - suggestContentImprovements - A function that handles the content improvement process.
 * - SuggestContentImprovementsInput - The input type for the suggestContentImprovements function.
 * - SuggestContentImprovementsOutput - The return type for the suggestContentImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestContentImprovementsInputSchema = z.object({
  contentType: z
    .enum(['About Me', 'Project Description'])
    .describe('The type of content to improve.'),
  content: z.string().describe('The content to be improved.'),
});
export type SuggestContentImprovementsInput = z.infer<
  typeof SuggestContentImprovementsInputSchema
>;

const SuggestContentImprovementsOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('The improved content based on the AI suggestions.'),
  suggestions: z
    .array(z.string())
    .describe('Specific suggestions made by the AI.'),
});
export type SuggestContentImprovementsOutput = z.infer<
  typeof SuggestContentImprovementsOutputSchema
>;

export async function suggestContentImprovements(
  input: SuggestContentImprovementsInput
): Promise<SuggestContentImprovementsOutput> {
  return suggestContentImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestContentImprovementsPrompt',
  input: {schema: SuggestContentImprovementsInputSchema},
  output: {schema: SuggestContentImprovementsOutputSchema},
  prompt: `You are an AI assistant designed to improve content for a portfolio website.

You will receive the current content and its type, and you will provide an improved version of the content, along with a list of specific suggestions that you made.

Content Type: {{{contentType}}}
Current Content: {{{content}}}

Improved Content:
Suggestions:`, // Handlebars syntax is used here
});

const suggestContentImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestContentImprovementsFlow',
    inputSchema: SuggestContentImprovementsInputSchema,
    outputSchema: SuggestContentImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
