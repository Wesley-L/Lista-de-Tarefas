import React from "react";
import PropTypes from "prop-types";

const TodoList = ({ tasks, onCompleted, onDelet }) => {
  return (
    <div className="content">
      <table>
        <tbody>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="table-row">
                <td className="text-and-category">
                  <div
                    className={`text ${task.isCompleted ? "is-completed" : ""}`}
                  >
                    {task.text}
                  </div>
                  <div
                    className={`category ${
                      task.isCompleted ? "is-completed" : ""
                    }`}
                  >
                    {task.category}
                  </div>
                </td>
                <td className="buttons">
                  <button
                    className="completed"
                    onClick={() => onCompleted(task)}
                  >
                    Completo
                  </button>
                  <button className="delet" onClick={() => onDelet(task.id)}>
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Nenhuma tarefa encontrada</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

TodoList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDelet: PropTypes.func.isRequired,
};

export default TodoList;
