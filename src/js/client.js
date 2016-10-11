import { createStore, combineReducers,applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import '../styles/index.scss';

import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';
import { todos } from './reducers/todos';
import { filters } from './reducers/visibility';
import {notas} from './reducers/notas';
import {tareas} from './reducers/tareas';
import {filter} from './reducers/appFilter.js';
import {buscar} from './reducers/busqueda.js';
import v4 from 'uuid-v4';
//import { } from './e2e/tareas.spec.js'
const { Component } = React;



const todoApp = combineReducers({
  todos: undoable(todos),
  notas: undoable(notas),
  tareas: undoable(tareas),
  filters: undoable(filters),
  filter: undoable(filter),
  buscar: undoable(buscar)
});

//implementación obtenida de github de samuel chavez
const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('state'));
    return result ? result : undefined;
  }
  catch(err){
    return undefined;
  }
}

const saveState = (state) => {
  try{
    localStorage.setItem('state', JSON.stringify(state));
  }
  catch(err){

  }
}


//implementación de http://redux.js.org/docs/api/applyMiddleware.html
function log({ getState }) {
  return (next) => (action) => {
    console.log('Accion a despachar: ', action);
    let returnValue = next(action);
    console.log('Estado despues: ', getState());
    return returnValue
  }
}

const store = createStore(todoApp,loadState(), applyMiddleware(log));

const FilterLink = ({ visibilityFilter, currentVisibilityFilter, onFilterClicked, children }) => {

  if(visibilityFilter === currentVisibilityFilter){
    return <strong>{ children }</strong>;
  }

  return <a
    href="#"
    onClick={
      (e) => {
        e.preventDefault();
        onFilterClicked(visibilityFilter);
      }
    }>
    { children }</a>
}


const getVisibleTodos = (todos, visibilityFilter) => {
  if(visibilityFilter[0].value === 'SHOW_ALL'){
    return todos;
  }

  if(visibilityFilter[0].value === 'SHOW_COMPLETED'){
    return todos.filter(t => t.completed);
  }

  if(visibilityFilter[0].value === 'SHOW_ACTIVE'){
    return todos.filter(t => !t.completed);
  }
}

