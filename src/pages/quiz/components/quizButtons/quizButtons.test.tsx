import React from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizButtons, QuizButtonsProps } from './QuizButtons';
import { QUESTIONS } from '../../quiz.constants';


const mockProps = (props?: Partial<QuizButtonsProps>) => {
  return {
    question: {
      title: 'What is the capital of France?',
      options: ['New York', 'London', 'Paris', 'Dublin'],
      answer: 'Paris',
      selectedOption: 'Paris',
    },
    questionCount: 2,
    setQuestionCount: jest.fn(),
    setSubmitted: jest.fn(),
    ...props,
  };
};

describe('QuizButtons', () => {
  let props: QuizButtonsProps;

  beforeEach(() => {
    jest.clearAllMocks();
    props = mockProps();
  });

  it('should match snapshot', () => {
    expect(render(<QuizButtons {...props} />)).toMatchSnapshot();
  });

  it('should render previous button if questionCount > 0', () => {
    render(<QuizButtons {...props} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
  });

  it('should not render previous button if questionCount equals 0', () => {
    props = mockProps({ questionCount: 0 });
    render(<QuizButtons {...props} />);
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
  });

  it('should call setQuestionCount on previous button click', async () => {
    render(<QuizButtons {...props} />,);
    await userEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(props.setQuestionCount).toHaveBeenCalledWith(1);
  });

  it('should render next button if questionCount < (questions length - 1)', () => {
    render(<QuizButtons {...props} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('should not render next button if questionCount equals (questions length - 1)', () => {
    props = mockProps({ questionCount: QUESTIONS.length - 1 });
    render(<QuizButtons {...props} />);
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
  });

  it('should call setQuestionCount on next button click', async () => {
    render(<QuizButtons {...props} />,);
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(props.setQuestionCount).toHaveBeenCalledWith(3);
  });

  it('should disable next button if no option is selected', () => {
    props = mockProps({ question: { ...props.question, selectedOption: undefined } });
    render(<QuizButtons {...props} />);
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  it('should render submit button if questionCount equals (questions length - 1)', () => {
    props = mockProps({ questionCount: QUESTIONS.length - 1 });
    render(<QuizButtons {...props} />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should not render submit button if questionCount not equals (questions length - 1)', () => {
    render(<QuizButtons {...props} />);
    expect(screen.queryByRole('button', { name: 'Submit' })).not.toBeInTheDocument();
  });

  it('should call setSubmitted on submit button click', async () => {
    props = mockProps({ questionCount: QUESTIONS.length - 1 });
    render(<QuizButtons {...props} />,);
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(props.setSubmitted).toHaveBeenCalledWith(true);
  });

  it('should disable submit button if no option is selected', () => {
    props = mockProps({ question: { ...props.question, selectedOption: undefined }, questionCount: QUESTIONS.length - 1 });
    render(<QuizButtons {...props} />);
    const nextButton = screen.getByRole('button', { name: 'Submit' });
    expect(nextButton).toBeDisabled();
  });
});
