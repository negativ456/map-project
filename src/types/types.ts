// types.ts
export interface District {
  id: number;
  name: string;
  area: Point[];
  locations: GeoLocation[];
}

export type Point = [number, number];

export interface GeoObject {
  id: number;
  name: string;
  geoPoint: Point;
}

export interface GeoLocation {
  id: number;
  name: string;
  objects: GeoObject[];
  point: Point;
  geoPoint: Point;
}

export type SidebarItem = SidebarLink | SidebarAccordion

export interface SidebarItemBase {
  name: string;
  icon: string;
}

export interface SidebarAccordion extends SidebarItemBase {
  items: { title: string; path: string }[];
}

export interface SidebarLink extends SidebarItemBase {
  path: string;
}