const Todo = ({ id,text, completed, onTodoClicked }) => (
  <div>
  <li  style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
    onClick={ onTodoClicked }>
    { text }
  </li>
    <button
        onClick={
          () => {
            store.dispatch({
              type: 'REMOVE_TODO',
              payload: {
                id: id
              }
            });
          }
        }
      >Eliminar</button>
  </div>
);
const Nota = ({ id,title,description,color,archivado,date,datemodi}) => { 
  let input;
  let input1;
  var archivar;
  if(archivado==false){
    archivar=<button
        onClick={
          () => {
            store.dispatch({
              type: 'ARCHIVAR_NOTA',
              payload: {
                id: id,
                archivado: true
              }
            });
          }
        }
      >Archivar</button>
  }else{
    archivar=<button
        onClick={
          () => {
            store.dispatch({
              type: 'ARCHIVAR_NOTA',
              payload: {
                id: id,
                archivado: false
              }
            });
          }
        }
      >Desarchivar</button>
  }
  return(
    <div class="element"
      style={{
         background: color
      }}
    >
      <h2 contentEditable='true' type="text" ref={ node => input = node }>{ title }</h2>
      <h3 contentEditable='true' type="text" ref={ node1 => input1 = node1 }>{description}</h3>
      <button
        onClick={
          () => {
            store.dispatch({
              type: 'EDIT_NOTA',
              payload: {
                id: id,
                title: input.innerText,
                description:input1.innerText
              }
            });
          }
        }
      >Guardar</button>
      {archivar}
      <button
        onClick={
          () => {
            store.dispatch({
              type: 'REMOVE_NOTA',
              payload: {
                id: id
              }
            });
          }
        }
      >Eliminar</button>
    Creado:{date}
    {' '}
    Modificado:{datemodi}
    </div>
  )
};
const Tarea = ({ id,title,color,onAddTodo,todos,visibilityFilter,archivado,date,datemodi}) => {
  let input;
  var archivar;
  if(archivado==false){
    archivar=<button
        onClick={
          () => {
            store.dispatch({
              type: 'ARCHIVAR_TAREA',
              payload: {
                id: id,
                archivado: true
              }
            });
          }
        }
      >Archivar</button>
  }else{
    archivar=<button
        onClick={
          () => {
            store.dispatch({
              type: 'ARCHIVAR_TAREA',
              payload: {
                id: id,
                archivado: false
              }
            });
          }
        }
      >Desarchivar</button>
  }
  return (
    <div class="element"
      style={{
        background: color
      }}
    >
    <h2 contentEditable='true' type="text" ref={ node => input = node }>{ title }</h2>
    <TodoList
      todos={ getVisibleTodos(todos.filter(t => t.daddy == id), visibilityFilter.filter(v => v.id ==id))}
      onTodoClicked={
        (todo) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            payload: {
              id: todo.id
            }
          });
        }
      } />
    <AddTodo
      onAddTodo={onAddTodo}
      parentid={id}
      >
      Agregar Todo</AddTodo>
    <button
      onClick={
        () => {
          store.dispatch({
            type: 'EDIT_TAREA',
            payload: {
              id: id,
              title: input.innerText
            }
          });
        }
      }
    >Guardar</button>
    {archivar}
    <button
      onClick={
        () => {
          store.dispatch({
            type: 'REMOVE_TAREA',
            payload: {
              id: id
            }
          });
        }
      }
    >Eliminar</button>
    <Footer
        currentVisibilityFilter={ visibilityFilter.filter(v => v.id ==id)[0].value }
        onFilterClicked={
          (filter) => {
            store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              payload: { 
                id:id,
                value: filter }
            });
          }
        } />
    <div>
    Creado:{date}
    {' '}
    Modificado:{datemodi}
    </div>
  </div>
  )
};
const AddNota = ({ onAddNota, children }) => {
  let input;
  let input1;
  let color;

  return (
    <div class='addNota'>
      <div>
        <input class='input1' type="text" placeholder="Titulo" ref={ node => input = node } />
      </div>
      <div>
        <input class='input1' type="text" placeholder="Descripcion" ref={ node1 => input1 = node1 } />
      </div>
      <select class='color' ref={ node2 => color = node2 }>
        <option class='celeste' value="#52A4FF">Celeste</option>
        <option class='verde' value="#999448">Verde</option>
        <option class='violeta' value="#FF4CF3">Violeta</option>
        <option class='rojo' value="#CC2C0F">Rojo</option>
      </select> 
      <button class='boton1'
        onClick={
          () => { 
            onAddNota(input.value,input1.value,color.value);
            input.value = "";
            input1.value = "";
          }
        }
      >{ children }</button>
    </div>
  );
}
const AddTarea = ({ onAddTarea, children }) => {
  let input;
  let color;

  return (
    <div class='addTarea'>
      <input class='input1' type="text" placeholder="Titulo" ref={ node => input = node } />
      <select class='color' ref={ node2 => color = node2 }>
        <option class='celeste' value="#52A4FF">Celeste</option>
        <option class='verde' value="#999448">Verde</option>
        <option class='violeta' value="#FF4CF3">Violeta</option>
        <option class='rojo' value="#CC2C0F">Rojo</option>
      </select>
      <button class='boton1'
        onClick={
          () => { 
            onAddTarea(input.value,color.value);
            input.value = "";
            console.log(store.getState());
          }
        }
      >{ children }</button>
    </div>
  );
}
const NotaList = ({notas}) => (
  <ul>
    {  
      notas.map(nota => (
        <Nota
          key={ nota.id }
          { ...nota }
        />
      ))
    }
  </ul>
);
const TareaList = ({tareas,onAddTodo,todos,visibilityFilter}) => (
  <ul>
    {
      tareas.map(tarea => (
        <Tarea
          key={ tarea.id}
          id={tarea.id}
          { ...tarea }
          onAddTodo={onAddTodo}
          todos={todos}
          visibilityFilter={visibilityFilter}
        />
      ))
    }
  </ul>
);

const TodoList = ({ todos, onTodoClicked }) => (
  <ul>
    {
      todos.map(todo => (
        <Todo
          key={ todo.id }
          { ...todo }
          onTodoClicked={ () => onTodoClicked(todo) }
        />
      ))
    }
  </ul>
);

const AddTodo = ({ onAddTodo,parentid, children }) => {
  let input;

  return (
    <div>
      <input type="text" placeholder="tarea" ref={ node => input = node } />
      <button
        onClick={
          () => { 
            onAddTodo(input.value,parentid);
            input.value = "";
          }
        }
      >{ children }</button>
    </div>
  );
}

