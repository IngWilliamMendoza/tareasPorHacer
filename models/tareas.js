import colors from "colors";
import { leerDbTarea } from "../helpers/taraeasDb.js";
import { Tarea } from "./tarea.js";

class Tareas {
  _listadoTareas = {};

  constructor() {
    this._listadoTareas = {};
  }

  crearTareas = (nombreTarea, completadoEn = null) => {
    const tarea = new Tarea(nombreTarea, completadoEn);
    this._listadoTareas[tarea.id] = tarea;
  };

  get _listadoTareasArr() {
    const listado = [];
    Object.keys(this._listadoTareas).forEach((id) => {
      listado.push(this._listadoTareas[id]);
    });
    return listado;
  }

  setListadoTareas = () => {
    const listadoTarea = leerDbTarea();
    if (listadoTarea) {
      listadoTarea.forEach((tarea) => {
        this._listadoTareas[tarea.id] = tarea;
      });
    }
  };

  listarTareas = () => {
    this._listadoTareasArr.forEach((tarea, index) => {
      let nombreTarea = "";
      if (tarea.completadoEn) {
        nombreTarea = tarea.nombreTarea.green;
      } else {
        nombreTarea = tarea.nombreTarea.red;
      }

      console.log(`${(index + 1 + ".").yellow} ${nombreTarea} `);
    });
  };

  listarTareasPorEstado = (completado) => {
    let contador = 0;
    if (!completado) {
      this._listadoTareasArr.forEach((tarea) => {
        if (!tarea.completadoEn) {
          contador += 1;
          console.log(
            `${colors.yellow(contador + ".")} ${colors.red(tarea.nombreTarea)} `
          );
        }
      });
    } else {
      this._listadoTareasArr.forEach((tarea) => {
        if (tarea.completadoEn) {
          contador += 1;
          console.log(
            `${colors.yellow(contador + ".")} ${colors.green(
              tarea.nombreTarea
            )} `
          );
        }
      });
    }
  };

  completarTareas = (ids) => {
    ids.forEach((id) => {
      this._listadoTareas[id].completadoEn = new Date().toISOString();
    });

    this._listadoTareasArr.forEach((tarea) => {
      const idTarea = tarea.id;
      if (!ids.includes(idTarea)) {
        this._listadoTareas[idTarea].completadoEn = null;
      }
    });
  };

  borrarTarea = (id) => {
    if (this._listadoTareas[id]) {
      delete this._listadoTareas[id];
    }
  };
}

export { Tareas };
