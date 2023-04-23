/* eslint-disable */
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import { SignUp } from './SignUp'
import { BrowserRouter } from 'react-router-dom'

describe('Register component', () => {
    it("should render Register component correctly", () =>{
        render(
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        )
        const element = screen.getByRole("heading", {  name: /sign up/i})
        expect(element).toBeInTheDocument()
    })
    it('should render all form elements', () => {
        render(
            <BrowserRouter>
                <SignUp />
            </BrowserRouter>
        );
        expect(screen.getByLabelText('User Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
    it('should render the Sign Up form with all the required fields and submit button',async () => {
      render(
        <BrowserRouter>
            <SignUp />
        </BrowserRouter>
      );
      fireEvent.change(screen.getByLabelText('User Name'), {
        target: { value: 'Test User' },
      });
      fireEvent.change(screen.getByLabelText('Email Address'), {
        target: { value: 'test@test.com' },
      });
      fireEvent.change(screen.getByLabelText('Password'), {
        target: { value: 'password1' },
      });
      fireEvent.change(screen.getByLabelText('Confirm Password'), {
        target: { value: 'password1' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
      await waitFor(() => {
        expect(localStorage.getItem('dataKey')).toEqual(JSON.stringify({
          userName: 'Test User',
          email: 'test@test.com',
          password: 'password1',
          confirmPassword: 'password1',
        }));
      })
    });
})