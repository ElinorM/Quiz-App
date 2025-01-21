import React from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionPage, QuestionPageProps } from './QuestionPage';


const props: QuestionPageProps = {
  question: {
    title: 'What is the capital of France?',
    options: ['New York', 'London', 'Paris', 'Dublin'],
    answer: ['Paris'],
    selectedOption: [],
  },
  updateSelectedOption: jest.fn(),
};

describe('QuestionPage', () => {
  it('should match snapshot', () => {
    expect(render(<QuestionPage {...props} />)).toMatchSnapshot();
  });


  it('should call updateSelectedOption on checkbox click', async () => {
    render(<QuestionPage {...props} />,);
    await userEvent.click(screen.getByRole('checkbox', { name: 'London' }));
    expect(props.updateSelectedOption).toHaveBeenCalledWith('London');
  });

  it('should render question title', () => {
    render(<QuestionPage {...props} />);
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  });

  it('should checkboxes', () => {
    render(<QuestionPage {...props} />);
    expect(screen.getByRole('checkbox', { name: 'New York' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'London' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Paris' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Dublin' })).toBeInTheDocument();
  });
});
