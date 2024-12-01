export const ROUTER = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Gallery",
    path: "/gallery",
  },
  {
    id: 3,
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

export interface ImageForm {
  image_url: string;
  title: string;
  description: string;
  tags: string[];
  filmed_at: Date | null;
}
