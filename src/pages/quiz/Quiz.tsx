/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { QuestionPage } from './components/questionPage/QuestionPage';
import { QUESTIONS } from './quiz.constants';
import { Question } from './quiz.types';
import { ScorePage } from './components/scorePage/ScorePage';
import { QuizButtons } from './components/quizButtons/QuizButtons';
import { css } from '@emotion/react';

const style = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  })
};
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
    <div css={style.wrapper}>
      <h1>Quiz App</h1>
      {submitted
        ? <ScorePage questions={questions}/>
        : <div>
            <QuestionPage question={questions[questionCount]} updateSelectedOption={updateSelectedOption}/>
            <QuizButtons question={questions[questionCount]} questionCount={questionCount} setQuestionCount={setQuestionCount} setSubmitted={setSubmitted}/>
        </div>
      }
    </div>
  );
}
