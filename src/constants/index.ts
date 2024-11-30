export const ROUTER = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Gallery",
    path: "/gallery",
  },
  {
    title: "Contact",
    path: "/contact",
  },
] as const;

export const TAGS = [
  "flora",
  "market",
  "street",
  "color",
  "portrait",
  "landscape",
] as const;

export interface ImageRow {
  id: string;
  tags: string[];
  title: string;
  description: string;
  image_url: string;
  filmed_at: Date;
}
