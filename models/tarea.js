import { v4 as uuidv4 } from "uuid";

class Tarea {
  id = "";
  nombreTarea = "";
  completadoEn = null;
  constructor(name, completadoEn) {
    this.id = uuidv4();
    this.nombreTarea = name;
    this.completadoEn = completadoEn;
  }
}

export { Tarea };
