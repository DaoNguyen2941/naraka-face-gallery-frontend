import { Character } from "../character.type";
import { File } from "../file.type";
import { Tag } from "../tag.type";

export type Face = {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  character: Character;
  qrCodeCN?: File;
  qrCodeGlobals: File;
  imageReviews: File[];
  source?: string
};
