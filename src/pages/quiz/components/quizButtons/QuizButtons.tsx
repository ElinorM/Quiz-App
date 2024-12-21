import React from 'react';
import { QUESTIONS } from '../../quiz.constants';
import { Question } from '../../quiz.types';

export interface QuizButtonsProps {
  question: Question
  questionCount: number
  setQuestionCount: (questionCount: number) => void
  setSubmitted: (submitted: boolean) => void
}
export const QuizButtons = ({question, questionCount, setQuestionCount, setSubmitted}: QuizButtonsProps) => {
  return (
    <div>
      {questionCount > 0 && <button onClick={() => setQuestionCount(questionCount - 1)}>Previous</button>}
      {questionCount !== QUESTIONS.length - 1
        ? <button onClick={() => setQuestionCount(questionCount + 1)} disabled={!question.selectedOption}>Next</button>
        : <button onClick={() => setSubmitted(true)} disabled={!question.selectedOption}>Submit</button>
      }
    </div>
  );
}
