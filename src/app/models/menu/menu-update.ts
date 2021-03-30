import { MenuCategoryUpdate } from "../menu-category/menu-category-update";

export class MenuUpdate {
    id!: number;
    isActive!: boolean;
    nameMenu!: string;
    menuCategories!: MenuCategoryUpdate[];
}
