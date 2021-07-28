import { render } from '@testing-library/svelte'
import { FieldPO } from './Field.po'
import FieldTest from './Field.test.svelte'

describe('Field component', () => {
  const placeholder = 'Input'
  test('Should change "touched" state to true when a "blur" event is captured', async () => {
    const po = new FieldPO(
      render(FieldTest, {
        props: {
          placeholder,
          touched: false,
          errors: [],
        },
      }),
      placeholder
    )

    await po.fireInputBlur()

    expect(po.touchedSpan).toHaveTextContent('true')
  })

  test('Should display the errors messages separated by comma when touched is true', () => {
    const po = new FieldPO(
      render(FieldTest, {
        props: {
          placeholder,
          touched: true,
          errors: ['Error 1', 'Error 2'],
        },
      }),
      placeholder
    )

    expect(po.errorMsgSpan).toHaveTextContent('Error 1, Error 2')
  })

  test('Shouldnt displat the errors messages when touched is false', () => {
    const po = new FieldPO(
      render(FieldTest, {
        props: {
          placeholder,
          touched: false,
          errors: ['Error 1', 'Error 2'],
        },
      }),
      placeholder
    )

    expect(po.errorMsgSpan).not.toBeInTheDocument()
  })
})
