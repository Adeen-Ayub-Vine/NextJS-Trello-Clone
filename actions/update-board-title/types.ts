import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateBoardTitle } from "./schema";

export type InputType = z.infer<typeof UpdateBoardTitle>;
export type ReturnType = ActionState<InputType, Board>;
