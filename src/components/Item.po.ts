import { fireEvent, RenderResult } from '@testing-library/svelte'

export class ItemPO {
  constructor(private render: RenderResult, public slotElementText: string) {}

  get slotElement() {
    return this.render.getByText(this.slotElementText)
  }

  get clickCapturedSpan() {
    return this.render.getByTestId('click-captured')
  }

  async clickSlotElement() {
    await fireEvent.click(this.slotElement)
  }
}
