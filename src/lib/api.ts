const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

/** Absolute URL for media paths stored as "media/..." or "/media/...". */
export function mediaUrl(path: string | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE}/${path.replace(/^\//, "")}`;
}

export interface MenuListItem {
  id: number;
  name: string;
  description: string | null;
  schedule: string | null;
  order: number;
  active: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string | null;
  active: boolean;
  featured: boolean;
  video: string | null;
  images: string | null; // JSON array of relative paths
  createdAt: string;
  updatedAt: string;
}

export interface CategoryProduct {
  categoryId: number;
  productId: number;
  order: number;
  product: Product;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  price: string | null;
  active: boolean;
  order: number;
  menuId: number;
  video: string | null;
  createdAt: string;
  updatedAt: string;
  categoryProducts: CategoryProduct[];
}

export interface Subtitle {
  id: number;
  menuId: number;
  text: string;
  order: number;
  updatedAt: string;
}

export interface MenuDetail {
  id: number;
  name: string;
  description: string | null;
  schedule: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  subtitulos: Subtitle[];
}

export interface StaticContent {
  service_charge_pct: string;
  room_service_fee: string;
  intro_text: string;
  footer_text: string;
}

export interface PublicMenuResponse {
  menus: MenuListItem[];
  staticContent: StaticContent;
  hostalName: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function getMenus(): Promise<MenuListItem[]> {
  return fetchJson<PublicMenuResponse>("/public/menu").then((r) => r.menus);
}

export function getMenu(id: number): Promise<MenuDetail> {
  return fetchJson<MenuDetail>(`/public/menu/${id}`);
}
