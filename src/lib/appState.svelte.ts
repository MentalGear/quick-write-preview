import { TextInputElement } from "./getTextEditableElement"

export type LLMStates = "idle" | "loading" | "active"

export let llmWritersActive: { number: number } = $state({ number: 0 })

export const llmWriterStore: { state: LLMStates } = $state({
    state: "idle",
    // writerState: ["idle"],
    // startNewWriter,
    // deleteWriter,
})

// $effect(() => {
//     if (llmWriter.state !== "idle") {
//         uiState.isSuggestionsOverlayOpen = true
//     } else uiState.isSuggestionsOverlayOpen = false
// })

export const uiState: {
    isSuggestionsOverlayOpen: boolean
    currFocusedTextEditableEl: undefined | TextInputElement
    extensionActive: boolean
} = $state({
    isSuggestionsOverlayOpen: false,
    currFocusedTextEditableEl: undefined,
    extensionActive: true,
})

// not using export let suggestionStores: SuggestionStore = $state({})
// type SuggestionStore = { [key: string]: { elements: string[] } }
// as this uses dynamically added nested vars,
// which would require this to access: $state.snapshot(suggestionStores[id]?.elements

export type SuggestionStore = {
    [key: string]: { value: string; state: SuggestionItemState }[]
}
export type SuggestionItemState = "error" | "pending" | "done"

export let suggestionStore: SuggestionStore = $state({})

export let suggestionState = $state({
    storeId: "",
})

let suggestionStoreIdsCounter = $state(0)

export function addNewStore() {
    const newStoreId = "id_" + suggestionStoreIdsCounter++ // simpple number is enough instead of uuid as this is isolated per page/document
    // suggestionStore[newStoreId].push({
    //     value: "",
    //     state: "pending",
    // })
    return newStoreId
}

export function addStoreItem(
    id: string,
    value: string,
    state: SuggestionItemState
): number {
    suggestionStore[id] = [...(suggestionStore?.[id] ?? []), { value, state }]
    return suggestionStore[id].length
}

export function setStoreValue(
    id: string,
    oldValue: string,
    newValue: string
): boolean {
    // if (!newValue || !oldValue) console.error("no values defined")
    // console.log("--- ?")
    // console.log(oldValue)
    // console.log(newValue)
    // console.log(suggestionStore)
    // console.log(id)
    // console.log(suggestionStore[id])
    // console.log("---")

    let store = $state.snapshot(suggestionStore?.[id])

    store.forEach((item) => {
        if (item.value === oldValue) item.value = newValue
    })

    suggestionStore[id] = store

    store = store

    // const indexOfItem = store.findIndex((item) => item.value === oldValue)

    //     suggestionStore[id][indexOfItem].value = newValue

    // for (let item of store) {
    //     if (item.value === oldValue) {
    //         console.log("previous item", item)
    //         item = { value: newValue, state: item.state }
    //         console.log("after item", item)
    //     }
    //     store = item
    //     console.log("after item", item)

    //     return true
    // }
    // else
    return false
}

export function setStoreState(
    id: string,
    oldState: SuggestionItemState,
    newState: SuggestionItemState
): boolean {
    // if (!newValue || !oldValue) console.error("no values defined")

    for (const item of suggestionStore[id]) {
        if (item.state === oldState) item.state = newState
        return true
    }
    // else
    return false
}

export function getStore(id: string) {
    return suggestionStore[id]
}

export function getStoreValue(id: string, index: number) {
    return suggestionStore[id]?.[index] ?? []
}

export function deleteStoreElement(id: string, itemIndex: number): number {
    suggestionStore[id].splice(itemIndex, 1)
    return suggestionStore[id].length
}

//

// export function deleteStoreElement(id: string, itemIndex: number): number {
//     suggestionStores[id].elements?.splice(itemIndex, 1)
//     return suggestionStores[id].elements.length
// }

// export function getStoreValue(id: string, itemIndex: number) {
//     return suggestionStores[id]?.elements[itemIndex] ?? ""
// }

// export function getStore(id: string) {
//     const value = newSuggestionStore["key"][0]
//     // this is needed to make it work over dynamically added nested vars
//     // const value = $state.snapshot(suggestionStores[id]?.elements ?? [])
//     console.log("get internal", value)
//     return value
// }

// export function addStoreItem(id: string, value: string) {
//     // const length = suggestionStores[id].elements.length
//     suggestionStores[id].elements.push(value ?? "")
//     return suggestionStores[id]?.elements.length
// }

// export function addNewStore() {
//     const newStoreId = suggestionStoreIdsCounter++ // simpple number is enough instead of uuid as this is isolated per page/document

//     suggestionStores[newStoreId] = { elements: [] }

//     return String(newStoreId)
// }

// elements: [
//     "nice",
//     "hi tehre",
//     "neat",
//     "lol",
//     "My dearest friend, \n\n It feels like ages since we've last connected, and I find myself thinking about you more often than I'd like to admit. Life has been quite the whirlwind lately, filled with both exciting adventures and unexpected challenges. One thing that's consistently brought me joy is [mention a specific hobby or interest]. It's a way for me to escape the chaos and find peace within myself. I've also been learning [mention a new skill or hobby] which has been incredibly rewarding. I'm eager to see where it takes me. Speaking of adventures, I recently had the opportunity to [share a recent experience or travel]. It was an unforgettable trip filled with [describe the highlights of the experience]. I've already started planning my next adventure, and I'm dreaming of [mention a future travel destination or activity]. Despite all the excitement, I haven't forgotten about you. I cherish our friendship and value our connection. I hope that this letter finds you well and that you're enjoying your own adventures. I'd love to hear all about what you've been up to. Please feel free to share your thoughts and experiences with me whenever you have a chance. Until we can chat in person again, I'll be thinking of you and sending you all my love. With heartfelt sincerity",
// ],

// LLM Write States
// COMPLEX VERSION NOT USED
// let writerStates: LLMStates[] = $state([])
// const writersActive = $derived(writerStates.length)

// function startNewWriter() {
//     if (writersActive > 2)
//         return console.error("Maximum concureent writers reached")

//     // const index = startNewWriter()

//     writerStates = [...writerStates, "active"]
//     // return index
//     return writerStates.length

//     // return index
// }

// function deleteWriter(indexToDelete: number) {
//     try {
//         writerStates = writerStates.filter(
//             (item, index) => index !== indexToDelete
//         )
//         return true
//     } catch (err) {
//         return err
//     }
// }

// export const llmWriters = $state({
//     // writerState: ["idle"],
//     startNewWriter,
//     deleteWriter,
// })

// export function makeLlmWriterState() {
//     let llmWriterState: LLMStates = $state("idle")

//     return {
//         get value() {
//             return llmWriterState
//         },
//         set(state: LLMStates) {
//             llmWriterState = state
//         },
//     }
// }

// export function createCounter() {
//     let count = $state(0)

//     return {
//         get count() {
//             return count
//         },
//         increment: () => (count += 1),
//     }
// }
