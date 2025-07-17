
export interface Blog {
  _id: string;
  shelter: {
    _id: string;
    name: string;
    avatar?: string;
    address?: string;
    location?: {
      lat: number;
      lng: number;
    };
  };
  thumbnail_url: string;
  title: string;
  description?: string;
  content: string;
  status: "moderating" | "published";
  createdAt: string;
  updatedAt: string;
}
