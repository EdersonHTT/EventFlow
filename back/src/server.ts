import { AppDataSource } from './config/DataSource';
import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandler } from './Middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

AppDataSource.initialize().then(() => {
    console.log("Banco de dados conectado com sucesso!");  
    
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});