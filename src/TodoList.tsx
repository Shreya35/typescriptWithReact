import React, { Component } from "react";
import './App.css'


interface State {
    inputValue: string,
    todoArray: any[],
    isChecked: boolean
}



class TodoList extends Component<{}, State>{
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: "",
            todoArray: [],
            isChecked: false
        }

    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleChange being activated-----", event.target.value);
        this.setState({ inputValue: event.target.value })
    }

    handleClick = () => {
        console.log("<<<<clicked----");
        if (this.state.inputValue) {
            let prevTodoList = [...this.state.todoArray];
            let inputVal = this.state.inputValue;
            prevTodoList.push({name:inputVal,completed:false})
            this.setState({ todoArray: prevTodoList, inputValue: "" })

        }
    }

    removeTodoItem = (todoItem: object) => {
        console.log("deleted----", todoItem);
        let filteredTodoList = this.state.todoArray.filter((item) => {
            return item !== todoItem
        });
        this.setState({ todoArray: filteredTodoList })
    }

    toggleChange = (event: React.ChangeEvent<HTMLInputElement>,selectedItem:any,indexItem:number) => {
        console.log("----", event.target.checked, selectedItem,indexItem);
        const {todoArray} = this.state;
        let emptyArr:any= [];
        todoArray.forEach((item,index)=>{
            console.log("item toggleChange",item);
            if(index!==indexItem){
                emptyArr.push(item)
            }
            else {
                item.completed = event.target.checked;
                emptyArr.push(item);
            }
        })
        this.setState({todoArray:emptyArr})
    }

    render() {
        console.log("TODO list----", this.state.todoArray, this.state.isChecked)
        return (
            <div className="TodoWrapper">
                <h1>TODO List</h1>
                <div>
                    <label htmlFor="username">
                        <input type="text" id="username" onChange={this.handleChange} value={this.state.inputValue}  />
                    </label>
                </div>

                <div>
                    <button className="btnTodoSubmit" onClick={this.handleClick}>Submit</button>
                </div>

                <div>
                    {this.state.todoArray && this.state.todoArray.map((item, index) => {
                          console.log("<<<item",item);
                        return (
                            <>
                                <div>
                                    <label className="TodoList" htmlFor="checkValue">
                                        <input type="checkbox" className="checkboxTodoStyle" checked={item.completed} onChange={(event) => this.toggleChange(event,item,index)} id="checkValue" />
                                        <ul key={index} className="ulTodo">
                                            <li key={index} className={item.completed ? "StrikeTodoItem" : ""}>
                                                {item.name}
                                            </li>
                                            <span className="cancelTodoItem" onClick={() => { this.removeTodoItem(item) }}>X</span>
                                        </ul>
                                    </label>

                                </div>

                            </>


                        )
                    })}
                </div>


            </div>

        )
    }
}
export default TodoList;