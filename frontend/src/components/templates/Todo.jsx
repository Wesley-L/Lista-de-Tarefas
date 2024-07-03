import "./Todo.css";
import React, { Component, Fragment } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import Header from "./Header";
import Footer from "./Footer";
import io from "socket.io-client";

const baseURL = "http://localhost:3001/api/data";
const inicialState = {
  tasks: { text: "", category: "", isCompleted: false },
  list: [],
  searchQuery: "",
  stateQuery: "",
  orderQuery: "",
  categoryQuery: "",
};

export default class Todo extends Component {
  state = { ...inicialState };

  componentDidMount() {
    this.fetchTasks();

    this.socket = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
    });

    this.socket.on("tasksUpdated", (txt) => {
      console.log("tasksUpdated event received", txt);
      this.fetchTasks();
    });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  fetchTasks = () => {
    axios(baseURL)
      .then((resp) => {
        this.setState({ list: resp.data });
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  };

  getCategoryes = (FormData) => {
    console.log(FormData, "lisy");
    axios
      .post(`${baseURL}`, FormData)
      .then((resp) => {
        this.setState((prevState) => ({
          list: [...prevState.list, resp.data],
        }));
        this.socket.emit("tasksUpdated");
      })
      .catch((error) => {
        console.error("There was an error adding the task!", error);
      });
  };

  completedTask = (task) => {
    const updateTask = {
      ...task,
      isCompleted: true,
      className: "is-completed",
    };

    axios
      .put(`${baseURL}/${task.id}`, updateTask)
      .then((resp) => {
        const updateTaskFromServer = resp.data;
        this.setState((prevState) => ({
          list: prevState.list.map((t) =>
            t.id === task.id
              ? { ...updateTaskFromServer, className: "is-completed" }
              : t
          ),
        }));
        this.socket.emit("tasksUpdated");
      })
      .catch((error) => {
        console.log(
          `There was an error updating the task with ID ${task.id}!`,
          error
        );
      });
  };

  deletTask = (id) => {
    axios
      .delete(`${baseURL}/${id}`)
      .then((resp) => {
        this.setState((prevState) => ({
          list: prevState.list.filter((task) => task.id !== id),
        }));
        this.socket.emit("tasksUpdated");
      })
      .catch((error) => {
        console.log(
          `There was an error deleting the task with ID ${id}!`,
          error
        );
      });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  stateTask = (query) => {
    this.setState({ stateQuery: query });
  };

  alphabeticTesk = (query) => {
    this.setState({ orderQuery: query });
  };

  getFilteredTask = (list) => {
    const { searchQuery } = this.state;
    if (!searchQuery) return list;
    return list.filter((task) => {
      return (
        task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  getStateTask = (list) => {
    const { stateQuery } = this.state;

    if (!stateQuery) return list;
    return list.filter(
      (task) =>
        (stateQuery === "true" && task.isCompleted) ||
        (stateQuery === "false" && !task.isCompleted)
    );
  };

  getAlphabeticOrder = (list) => {
    const { orderQuery } = this.state;
    let sortedList = [...list];
    if (orderQuery === "asc") {
      sortedList.sort((a, b) => a.text.localeCompare(b.text));
    } else if (orderQuery === "desc") {
      sortedList.sort((a, b) => b.text.localeCompare(a.text));
    }
    return sortedList;
  };

  render() {
    const { list } = this.state;
    let taskToRender = list;

    taskToRender = this.getFilteredTask(taskToRender);

    taskToRender = this.getStateTask(taskToRender);

    taskToRender = this.getAlphabeticOrder(taskToRender);

    return (
      <Fragment>
        <Header
          onSearch={this.handleSearch}
          onState={this.stateTask}
          onOrder={this.alphabeticTesk}
        />
        <div className="main">
          <TodoList
            tasks={taskToRender}
            onCompleted={this.completedTask}
            onDelet={this.deletTask}
          />
        </div>
        <Footer onCategory={this.getCategoryes} />
      </Fragment>
    );
  }
}
