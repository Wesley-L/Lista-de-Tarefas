import "./Header.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

class Header extends Component {
  handleSearch = (event) => {
    const searchValue = event.target.value;
    this.props.onSearch(searchValue);
  };

  stateTask = (event) => {
    const stateValue = event.target.value;
    this.props.onState(stateValue);
  };

  alphabeticTesk = (event) => {
    const alphaceticOrder = event.target.value;
    this.props.onOrder(alphaceticOrder);
  };

  render() {
    return (
      <header className="header">
        <h1>Lista de Tarefas</h1>

        <div className="search">
          <h3>Pesquisar</h3>
          <input
            type="search"
            name="search"
            id="search"
            className="search-input"
            onChange={this.handleSearch}
          />
        </div>

        <div className="filter">
          <h3>Filtrar</h3>

          <div className="filter-container">
            <form className="form">
              <label for="status">Status:</label>

              <select id="status" name="status" onChange={this.stateTask}>
                <option value="">Todas</option>
                <option value="true">Completas</option>
                <option value="false">Incompletas</option>
              </select>
            </form>

            <div className="categories">
              <p>Ordem Alfabetica</p>
              <div className="categories-button">
                <button value="asc" onClick={this.alphabeticTesk}>
                  Asc
                </button>
                <button value="desc" onClick={this.alphabeticTesk}>
                  Desc
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onState: PropTypes.func.isRequired,
  onOrder: PropTypes.func.isRequired,
};

export default Header;
