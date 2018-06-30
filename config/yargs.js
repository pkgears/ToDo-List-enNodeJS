const argv = require('yargs')
              .command('crear','Crear un nueva tarea',{
                description:{
                  demand: true,
                  alias:'d',
                  desc:'Descripción de la tarea por hacer'
                }
              })
              .command('listar','Listar todas la tarea',{
                filter:{
                  alias:'f',
                  default:'all',
                  description:'Filtra las tarea según su estado los valores pueden ser todas/pendientes/completadas'
                }
              })
              .command('actualizar','Actualizar una tarea',{
                id:{
                  demand:true
                },
                completed:{
                  alias:'c',
                  default:true
                }
              })
              .command('eliminar', 'Se removerá un item de la lista de tarea',{
                id:{
                  demand:true,
                  desc:'Es el ID de la tarea que se desea eliminar'
                }
              })
              .help()
              .argv;

module.exports = {
  argv
}
