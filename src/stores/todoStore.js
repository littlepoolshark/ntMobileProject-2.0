import { observable, action, computed  } from "mobx";

export default class TodoStore {
    @observable todoList;
    @observable test;
    @observable newTodoItem;

    constructor(){
        this.todoList=[];
        this.test="asdfsad";
        this.newTodoItem="亲，您还有什么没干呢？"
    }

    @action addTodo(todoItem){
        this.todoList.push({...todoItem,taskName:this.newTodoItem});
        this.newTodoItem="";
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

    @action changeNewItemValue(newValue){
        this.newTodoItem=newValue;
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