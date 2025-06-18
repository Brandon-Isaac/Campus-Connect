'use server';

/**
 * @fileOverview The opportunity generator AI agent for students.
 *
 * - opportunityGeneratorForStudents - A function that handles the generation of personalized opportunities for students.
 * - OpportunityGeneratorInput - The input type for the opportunityGeneratorForStudents function.
 * - OpportunityGeneratorOutput - The return type for the opportunityGeneratorForStudents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OpportunityGeneratorInputSchema = z.object({
  studentProfile: z
    .string()
    .describe('The profile details of the student, including academic achievements, extracurricular activities, and industry interests.'),
  studentActivities: z
    .string()
    .describe('A description of the students activities within the app, such as searches, messages, and event attendance.'),
});
export type OpportunityGeneratorInput = z.infer<typeof OpportunityGeneratorInputSchema>;

const OpportunityGeneratorOutputSchema = z.object({
  opportunities: z
    .array(z.string())
    .describe('A list of suggested mentorships, events, or job opportunities tailored to the student.'),
});
export type OpportunityGeneratorOutput = z.infer<typeof OpportunityGeneratorOutputSchema>;

export async function opportunityGeneratorForStudents(input: OpportunityGeneratorInput): Promise<OpportunityGeneratorOutput> {
  return opportunityGeneratorForStudentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'opportunityGeneratorPrompt',
  input: {schema: OpportunityGeneratorInputSchema},
  output: {schema: OpportunityGeneratorOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant mentorships, events, and job opportunities to students based on their profile and activities.

  Analyze the following student profile and recent activities to identify potential opportunities that the student might be interested in. Provide a list of opportunities that are highly relevant to the student's interests and background.

  Student Profile:
  {{studentProfile}}

  Student Activities:
  {{studentActivities}}

  Based on this information, suggest opportunities to the student:
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  }
});

const opportunityGeneratorForStudentsFlow = ai.defineFlow(
  {
    name: 'opportunityGeneratorForStudentsFlow',
    inputSchema: OpportunityGeneratorInputSchema,
    outputSchema: OpportunityGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
