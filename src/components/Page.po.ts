import type { RenderResult } from "@testing-library/svelte";

export class PagePO {

  constructor(private render: RenderResult) {}

  appName = 'App'

  get documentTitle() {
    return document.title
  }

  get pageTitleElement() {
    return this.render.getByTestId('title')
  }

}