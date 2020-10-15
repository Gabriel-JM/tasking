import React from 'react'
import { render, screen } from '@testing-library/react'
import Title from '.'

describe('Title Component', () => {
  it('should render a h1 as title', () => {
    const { container } = render(<Title />)

    expect(screen.getByText(/tasking/i)).toBeInTheDocument()
    
    expect(
      screen.getByRole('heading', { name: /tasking/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchInlineSnapshot(`
      <header
        class="header"
      >
        <div
          class="header-container"
        >
          <h1>
            Tasking
          </h1>
        </div>
      </header>
    `)
  })
})
