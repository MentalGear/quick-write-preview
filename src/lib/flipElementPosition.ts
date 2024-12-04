export async function flipElementPositionIfCovered(
    element: Element,
    inverseDirection = false,
    extraOffset = 0
) {
    // guard
    if (!element || element instanceof HTMLElement == false) return
    // if (!elementIsFullyVisibleInViewport(menu)) return

    await tick()

    // console.log(element)
    // console.log(element.offsetHeight)

    // BUGFIX: since DropdownMenu.Content props for setting menu to top
    // does not work in shadow dom, we need to manually
    // flip menu from bottom to top
    const elementHeight = element?.offsetHeight ?? 0
    const topSpaceLeft = inverseDirection
        ? element.getBoundingClientRect().top
        : element.getBoundingClientRect().top - elementHeight
    // console.log({ topSpaceLeft })
    if (topSpaceLeft < 0 && !inverseDirection) return
    if (topSpaceLeft > 0 && inverseDirection) return

    element.style.top = inverseDirection
        ? `${elementHeight + elementHeight / 3 + extraOffset}px`
        : `-${elementHeight}px`
}
