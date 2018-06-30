const argv = require('./config/yargs').argv;
const todo = require('./todo/todo')

let comando = argv._[0]
switch (comando) {
  case 'crear':
    let tarea = todo.create(argv.description)
    console.log(tarea);
    break;
  case 'listar':
    todo.list(argv.filter)
    break;
  case 'actualizar':
    todo.update(argv.id, argv.completed)
    break;
  case 'eliminar':
    todo.destroy(argv.id);
    break;
  default:
    console.log('Comando no reconocido');

}
