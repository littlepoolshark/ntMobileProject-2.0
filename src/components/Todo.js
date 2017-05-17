import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class Todo extends Component {

    constructor(props) {
        super(props);
        this.todo = this.props.store;
    }

    addTodo() {
        let taskName = this.refs.newItemField.value.trim();
        if (taskName) {
            this.todo.addTodo({
                id: Math.random(),
                taskName,
                isFinished: false
            });
            this.refs.newItemField.value = "";
        }
    }

    toggleIsFinished(taskId) {
        this.todo.toggleIsFinished(taskId);
    }

    removeTodo(taskId) {
        this.todo.removeTodo(taskId);
    }

    handleFieldKeyDown(event) {
        if (event.keyCode === 13) {
            this.addTodo();
        }
    }

    render() {
        let {
            todoList,
            filterType,
            finishedTodoCount,
            totalTodoCount
        } = this.todo;

        return (
            <div className="todo">
                <div className="todo-form">
                    <input type="text" ref="newItemField" onKeyDown={(event) => { this.handleFieldKeyDown(event) }} />
                    <button onClick={() => { this.addTodo() }}>增加</button>
                </div>
                <div className="todo-list">
                    {
                        todoList.map((item, index) => {
                            return (
                                <div key={item.id} className={`todo-list-item ${item.isFinished ? "is-finished" : ""}`}>
                                    <input type="checkbox" checked={item.isFinished ? true : false} onChange={() => { this.toggleIsFinished(item.id) }} />
                                    {item.taskName}
                                    <button onClick={() => { this.removeTodo(item.id) }}>删除</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="todo-summary">{`总共有${totalTodoCount}个任务，已经完成了${finishedTodoCount}个。`}</div>
            </div>
        );
    }
}

export default Todo;