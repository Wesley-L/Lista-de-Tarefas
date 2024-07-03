import "./Footer.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

class Footer extends Component {
  state = {
    text: "",
    category: "",
  };

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  };

  handleSubimit = (event) => {
    event.preventDefault();

    const { text, category } = this.state;

    if (!text || !category) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const FormData = {
      text: this.state.text,
      category: this.state.category,
    };

    this.props.onCategory(FormData);
    this.setState({ text: "", category: "" });
  };

  render() {
    return (
      <footer className="footer">
        <form className="create" onSubmit={this.handleSubimit}>
          <h3 className="title">Criar tarefa:</h3>
          <input
            type="text"
            id="input-create"
            placeholder="Nova tarefa"
            className="input-create"
            onChange={this.handleTextChange}
          />
          <select
            name="category"
            id="category"
            className="category"
            onChange={this.handleCategoryChange}
          >
            <option value="">Selecione uma Categoria</option>
            <option value="trabalho">Trabalho</option>
            <option value="pessoal">Pessoal</option>
            <option value="estudos">Estudos</option>
          </select>
          <button className="btn-subimit">Criar Tarefa</button>
        </form>
      </footer>
    );
  }
}

Footer.propTypes = {
  onCategory: PropTypes.func.isRequired,
};

export default Footer;
