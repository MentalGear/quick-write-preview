<script lang="ts">
    import {
        suggestionState,
        SuggestionStore,
        suggestionStore,
        uiState,
    } from "$lib/appState.svelte"
    import Button from "$lib/shadcn-components/ui/button/button.svelte"

    import {
        queryFocusedTextEditableElement,
        suggestionElementName,
    } from "./content"
    import { setShadowElementTheme } from "$lib/setTheme"

    import IconPrevious from "lucide-svelte/icons/move-left"
    import IconNext from "lucide-svelte/icons/move-right"
    import IconRefresh from "lucide-svelte/icons/rotate-cw"
    import IconCopy from "lucide-svelte/icons/copy"
    import IconReplace from "lucide-svelte/icons/replace"
    import IconClose from "lucide-svelte/icons/x"
    import IconTrash from "lucide-svelte/icons/trash" // trash-2
    import { derived } from "svelte/store"
    import { flipElementPositionIfCovered } from "$lib/flipElementPosition"
    // import IconInfo from "lucide-svelte/icons/info"

    let {
        quickRewriteTrigger = () => {},
    }: {
        quickRewriteTrigger: Function
    } = $props()

    let inputWidth = $state(0)

    const suggestionOverlayUICustomElement = document?.querySelector(
        `body > ${suggestionElementName}`
    ) as HTMLElement
    const suggestionOverlayUIShadowRoot =
        suggestionOverlayUICustomElement?.shadowRoot
    setShadowElementTheme(suggestionOverlayUIShadowRoot)

    $effect(() => {
        // if (!suggestionOverlayUICustomElement) return
        if (uiState.isSuggestionsOverlayOpen) {
            suggestionOverlayUICustomElement.style.display = "block"
            // cant below as it will change on focus change
            if ((uiState.currFocusedTextEditableEl?.clientWidth ?? 0) > 0) {
                inputWidth = uiState.currFocusedTextEditableEl?.clientWidth ?? 0

                // quickfix
                // setTimeout(async () => {
                const elementWithHeight =
                    suggestionOverlayUIShadowRoot?.querySelector(
                        ".suggestionOverlay"
                    )
                if (!elementWithHeight) return

                flipElementPositionIfCovered(
                    elementWithHeight,
                    true
                    // extraOffset ?? 0
                )
                // }, 10)
            }
            // const focusedInput = queryFocusedTextEditableElement()
            // inputWidth = focusedInput?.clientWidth ?? 0
        } else suggestionOverlayUICustomElement.style.display = "none"
    })

    // ignore error
    const storeId = $derived(suggestionState.storeId)
    let suggestions: any[] = $state([])

    $effect(() => {
        // console.log("storeid", storeId)
        if (storeId) {
            suggestions = [...suggestionStore[storeId]]
        }
    })

    let currentSlideIndex = 0
    let containerRef: HTMLElement | undefined
    let observerRef: IntersectionObserver | undefined

    function goToSlide(direction: number | "previous" | "next" = "next") {
        let slideNumber = 0
        let behavior: ScrollBehavior = "smooth"

        if (direction === "next") slideNumber = currentSlideIndex + 1
        else if (direction === "previous") slideNumber = currentSlideIndex - 1
        else if (typeof direction === "number") {
            slideNumber = direction
            behavior = "instant"
        }

        if (!suggestionOverlayUIShadowRoot) return
        const slideToGo = suggestionOverlayUIShadowRoot.getElementById(
            `suggestion_${slideNumber}`
        )

        slideToGo?.scrollIntoView({
            behavior,
            block: "nearest",
            inline: "start",
        })
    }

    // onDestroy(() => {
    //     // Clean up observer when component is destroyed
    //     if (observerRef) {
    //         observerRef.disconnect()
    //     }
    // })

    let previousElementsLength = 0

    $effect(() => {
        if (suggestions ?? 0 > previousElementsLength) {
            goToSlide(suggestions.length - 1)
            previousElementsLength = suggestions.length
        }
    })

    function setupSlideObserverAnew() {
        if (observerRef) observerRef.disconnect()

        // Create Intersection Observer to track which slide is in view
        observerRef = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Extract the index from the slide's ID
                        const slideIndex = parseInt(
                            entry.target.id.replace("suggestion_", ""),
                            10
                        )

                        // Update current slide index
                        currentSlideIndex = slideIndex
                        // console.log({ currentSlideIndex })
                    }
                })
            },
            {
                root: containerRef,
                threshold: 0.5, // Trigger when at least 50% of the slide is visible
            }
        )

        if (!containerRef) return
        // Observe all slides
        const slides = containerRef.querySelectorAll(".slide")
        slides.forEach((slide) => {
            if (!observerRef) return
            observerRef.observe(slide)
        })
    }

    $effect(() => {
        if (!containerRef) return
        if (suggestions.length === previousElementsLength) {
            setupSlideObserverAnew()
        }

        // return () => {
        //     // if a callback is provided, it will run
        //     // a) immediately before the effect re-runs
        //     // b) when the component is destroyed
        //     if (observerRef) observerRef.disconnect()
        // }
    })

    // this should be better but doesnt work
    // $effect(() => {
    //     if (suggestions && !containerRef) return
    //     const slidesNumber = $derived(Object.keys(suggestions).length)
    //     console.log(slidesNumber)

    //     if (slidesNumber !== previousElementsLength) {
    //         setupSlideObserverAnew()
    //     }

    //     if (slidesNumber > previousElementsLength) {
    //         console.log("yeah")
    //         goToSlide(slidesNumber - 1)
    //         previousElementsLength = slidesNumber
    //     }
    // })

    function setTextEditableElementValue(string: string) {
        if (!uiState.currFocusedTextEditableEl)
            return console.error("currFocusedTextEditableEl not available")

        // if ("value" in uiState.currFocusedTextEditableEl) {
        //     uiState.currFocusedTextEditableEl.value = string
        // } else uiState.currFocusedTextEditableEl.innerText = string

        uiState.currFocusedTextEditableEl.focus()
        // textFieldEdit.insert(uiState.currFocusedTextEditableEl, "Made by 🐝 with pollen.")
        // or
        document.execCommand("selectAll")
        document.execCommand("insertText", false, string)
    }
