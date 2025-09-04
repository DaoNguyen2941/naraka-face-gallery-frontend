export type PublicFaceDetails = {
  id: string;
  title: string;
  description?: string;
  source?: string;
  character: string;
  tags: string[];
  imageReviews: string[];
  qrCodeCN?: string;
  qrCodeGlobals?: string;
  createdAt: Date;
};