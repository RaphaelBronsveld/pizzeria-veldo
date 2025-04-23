import { Tables } from "@/types/database.types";

export type OrderItem = Omit<Tables<"order_item">, "created_at" | "id">;
