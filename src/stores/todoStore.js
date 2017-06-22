import { observable, action, computed  } from "mobx";

export default class TodoStore {
    @observable todoList;
    @observable test;
    @observable newTodoItem;
    @observable userName;


    constructor(){
        this.todoList=[];
        this.test="asdfsad";
        this.newTodoItem="13682330541";
        this.userName="sam liu";

        this.checker={
            newTodoItem:[
                {
                    rule:value => value !== "",
                    errorMsg:"新事项不能为空，请重新输入！"
                },
                {
                    rule:value => value.length === 11,
                    errorMsg:"手机号码的格式不对，请检查！"
                },
            ],
            userName:[
                {
                    rule:value => value !== "",
                    errorMsg:"用户名不能为空，请重新输入！"
                },
                 {
                    rule:value => value.length < 30,
                    errorMsg:"用户名长度不合格，请检查！"
                },
            ]
        }

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

    formCheckResult(){
        let formCheckResult={
            success:true,
            errorMsg:""
        };

        let fields=Object.keys(this.checker);

        for(let i=0; i< fields.length ; i++){
            let rules=this.checker[fields[i]];
            for(let j=0; j<rules.length ; j++){
                console.log(this[fields[i]])
                if(!rules[j].rule.call(null,this[fields[i]])){
                    formCheckResult.success=false;
                    formCheckResult.errorMsg=rules[j].errorMsg;
                    break;
                }
            }
        }

        return formCheckResult;   
    }

}