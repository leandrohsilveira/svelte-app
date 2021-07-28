import { fireEvent, RenderResult } from '@testing-library/svelte'

export class FieldPO {
  constructor(private render: RenderResult, public inputPlaceholder: string) {}

  get touchedSpan() {
    return this.render.getByTestId('touched')
  }

  get input() {
    return this.render.getByPlaceholderText(this.inputPlaceholder)
  }

  get errorMsgSpan() {
    return this.render.queryByTestId('error_msg')
  }

  async fireInputBlur() {
    await fireEvent.blur(this.input)
  }
}
