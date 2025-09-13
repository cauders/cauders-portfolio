'use server';

import { z } from 'zod';
import { chat, type ChatInput, type ChatOutput } from '@/ai/flows/chatbot';

const chatFormSchema = z.object({
  message: z.string().min(1, 'Message is required.'),
});

interface ChatFormState {
    success: boolean;
    data: ChatOutput;
    error?: string;
}

export async function submitChatMessage(input: ChatInput): Promise<ChatFormState> {
  try {
    const validatedData = chatFormSchema.safeParse(input);

    if (!validatedData.success) {
      return {
        success: false,
        data: { response: '' },
        error: "Invalid message provided.",
      };
    }

    const response = await chat(validatedData.data);
    return {
      success: true,
      data: response,
    };
  } catch (e: any) {
    console.error('Error submitting chat message:', e);
    return {
      success: false,
      data: { response: '' },
      error: e.message || 'An unexpected error occurred.',
    };
  }
}
