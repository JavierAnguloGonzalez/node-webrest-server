import { prisma } from '../../data/postgres'; // Ensure the file exists at this path or update the path to the correct location
import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
  



export class TodosController{

    //*DI
    constructor() {}

public getTodos = async (req:Request, res:Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
}
public getTodoById = async (req:Request, res: Response) => {
    const id = +req.params.id;
    if ( isNaN(id)) res.status(400).json({error: 'Id argument is not a number'});
    const todo = await prisma.todo.findFirst({
        where: { id }
    });
    
    (todo)
    ? res.json(todo)
    : res.status(404).json({error: 'Todo not found'});
    console.log(id, 10);
};


public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if ( error) res.status(400).json({error});
    
    const todo = await prisma.todo.create({
        data: createTodoDto!
});

    
 
    res.json(todo);  

}


public updateTodo = async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
    if ( error ) res.status(400).json({error});
    
    const todo = await prisma.todo.findFirst({
        where: { id },
    });
    if ( !todo )  res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );

   const updatedTodo = await prisma.todo.update({
        where: { id }, 
        data: updateTodoDto!.values
    });

     res.json( updatedTodo );

  }


  public deleteTodo = async (req:Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({
        where: { id }
    });

    if ( !todo )  res.status(404).json({ error: `Todo with id ${ id } not found` });

    const deleted = await prisma.todo.delete({
        where: { id }
    });

    (deleted)
    ? res.json(deleted)
    : res.status(400).json({error: `Todo with id ${ id } not exist`});

    res.json( {todo, deleted} );

  }
  

}

