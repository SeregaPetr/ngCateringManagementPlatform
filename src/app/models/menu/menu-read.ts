import { MenuCategoryRead } from "../menu-category/menu-category-read";

export class MenuRead {
    id!: number;
    isActive!: boolean;
    nameMenu!: string;
    menuCategories!: MenuCategoryRead[];
}
