import { File } from "@/types";

export type Character = {
   id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: File
};