</script>

<!-- class:visible={isOpen} -->
<div class="suggestionOverlay" style={`width:${inputWidth}px`} tabindex="-1">
    <!-- Hide Button -->
    <Button
        size="sm"
        variant="outline"
        class="h-10 w-10 rounded-full absolute top-0 right-0 z-10 translate-x-1/2 -translate-y-1/2 bg-blurred bg-card bg-opacity-100"
        onclick={(e) => {
            // document.body.blur()
            uiState.isSuggestionsOverlayOpen = false
        }}>
        <IconClose />
    </Button>

    <!--* SliderContainer *-->
    <div bind:this={containerRef} class="slidesContainer">
        {#each suggestions as item, i (i)}
            <!--* Slide *-->
            <div class="slide" tabindex="-1" id="suggestion_{i}">
                {item.value}
            </div>
        {/each}
    </div>

    <hr class="" />

    <div class="flex w-full place-content-between gap-4 py-2 px-4">
        <div class="flex flex-row gap-4">
            <Button
                size="sm"
                variant="ghost"
                class="h-10 w-10"
                onclick={() => {
                    if (!suggestions[currentSlideIndex]) return
                    setTextEditableElementValue(
                        suggestions[currentSlideIndex].value
                    )
                }}>
                <IconReplace />
                <!-- Use -->
            </Button>
            <Button
                size="sm"
                variant="ghost"
                class="h-10 w-10"
                onclick={async () =>
                    await navigator.clipboard.writeText(
                        suggestions[currentSlideIndex].value
                    )}>
                <!-- Copy -->
                <IconCopy />
            </Button>
        </div>

        {#if suggestions.length > 0}
            <div class="flex flex-row gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    class="h-10 w-10"
                    on:click={() => goToSlide("previous")}>
                    <IconPrevious />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    class="h-10 w-10"
                    on:click={() => goToSlide("next")}>
                    <IconNext />
                </Button>
            </div>
        {/if}

        <!-- <div class="flex flex-row gap-4">
            <Button size="sm" variant="ghost" class="h-10 w-10">
                <IconTrash />
            </Button>
            <Button
                size="sm"
                variant="ghost"
                class="h-10 w-10"
                onclick={(e) => quickRewriteTrigger}>
                <IconRefresh />
            </Button>
        </div> -->
    </div>

    <!--    <div class="flex w-full place-content-between gap-4 py-2 px-2">
        <div class="flex flex-row gap-0">
            <Button size="sm" variant="ghost" class="h-10 w-10">
                <IconReplace />
            </Button>
            <Button size="sm" variant="ghost" class="h-10 w-10">
                <IconCopy />
            </Button>
        </div>

        {#if suggestions.length > 0}
            <div class="flex flex-row gap-0">
                <Button
                    size="icon"
                    variant="ghost"
                    class="h-10 w-10"
                    on:click={() => goToSlide("previous")}>
                    <IconPrevious />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    class="h-10 w-10"
                    on:click={() => goToSlide("next")}>
                    <IconNext />
                </Button>
            </div>
        {/if}

        <div class="flex flex-row gap-0">
            <Button size="sm" variant="ghost" class="h-10 w-10">
                <IconCopy />
            </Button>
            <Button size="sm" variant="ghost" class="h-10 w-10">
                <IconRefresh />
            </Button>
        </div>
    </div> -->
</div>

<style lang="sass">
    .bg-blurred
        @apply bg-background bg-opacity-30 backdrop-blur-2xl

    .suggestionOverlay
        @apply flex flex-col
        @apply absolute -translate-x-1/2 -translate-y-[110%]
        @apply border
        @apply overflow-visible #{!important}
        @apply rounded-lg
        @apply max-w-screen-lg
        @apply z-[999999999]
        @extend .bg-blurred

    .slidesContainer
        @apply flex space-x-4 snap-x snap-mandatory min-h-[180px] h-[20vh] relative overflow-y-hidden overflow-x-scroll
        // @extend .bg-blurred

    .slide
        @apply w-full bg-card snap-center flex-shrink-0 p-2 overflow-x-hidden overflow-y-scroll
        @apply whitespace-pre-wrap // important so that div shows linebreaks!
        @apply rounded
        @extend .bg-blurred
        @apply bg-opacity-0

</style>
