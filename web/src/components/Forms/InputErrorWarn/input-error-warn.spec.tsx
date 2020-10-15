import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import InputErrorWarn from '.'

describe('Input Error Warn Component', () => {
  const testIdAndClassName = 'input-error-warn-container'

  it('should render an alert-icon component', () => {
    render(<InputErrorWarn message="any_message" />)

    const element = screen.getByTestId(testIdAndClassName)
    expect(element).toBeInTheDocument()
    expect(element.className).toBe(testIdAndClassName)
    expect(element.dataset.message).toBe('any_message')

    expect(screen.getByLabelText(/alert icon/i)).toBeInTheDocument()
  })

  it('should hover over the container and a tooltip must be displayed', () => {
    
  })
})
