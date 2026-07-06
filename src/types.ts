export interface BerandaData {
  title?: string;
  subtitle?: string;
  experience?: string;
  image_url?: string;
  logo_name?: string;
}

export interface TentangData {
  name?: string;
  location?: string;
  description?: string;
  skills?: string;
  achievement?: string;
  image_url?: string;
}

export interface GalleryItem {
  name?: string;
  desc?: string;
  icon?: string;
}

export interface ContactData {
  email?: string;
  phone?: string;
  address?: string;
  map_url?: string;
}

export interface FooterData {
  copyright?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
}

export interface PortfolioData {
  beranda?: BerandaData;
  tentang?: TentangData;
  gallery?: GalleryItem[];
  contact?: ContactData;
  footer?: FooterData;
  messages?: any[];
}
