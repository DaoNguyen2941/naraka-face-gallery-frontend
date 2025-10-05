import { File } from "@/types";

export type Album = {
   id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  cover_photo: File
};
