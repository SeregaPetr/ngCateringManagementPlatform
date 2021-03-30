import { DishUpdate } from "../dish/dish-update";

export class MenuCategoryUpdate {
    constructor(
        public id?: number,
        public nameCategory?: string,
        // public menuId?: number,
        public dishes?: DishUpdate[],
    ){ }
}
