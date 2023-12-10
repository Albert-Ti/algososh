export const getValueDomElements = (selector: HTMLElement) => {
  const parentElements = Array.from(selector.children)
  const elementValue = parentElements.map(el => el.textContent)
  return elementValue
}
