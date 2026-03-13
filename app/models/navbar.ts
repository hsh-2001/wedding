import type { Component } from "vue";

export interface INavbarItem {
    name: string;
    path: string;
    icon?: string | Component;
    activedPath: string | string[];
    children?: INavbarItem[];
}