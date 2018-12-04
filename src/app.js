import React from "react";
import { render } from "react-dom";
import "../src/sass/main.scss";
import Question from "./Question";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      current: 0,
      correct: 0,
      incorrect: 0
    };
  }

  componentDidMount = () => {
    this.fetchQuestions(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple"
    );
  };

  fetchQuestions = url => {
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          questions: data.results
        })
      );
  };

  handleAnswer = (current, answer) => {
    if (this.state.questions[current].correct_answer === answer) {
      this.setState({ correct: this.state.correct + 1 });
    } else if (
      this.state.questions[current].incorrect_answers.includes(answer)
    ) {
      this.setState({ incorrect: this.state.incorrect + 1 });
    }
    this.setState({ current: current + 1 });
  };

  render() {
    const { questions, current } = this.state;

    if (questions.length > 0 && current < 10) {
      console.log(this.state);
      return (
        <div className="interface">
          <Question
            questions={questions}
            current={current}
            handleAnswer={this.handleAnswer}
          />
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  }
}

render(<App />, document.getElementById("root"));
