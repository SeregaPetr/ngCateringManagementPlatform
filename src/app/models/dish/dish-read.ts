import { DepartmentRead } from "../department/department-read";

export class DishRead {
    id!: number;
    nameDish!: string;
    compositionDish!: string;
    weight!: number;
    price!: number;
    department!: DepartmentRead;
}
