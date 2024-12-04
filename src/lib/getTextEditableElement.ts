export type TextInputElement =
    | (HTMLInputElement & { type: "text" })
    | HTMLTextAreaElement
    | (HTMLElement & { isContentEditable: true })

// export function isTextInputElement(element: any) {
//     if (
//         element instanceof HTMLInputElement == false &&
//         element instanceof HTMLTextAreaElement == false
//     )
//         return false

//     return (
//         element?.tagName === "TEXTAREA" ||
//         (element?.tagName === "INPUT" && element?.type === "text")
//     )
// }

export function getTextEditableElement(element: any) {
    if (
        (element instanceof HTMLInputElement == false &&
            element instanceof HTMLTextAreaElement == false &&
            element?.isContentEditable === false) ||
        "isContentEditable" in element === false
    )
        return null

    return element
}
