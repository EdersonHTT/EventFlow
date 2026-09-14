import { AppDataSource } from './config/DataSource';
import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
    console.log("Banco de dados conectado com sucesso!");  

    app.use("/api", router);
    
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});