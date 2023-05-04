import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import Vitest from '@/components/Vitest.vue'

describe.concurrent('Vitest Component', () => {
  const viewText = 'Hello Everybody'
  it('render span correctly', async () => {
    // arrange
    const id = 'id'
    render(Vitest, {
      props: { element: 'span', id: id },
      slots: { default: viewText },
    })
    const view = await screen.findByText(viewText)
    // asert
    expect(view.id).toBe(id)
    expect(view.innerHTML).toBe(viewText)
    expect(view.nodeName).toBe('SPAN')
  })

  it('snapshot matches', ({ expect }) => {
    const wrapper = render(Vitest, {
      props: { element: 'div' },
    })
    expect(wrapper).toMatchSnapshot()
  })
})
