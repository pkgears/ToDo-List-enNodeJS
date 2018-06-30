const fs = require('fs')
const colors = require('colors')

let listadoPorHacer = [];

const readDB = () =>{
  try{
    listadoPorHacer = require('../db/data.json')
  }catch(e){
    listadoPorHacer = []
  }
}

const save = ()=>{
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile('./db/data.json', data, (err)=>{
    if(err) throw new Error('No se pudo guardar el archivo'.red)
  })
}

const create = (description)=>{
    readDB()
    let toDo = {
      id:listadoPorHacer[0] == undefined ? 1 : listadoPorHacer[listadoPorHacer.length-1].id+1,
      description,
      completed:false
    };
    listadoPorHacer.push(toDo);
    save()
    return toDo
}

const list = (filter)=>{
  readDB()

  if(filter === 'completadas' || filter==='pendientes'){
    status = filter === 'completadas' ? true : false
    result = listadoPorHacer.filter((item)=> item.completed == status )
    printList(result)
  }else{
    if(filter != 'all') console.log('Filtro no reconocido, se imprimirán todas la tareas'.red);
    printList(listadoPorHacer)
  }

  return true
}

const printList = (array)=>{
  array.forEach((item)=>{
    console.log(`id: ${item.id} | description: ${item.description} | completed: ${item.completed}`.green);
    console.log('=============================================');
  })
}

const update = (id, status = true)=>{
  readDB();
  let index = listadoPorHacer.findIndex( item => item.id === id);
  if (index >= 0) {
    console.log('============ Se actualizará el siguiente elemento ========='.green);
    console.log(listadoPorHacer[index]);
    listadoPorHacer[index].completed = status;
    console.log('============ Resultado de actualización ========='.green);
    console.log(listadoPorHacer[index]);
    save()
    return true
  }else{
    console.log('No se encontró la tarea con ese ID'.red);
    return false
  }
}

const destroy = (id)=>{
  readDB();
  let index = listadoPorHacer.findIndex( item => item.id === id);
  if (index >= 0) {
    console.log('============= Se eliminará el siguiente item ==========='.green);
    console.log(listadoPorHacer[index]);
    listadoPorHacer.splice(index,1)
    save()
  }else{
    console.log(`No se encontró el item con el ID ${id}`.red);
  }
}

module.exports = {
  create,
  list,
  update,
  destroy
}
