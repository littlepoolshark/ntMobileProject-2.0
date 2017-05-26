import { observable, action, computed  } from "mobx";

export default class TodoStore {
    @observable todoList;
    @observable test;

    constructor(){
        this.todoList=[];
        this.test="asdfsad";
    }

    @action addTodo(todoItem){
        this.todoList.push(todoItem);
    }

    @action toggleIsFinished(tasKId){
        this.todoList=this.todoList.map((item,index) => {
            if(tasKId === item.id ){
                return {
                    ...item,
                    isFinished:!item.isFinished
                }
            }
            return item;
        })
    }

    @action removeTodo(taskId){
        this.todoList=this.todoList.filter((item,index) => {
            return item.id !== taskId && item;
        })
    }

    @computed get totalTodoCount(){
        return this.todoList.length;
    }

    @computed get finishedTodoCount(){
        return this.todoList.filter((item,index) => item.isFinished).length;
    }

    @computed get activeTodoCount(){
        return this.todoList.filter((item,index) => !item.isFinished).length;
    }


}