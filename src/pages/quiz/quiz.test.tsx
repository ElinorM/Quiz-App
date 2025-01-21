import React from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Quiz } from './Quiz';
import { QUESTIONS } from './quiz.constants';


describe('Quiz', () => {
  it('should match snapshot', () => {
    expect(render(<Quiz/>)).toMatchSnapshot();
  });

  it('should render the first question', () => {
    render(<Quiz/>);
    expect(screen.getByText(QUESTIONS[0].title)).toBeInTheDocument();
  });

  it('should show the next question when Next is clicked', async () => {
    render(<Quiz/>);
    await userEvent.click(screen.getByRole('checkbox', { name: 'London' }));
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(QUESTIONS[1].title)).toBeInTheDocument();
  });

  it('should display the ScorePage when the quiz is submitted', async () => {
    render(<Quiz/>);
    for (let i = 0; i < QUESTIONS.length - 1; i++) {
      await userEvent.click(screen.getByRole('checkbox', { name: QUESTIONS[i].options[2] }));
      await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    }
    await userEvent.click(screen.getByRole('checkbox', { name: QUESTIONS[QUESTIONS.length - 1].options[2] }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Score:', { exact: false })).toBeInTheDocument();
  });
});