const Footer = ({ currentVisibilityFilter, onFilterClicked }) => (
  <div class="footer">
    Muestra Tareas:
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Todas</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_COMPLETED"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Completadas</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_ACTIVE"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Activas</FilterLink>
  </div>
);
const FooterI = ({ currentVisibilityFilter, onFilterClicked }) => (
  <div class="footer">
    Muestra:
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Todo</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_TAREAS"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Tareas</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_NOTAS"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Notas</FilterLink>
    {' '}
    <FilterLink
        visibilityFilter="SHOW_ARCHIVADOS"
        currentVisibilityFilter={ currentVisibilityFilter }
        onFilterClicked={ onFilterClicked }>Archivados</FilterLink>
  </div>
);


let maxId = 0;
const TodosApp = ({ todos,tareas, notas, filters,filter,buscar }) =>{
  todos=todos.present
  tareas=tareas.present
  notas=notas.present
  filters=filters.present
  filter=filter.present
  buscar=buscar.present
  if(buscar!=""){
    tareas=tareas.filter(n => n.title.includes(buscar));
    notas=notas.filter(n => n.title.includes(buscar));
  }
  else{
    if(filter=="SHOW_TAREAS"){
      tareas=tareas.filter(n => n.archivado == false);
      notas=[]

    }
    if(filter=="SHOW_NOTAS"){
      notas=notas.filter(n => n.archivado == false);
      tareas=[]

    }
    if(filter=="SHOW_ARCHIVADOS"){
      notas=notas.filter(n => n.archivado == true);
      tareas=tareas.filter(n => n.archivado == true);
    }
    if (filter=="SHOW_ALL"){
      notas=notas.filter(n => n.archivado == false);
      tareas=tareas.filter(n => n.archivado == false);

    }
  }
  let input;
  return (
  <div>
    <div class='header'>
      <div class='content-title'>
        <h1>Tablero Chispudo</h1>
      </div>
      <div class="content-busqueda">
        <input class="barra-busqueda" type="text" placeholder="Busqueda" ref={ node => input = node } />
        <button
          onClick={
          () => {
            store.dispatch({
              type: 'SET_BUSQUEDA',
              payload: {
                busqueda: input.value
              }
            });
          }
        }
        >Buscar</button>
        <button
          onClick={
          () => {
            store.dispatch({
              type: 'SET_BUSQUEDA',
              payload: {
                busqueda: ''
              }
            });
            input.value = "";
          }
        }
        >Cancelar</button>
        <button
          onClick={
          () => {
            store.dispatch(ActionCreators.undo());
          }
        }
        >Undo</button>
        <button
          onClick={
          () => {
            store.dispatch(ActionCreators.redo());
          }
        }
        >Redo</button>
      </div>
    </div>
    <div class='addContenedor'>
      <AddTarea
        onAddTarea={
          (text,text1) => {let idp=v4();
            store.dispatch({
              type: 'ADD_TAREA',
              payload: {
                id: idp,
                title:text,
                color: text1
              }
            });
            store.dispatch({
              type: 'ADD_FILTER',
              payload: {
                id: idp,
                value: 'SHOW_ALL'
              }
            });
          }
        }>Tarea +</AddTarea>

      <AddNota
        onAddNota={
          (text,text1,text2) => {
            store.dispatch({
              type: 'ADD_NOTA',
              payload: {
                id: v4(),
                title:text,
                description:text1,
                color: text2
              }
            });
          }
        }>Nota +</AddNota>
    </div>
    <div class='list-contenedor'>

      <NotaList
        notas={ notas }
        />
    

      <TareaList
        tareas={tareas}
        onAddTodo={
          (text,parentid) => { 
            store.dispatch({
              type: 'ADD_TODO',
              payload: {
                id: v4(),
                text,
                daddy: parentid }
              }
            );
          }
        }
        todos={todos}
        visibilityFilter={filters}
        />

    </div>
    <div class='footer-contenedor'>
      <FooterI
        currentVisibilityFilter={ filter }
        onFilterClicked={
          (filter) => {
            store.dispatch({
              type: 'SET_APP_FILTER',
              payload: { name: filter }
            });
          }
        } />
    </div>
  </div>
) };


const render = () => {
  ReactDOM.render(
    <TodosApp
      { ...store.getState() } />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
store.subscribe(() => {
  saveState(store.getState());
});