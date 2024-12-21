import React from 'react';
import { render, screen, } from '@testing-library/react';
import { ScorePage } from './ScorePage';
import { allCorrectAnswersMock, allWrongAnswersMock, partialCorrectAnswersMock } from '../../../../mocks/quiz.mocks';



describe('ScorePage', () => {
  it('should match snapshot', () => {
    const props = { questions: allCorrectAnswersMock };
    expect(render(<ScorePage {...props} />)).toMatchSnapshot();
  });

  it('should display score 100 if all answers are correct', () => {
    const props = { questions: allCorrectAnswersMock };
    render(<ScorePage {...props} />);
    expect(screen.getByText('Score: 100')).toBeInTheDocument();
  });

  it('should display score 0 if all answers are wrong', () => {
    const props = { questions: allWrongAnswersMock };
    render(<ScorePage {...props} />);
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  it('should display score according to correct answers', () => {
    const props = { questions: partialCorrectAnswersMock };
    render(<ScorePage {...props} />);
    expect(screen.getByText('Score: 20')).toBeInTheDocument();
  });
});
