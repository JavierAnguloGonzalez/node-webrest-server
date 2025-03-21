import { Request, Response } from "express";


export class TodosController{

    //*DI
    constructor(){}
public getTodos = (req: Request, res:Response)=>{

    res.json([
        {id: 1, text: 'compra mileche', createdAt: new Date()},
        {id: 2, text: 'compra platanos', createdAt: null},
        {id: 3, text: 'compra vaselina', createdAt: new Date()},
    ]);
}

}