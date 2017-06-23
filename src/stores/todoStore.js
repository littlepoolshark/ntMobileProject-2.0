import { observable, action, computed  } from "mobx";
import Validator from "../components/utilities/validator";

export default class TodoStore extends Validator {
    @observable todoList;
    @observable test;
    @observable newTodoItem;
    @observable userName;


    constructor(){
        super({
            newTodoItem:[
                {
                    rule:"isRequired",
                    errorMsg:"新事项不能为空，请重新输入！"
                },
                {
                    rule:"isPhoneNo",
                    errorMsg:"手机号码的格式不对，请检查！"
                },
            ],
            userName:[
                {
                    rule:"isRequired",
                    errorMsg:"用户名不能为空，请重新输入！"
                },
                 {
                    rule:"maxLength:20",
                    errorMsg:"用户名长度不合格，请检查！"
                },
            ]
        });

        this.todoList=[];
        this.test="asdfsad";
        this.newTodoItem="1.36";
        this.userName="sam liu";

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

    @action changeNewItemValue(fieldName,newValue){
        this[fieldName]=newValue;
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