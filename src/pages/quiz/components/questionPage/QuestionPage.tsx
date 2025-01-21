import React from 'react';
import { Question } from '../../quiz.types';

export interface QuestionPageProps {
  question: Question
  updateSelectedOption: (selectedOption: string) => void
}
export const QuestionPage = ({ question, updateSelectedOption }: QuestionPageProps) => {
  const { title, options, selectedOption } = question;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    updateSelectedOption(selectedOption);
  }

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                id={`${index}`}
                name={option}
                value={option}
                checked={selectedOption?.includes(option)}
                onChange={onChange}
              />
              {option}
            </label>
          </div>
          ))}
      </ul>
    </div>
  );
}


