import { DishRead } from "../dish/dish-read";

export class MenuCategoryRead {
    id!: number;
    nameCategory!: string;
    dishes!: DishRead[];
}
