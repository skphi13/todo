import React, { Component } from "react";
import { generateRandomId } from "./utils";
import tasks from "./tasks.json";

class Loading extends Component {
  render() {
    return (
      <tr>
        <td colspan="2">Loading Tasks...</td>
      </tr>
    );
  }
}

class TodoListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.task.taskName}</td>
        <td>
          <input type="checkbox" checked={this.props.task.finished} />
        </td>
      </tr>
    );
  }
}

class NewTaskForm extends Component {
  render() {
    const onSubmit = event => {
      event.preventDefault();
      const inputTask = event.target.elements.taskName;
      this.props.addTasks(inputTask.value);
      inputTask.value = "";
    };
    return (
      <form onSubmit={onSubmit}>
        <input type="text" name="taskName" placeholder="Write Task Name" />
        <button type="submit">Add</button>
      </form>
    );
  }
}
export default class TodoList extends Component {
  constructor(props) {
    super();
    this.state = { tasks };
    this.addTasks = this.addTasks.bind(this);
  }
  addTasks(newTask) {
    const oldTasks = this.state.tasks;
    const newTasks = {
      taskName: newTask
    };
    const newTaskList = [...oldTasks, newTasks];
    this.setState({ tasks: newTaskList });
  }
  render() {
    const taskItems = this.state.tasks.map(task => (
      <TodoListItem key={task.id} task={task} />
    ));
    return (
      <div className="container">
        <h1>
          Get It Done! <br />
          <small>For the truly industrious</small>
        </h1>

        <table>
          <thead>
            <tr>
              <td>Task</td>
              <td>Done?</td>
            </tr>
          </thead>
          <tbody>{taskItems}</tbody>
        </table>

        <hr />
        <NewTaskForm addTasks={this.addTasks} />
      </div>
    );
  }
}
