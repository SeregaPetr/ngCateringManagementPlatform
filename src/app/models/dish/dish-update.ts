export class DishUpdate {
   constructor(
    public id?: number,
    public nameDish?: string,
    public compositionDish?: string,
    public weight?: number,
    public price?: number,
    public departmentId?: number,
    ) { }
}
