import express, { Router } from 'express';
import path from 'path';



interface Options {
    port: number;
    routes: Router;
    public_Path?: string;    
}



export class Server{

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options){
        const { port, routes, public_Path = 'public' } = options;
        this.port = port;
        this.publicPath = public_Path;
        this.routes = routes;

    }
    async start(){

    
     //*middlewares

     this.app.use(express.json()); //raw json
     this.app.use(express.urlencoded({extended: true}));   // x-www-form-urlencoded
    
    //* public folder
    this.app.use(express.static(this.publicPath));

    //*Routes

    this.app.use(this.routes);
    // this.app.get('/api/todos', (req, res)=>{

    //     res.json([
    //         {id: 1, text: 'compra milechessssss', createdAt: new Date()},
    //         {id: 2, text: 'compra platanos', createdAt: null},
    //         {id: 3, text: 'compra vaselina', createdAt: new Date()},
    //     ]);


    // })



    //* SPA
    this.app.get('*', (req, res)=>{
        const indexPath = path.join( __dirname + '../../../public/index.html');
        res.sendFile(indexPath);
    })

        this.app.listen(this.port, () => {
            console.log('Server is running on port 3000');
        }
        );
    }

}