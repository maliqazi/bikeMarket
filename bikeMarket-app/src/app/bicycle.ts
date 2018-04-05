export class Bicycle {
  constructor(
    public id: number = null,
    public title: string = "",
    public description: string = "",
    public price: string = "",
    public location: string = "",
    public created_at: Date = new Date(),
    public updated_at: Date = new Date()
  ){}
}
