import {
  dataTarea,
  mensajeConfirmacion,
  menuListarTareas,
  menuPrincipal,
  pausaMenu,
  seleccionarTareas,
} from "./helpers/menuInquirer.js";
import { guardarTarea, leerDbTarea } from "./helpers/taraeasDb.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
  let option = "";
  const tareas = new Tareas();
  do {
    console.clear();
    option = await menuPrincipal();
    tareas.setListadoTareas();
    switch (option) {
      case "1":
        const { nombreTarea } = await dataTarea();
        tareas.crearTareas(nombreTarea);
        break;
      case "2":
        tareas.listarTareas();
        break;
      case "3":
        tareas.listarTareasPorEstado(false);
        break;
      case "4":
        tareas.listarTareasPorEstado(true);
        break;
      case "5":
        const { tareaSeleccionadas } = await seleccionarTareas(
          tareas._listadoTareasArr
        );
        tareas.completarTareas(tareaSeleccionadas);
        break;
      case "6":
        const idBorrar = await menuListarTareas(tareas._listadoTareasArr);
        if (idBorrar !== "0") {
          const message = `Seguro que desea eliminar la tarea ?`;
          const { confirmacion } = await mensajeConfirmacion(message);
          if (confirmacion) {
            tareas.borrarTarea(idBorrar);
          }
        }
        break;
    }

    guardarTarea(tareas._listadoTareasArr);

    await pausaMenu();
  } while (option !== "0");
};

main();
