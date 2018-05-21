import "../style/todo.scss";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { inject, observer } from "mobx-react";
import classnames from "classnames";
import todoStore from "../stores/todoStore";
import { Link } from "react-router-dom";
import Icon from "./UIComponents/Icon";
import Modal from "./UIComponents/modal/Modal";
import Button from "./UIComponents/Button";
import Message from "./UIComponents/Message";
import FieldWithInterceptor from "./HOCs/Interceptor";



@inject("store")
@observer
class Todo extends Component {

    constructor(props) {
        super(props);
        this.globalState = this.props.store;//全局store
        this.localState = new todoStore();//与自身业务相关的store
        this.state = {//ui组件的state
            isModalOpen: false
        }
    }

    openModal() {
        this.setState({
            isModalOpen: true
        })
    }

    closeModal(callback) {
        this.setState({
            isModalOpen: false
        }, () => {
            callback && callback();
        })
    }

    handleAddTodoBtnClick = () => {
        let formCheckResult=this.localState.formCheckResult();
        if (formCheckResult.success) {
            this.openModal();
        } else {
            Message.broadcast(formCheckResult.errorMsg);
        }
    }

    addTodo() {
        if (this.localState.newTodoItem) {
            this.localState.addTodo({
                id: Math.random(),
                isFinished: false
            });
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

    handleChange = (fieldName,newValue) => {
        this.localState.changeNewItemValue(fieldName,newValue);
    }

    render() {
        let {
            globalText
        } = this.globalState;

        let {
            todoList,
            filterType,
            finishedTodoCount,
            totalTodoCount,
            newTodoItem,
            formCheckResult,
            userName
        } = this.localState;

        
        return (
            <div className="todo">
                <div className="test">{globalText}</div>
                <Icon name="right" amStyle="primary" />
                <div className="todo-form">
                    <FieldWithInterceptor
                        type="text"
                        fieldName="newTodoItem"
                        onKeyDown={(event) => { this.handleFieldKeyDown(event) }}
                        value={newTodoItem}
                        onChange={this.handleChange}
                        interceptor={["isPhoneNo"]}
                    />
                    <FieldWithInterceptor
                        type="text"
                        fieldName="userName"
                        value={userName}
                        onChange={this.handleChange}
                        interceptor={["maxLength:20"]}
                    />
                    <Button amStyle="primary" amSize="small" onClick={this.handleAddTodoBtnClick}>增加</Button>
                </div>
                <div className="todo-list">
                    {
                        todoList.map((item, index) => {
                            return (
                                <div key={item.id} className={classnames("todo-list-item", { "is-finished": item.isFinished })}>
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
                        pathname: "/home",
                        search: "?beforeComponent=todo"
                    }}

                    replace={false}
                >
                    <div>一个包含div的a链接</div>
                </Link>
                <Modal
                    isOpen={this.state.isModalOpen}
                    role="alert"
                    onDismiss={() => { this.closeModal(() => { this.addTodo() }) }}
                >
                    你确定要提交这条新的todo事项吗？
                </Modal>
            </div>
        );
    }

    componentDidMount(){
        this.localState.getTodoList();
    }

    //  componentWillReact() {
    //     console.info("I will re-render, since the todo has changed!");
    // }
}

export default Todo;
