import * as fs from "fs";

const pathDb = "./db/Tareas.json";

const guardarTarea = (data) => {
  fs.writeFileSync(pathDb, JSON.stringify(data));
};

const leerDbTarea = () => {
  const isDbTarea = fs.existsSync(pathDb);
  if (!isDbTarea) {
    return null;
  }
  const tareasDb = JSON.parse(fs.readFileSync(pathDb, { encoding: "utf8" }));
  return tareasDb;
};

export { guardarTarea, leerDbTarea };
