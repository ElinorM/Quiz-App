import React, { useState } from 'react';
import { QuestionPage } from './components/questionPage/QuestionPage';
import { QUESTIONS } from './quiz.constants';
import { Question } from './quiz.types';
import { ScorePage } from './components/scorePage/ScorePage';
import { QuizButtons } from './components/quizButtons/QuizButtons';

export const Quiz = () => {
  const [questions, setQuestions] = useState(QUESTIONS as Question[]);
  const [questionCount, setQuestionCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const updateSelectedOption = (selectedOption: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionCount].selectedOption = selectedOption;
    setQuestions(updatedQuestions);
  }

  return (
    <div>
      <h1>Quiz App</h1>
      {submitted
        ? <ScorePage questions={questions}/>
        : <>
            <QuestionPage question={questions[questionCount]} updateSelectedOption={updateSelectedOption}/>
            <QuizButtons question={questions[questionCount]} questionCount={questionCount} setQuestionCount={setQuestionCount} setSubmitted={setSubmitted}/>
          </>
      }
    </div>
  );
}
