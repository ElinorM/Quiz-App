/** @jsxImportSource @emotion/react */
import React from 'react';
import { QUESTIONS } from '../../quiz.constants';
import { Question } from '../../quiz.types';
import { css } from '@emotion/react';

const styleObject = (showPreviousButton: boolean) => ({
  buttonsWrapper: css({
    display: 'flex',
    justifyContent: showPreviousButton ? 'space-between' : 'flex-end',
    marginTop: '20px'
  })
});

export interface QuizButtonsProps {
  question: Question
  questionCount: number
  setQuestionCount: (questionCount: number) => void
  setSubmitted: (submitted: boolean) => void
}
export const QuizButtons = ({question, questionCount, setQuestionCount, setSubmitted}: QuizButtonsProps) => {
  const showPreviousButton = questionCount > 0;
  const showNextButton = questionCount !== QUESTIONS.length - 1;
  const style = styleObject(showPreviousButton);

  return (
    <div css={style.buttonsWrapper}>
      {showPreviousButton && <button onClick={() => setQuestionCount(questionCount - 1)}>Previous</button>}
      {showNextButton
        ? <button onClick={() => setQuestionCount(questionCount + 1)} disabled={!question.selectedOption}>Next</button>
        : <button onClick={() => setSubmitted(true)} disabled={!question.selectedOption}>Submit</button>
      }
    </div>
  );
}
