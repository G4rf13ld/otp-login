import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const emailServerSchema = z.string().email();

export { emailSchema, emailServerSchema };
