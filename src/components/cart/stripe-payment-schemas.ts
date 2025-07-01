import { z } from "zod";

const ITEMS_ENUM = { FLOWERS: "flowers", CAR: "car" } as const;

const itemSchema = z.object({
  name: z.enum([ITEMS_ENUM.FLOWERS, ITEMS_ENUM.CAR]),
  priceCent: z.number().min(10),
  quantity: z.number().min(1),
});

export const createCheckoutSchema = itemSchema.array();
