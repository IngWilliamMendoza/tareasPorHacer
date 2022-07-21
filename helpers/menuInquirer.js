import colors from "colors";
import inquirer from "inquirer";

const menuPrincipal = async () => {
  const menuOpciones = [
    {
      type: "list",
      name: "option",
      message: "Que desea hacer ? ",
      choices: [
        {
          name: `${"1.".green} ${"Crear Tarea".yellow}`,
          value: "1",
        },
        {
          name: `${"2.".green} ${"Lista de Tareas".yellow}`,
          value: "2",
        },
        {
          name: `${"3.".green} ${"Tareas Pendientes".yellow}`,
          value: "3",
        },
        {
          name: `${"4.".green} ${"Tareas Completadas".yellow}`,
          value: "4",
        },
        {
          name: `${"5.".green} ${"Completar Tarea(s)".yellow}`,
          value: "5",
        },
        {
          name: `${"6.".green} ${"Borrar Tarea".yellow}`,
          value: "6",
        },
        {
          name: `${"0.".green} ${"Salir".yellow}`,
          value: "0",
        },
      ],
    },
  ];

  console.log("Menu Tareas Por Hacer".yellow);

  const { option } = await inquirer.prompt(menuOpciones);
  return option;
};

const pausaMenu = async () => {
  const menuPausa = [
    {
      type: "input",
      name: "pausa",
      message: `Presione ${"Enter".green} para continuar.`,
    },
  ];

  const pausaVariable = await inquirer.prompt(menuPausa);
  return pausaVariable;
};

const dataTarea = async () => {
  const inputTarea = [
    {
      type: "input",
      name: "nombreTarea",
      message: "Nombre de la tarea:",
    },
  ];

  const nombreTarea = await inquirer.prompt(inputTarea);
  return nombreTarea;
};

const menuListarTareas = async (tareas) => {
  const choices = tareas.map((tarea, index) => {
    return {
      name: `${colors.yellow(index + 1)} ${colors.cyan(tarea.nombreTarea)}`,
      value: tarea.id,
    };
  });

  choices.unshift({
    name: `${"0".yellow} ${"Cancelar".magenta}`,
    value: "0",
  });

  const configMenu = [
    {
      type: "list",
      name: "idTarea",
      message: "Seleccione la tarea: ",
      choices,
    },
  ];

  const { idTarea } = await inquirer.prompt(configMenu);
  return idTarea;
};

const mensajeConfirmacion = async (message) => {
  const menuConfirmacion = [
    {
      type: "confirm",
      name: "confirmacion",
      message,
    },
  ];

  const confirmacion = await inquirer.prompt(menuConfirmacion);
  return confirmacion;
};

const seleccionarTareas = async (tareas) => {
  const choices = tareas.map((tarea) => {
    return {
      name: tarea.nombreTarea,
      value: tarea.id,
      checked: tarea.completadoEn ? true : false,
    };
  });
  const configMenu = [
    {
      type: "checkbox",
      name: "tareaSeleccionadas",
      message: "Seleccione las tareas completadas: ",
      choices,
    },
  ];

  const tareaSeleccionadas = await inquirer.prompt(configMenu);
  return tareaSeleccionadas;
};

export {
  menuPrincipal,
  pausaMenu,
  dataTarea,
  menuListarTareas,
  mensajeConfirmacion,
  seleccionarTareas,
};
