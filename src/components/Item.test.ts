import { render } from '@testing-library/svelte'
import ItemTest from './Item.test.svelte'
import { ItemPO } from './Item.po'

describe('Item component', () => {
  test('Should capture slot element click and emit own click event', async () => {
    const po = new ItemPO(render(ItemTest), 'Button')

    await po.clickSlotElement()

    expect(po.clickCapturedSpan).toHaveTextContent('true')
  })
})
