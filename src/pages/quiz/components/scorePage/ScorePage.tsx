import React from 'react';
import { Question } from '../../quiz.types';

interface ScorePageProps {
  questions: Question[];
}
export const ScorePage = ({ questions }: ScorePageProps) => {
  const correctAnswers = questions.filter(question => question.selectedOption.every(selectedOption => question.answer.includes(selectedOption)) && question.answer.length === question.selectedOption.length).length;
  const totalQuestions = questions.length;
  const score = (correctAnswers / totalQuestions) * 100;

  return (
    <div>
      <h1>Score: {score}</h1>
    </div>
  );
}
