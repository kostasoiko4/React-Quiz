import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import QuestionBox from './Components/QuestionBox';
import "./assets/style.css"
import quizService from "./quizService";
import Result from './Components/Result';

class QuizBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };

  getQuestions = () => {
    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 1);
    }
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 1);
    }
    quizService().then(question => {
      this.setState({
        questionBank: question
      })
    })
  }

  computeAnswer = (answer, corretAnswer) => {
    if (answer === corretAnswer) {
      this.setState({
        score: this.state.score + 1
      })
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    })
  }

  playAgain = () => {
    this.getQuestions()
    this.setState({
      score: 0,
      responses: 0
    })
  }

  componentDidMount() {
    this.getQuestions()
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="title">QuizBee</div>
          {this.state.questionBank.length > 0 && 
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({question, answers, correct, questionId}) => 
              <QuestionBox 
                question={question}
                options={answers}
                key={questionId}
                selected={answer => this.computeAnswer(answer, correct)}
              />
            )}

            {this.state.responses === 5 ? (
              <Result score={this.state.score} playAgain={this.playAgain}/>
            ) : null}
        </div>
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuizBee/>
);