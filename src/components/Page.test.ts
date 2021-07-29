import { render } from "@testing-library/svelte";
import Page from "./Page.svelte";
import { PagePO } from "./Page.po";
import { tick } from "svelte";

describe('Page component', () => {

  test('Should change document title to "$appName - $title"', async () => {
    const title = "Test"
    const po = new PagePO(
      render(
        Page,
        {
          props: { title }
        }
      )
    )

    await tick()

    expect(po.documentTitle).toEqual(`${po.appName} - ${title}`)

  })

  test('Should display the page title when $hideHeader is false', () => {
    const title = "Test"
    const po = new PagePO(
      render(
        Page,
        {
          props: { title, hideHeader: false }
        }
      )
    )

    const el = po.pageTitleElement
    
    expect(el).toHaveTextContent(title)
    expect(el).toBeVisible()

  });

  test('Should hide (CSS Only) the page title when $hideHeader is true', () => {
    const title = "Test"
    const po = new PagePO(
      render(
        Page,
        {
          props: { title, hideHeader: true }
        }
      )
    )

    const el = po.pageTitleElement
    
    expect(el).toHaveTextContent(title)
    expect(el).not.toBeVisible()

  });

});