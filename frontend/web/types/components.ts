import type { RouteLocationNamedI18n, RouteLocationResolvedI18n } from 'vue-router';

export interface SidebarLinkWithChildrens {
  hasChildrens: true;
  title: string;
  icon: string;
  root: string;
  subLinks: Omit<SidebarLink, 'hasChildrens'>[];
}

export interface SidebarLink {
  hasChildrens: false;
  title: string;
  to: RouteLocationNamedI18n | RouteLocationResolvedI18n;
  icon: string;
}

export interface UserLink {
  title: string;
  to: RouteLocationNamedI18n | RouteLocationResolvedI18n;
  icon: string;
}
