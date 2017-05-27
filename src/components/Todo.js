import "../style/todo.scss";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";
import classnames from "classnames";
import todoStore from "../stores/todoStore";
import { Link } from "react-router-dom";
import Icon from "./UIComponents/Icon";
import Modal from "./UIComponents/modal/Modal";
import Button from "./UIComponents/Button";



@inject("store")
@observer
class Todo extends Component {

    constructor(props) {
        super(props);
        this.globalState=this.props.store;
        this.localState = new todoStore();
        this.state={
            isModalOpen:false
        }
    }

    openModal(){
        this.setState({
            isModalOpen:true
        })
    }

    closeModal(callback){
        this.setState({
            isModalOpen:false
        },() => {
            callback && callback();
        })
    }

    addTodo() {
        let taskName = this.refs.newItemField.value.trim();
        if (taskName) {
            this.localState.addTodo({
                id: Math.random(),
                taskName,
                isFinished: false
            });
            this.refs.newItemField.value = "";
        }
    }

    toggleIsFinished(taskId) {
        this.localState.toggleIsFinished(taskId);
    }

    removeTodo(taskId) {
        this.localState.removeTodo(taskId);
    }

    handleFieldKeyDown(event) {
        if (event.keyCode === 13) {
            this.addTodo();
        }
    }

    render() {
        let {
            globalText
        }=this.globalState;

        let {
            todoList,
            filterType,
            finishedTodoCount,
            totalTodoCount
        } = this.localState;


        return (
            <div className="todo">
                <div className="test">{globalText}</div>
                <Icon name="right" style={{color:"red",fontSize:"12px"}}/>
                <div className="todo-form">
                    <input type="text" ref="newItemField" onKeyDown={(event) => { this.handleFieldKeyDown(event) }} />
                    <Button amStyle="primary" amSize="small" onClick={() => { this.openModal() }}>增加</Button>
                </div>
                <div className="todo-list">
                    {
                        todoList.map((item, index) => {
                            return (
                                <div key={item.id} className={classnames("todo-list-item",{"is-finished":item.isFinished})}>
                                    <input type="checkbox" checked={item.isFinished ? true : false} onChange={() => { this.toggleIsFinished(item.id) }} />
                                    {item.taskName}
                                    <button onClick={() => { this.removeTodo(item.id) }}>删除</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="todo-summary">{`总共有${totalTodoCount}个任务，已经完成了${finishedTodoCount}个。`}</div>
                <Link
                    to={{
                        pathname:"/home",
                        search:"?beforeComponent=todo"
                    }}

                    replace={false}
                >
                    <div>一个包含div的a链接</div>
                </Link>
                <Modal
                    isOpen={this.state.isModalOpen}
                    role="alert"
                    onDismiss={() => {this.closeModal(() => {  this.addTodo() })}}
                >
                    测试 ui state 跟组件的组合！
                </Modal>
            </div>
        );
    }

     componentWillReact() {
        console.info("I will re-render, since the todo has changed!");
    }
}

export default Todo;
