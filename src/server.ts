import { app } from "./app.js";

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Library Book Management API listening on port ${port}`));
