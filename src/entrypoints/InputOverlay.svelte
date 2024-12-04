<script lang="ts">
    import {
        suggestionStore,
        uiState,
        type LLMStates,
    } from "$lib/appState.svelte"
    import { setShadowElementTheme } from "$lib/setTheme"
    import Button from "$lib/shadcn-components/ui/button/button.svelte"
    import * as DropdownMenu from "$lib/shadcn-components/ui/dropdown-menu"
    import DropdownMenuSeparator from "$lib/shadcn-components/ui/dropdown-menu/dropdown-menu-separator.svelte"
    // import * as Popover from "$lib/shadcn-components/ui/popover"

    import IconApp from "lucide-svelte/icons/sparkle" // pencil, pen-line, wand, wand-sparkles, sparkle, sparkles, letter-text
    import IconSuggestionsOverlay from "lucide-svelte/icons/captions" // rectangle-ellipsis
    import IconStop from "lucide-svelte/icons/ban"
    import { Separator } from "$lib/shadcn-components/ui/separator/index.js"
    import { cn } from "$lib/shadcn-utils"
    import { buttonVariants } from "$lib/shadcn-components/ui/button"
    import { flipElementPositionIfCovered } from "$lib/flipElementPosition"

    let menuElement: undefined | HTMLElement = $state(undefined)

    let {
        quickRewriteTrigger,
        stopQuickRewriteTrigger,
        undoLastAction,
        llmWriter = $bindable({ state: "idle" }),
    }: {
        quickRewriteTrigger: Function
        stopQuickRewriteTrigger: Function
        undoLastAction: Function
        llmWriter: { state: LLMStates }
    } = $props()

    const inputOverlayUIShadowRoot = document?.querySelector(
        "body > input-overlay-ui"
    )?.shadowRoot
    setShadowElementTheme(inputOverlayUIShadowRoot)

    async function onOpenStateChange() {
        // wait
        await tick()
        const menu = inputOverlayUIShadowRoot?.querySelector(
            "[role=menu]"
        ) as HTMLElement
        flipElementPositionIfCovered(menu)
    }

    function onQuickRewriteClick(e: MouseEvent) {
        quickRewriteTrigger()
    }

    function undoClick(e: MouseEvent) {
        undoLastAction()
    }

    function onStopRewriteClick(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        stopQuickRewriteTrigger()
    }

    let isSuggestionAvailable = $derived(
        Object.keys(suggestionStore).length > 0
    )
</script>

<DropdownMenu.Root
    portal={null}
    onOpenChange={onOpenStateChange}
    closeOnItemClick={false}
    disableFocusFirstItem={true}>
    <!-- Menu Button -->
    <DropdownMenu.Trigger asChild let:builder>
        <!-- TODO: separate buttons -->
        <div
            class="menuBtn
            {isSuggestionAvailable
                ? 'rounded-xl -translate-x-[76%]'
                : 'rounded-full -translate-x-1/2'}">
            <!--  -->
            {#if isSuggestionAvailable}
                <Button
                    builders={[builder]}
                    variant="ghost"
                    size="icon"
                    class="rounded-none h-8"
                    onclickcapture={(e: MouseEvent) => {
                        e.stopPropagation()
                        e.preventDefault()
                        uiState.isSuggestionsOverlayOpen =
                            !uiState.isSuggestionsOverlayOpen
                    }}>
                    <!-- Icon -->
                    <IconSuggestionsOverlay class="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" />
            {/if}

            <Button
                builders={[builder]}
                variant="ghost"
                size="icon"
                class="h-8 {isSuggestionAvailable ? 'rounded-none' : ''}"
                onclickcapture={(e: MouseEvent) =>
                    llmWriter.state === "active" ? onStopRewriteClick(e) : ""}>
                {#if llmWriter.state === "idle"}
                    <IconApp class="h-4 w-4" />
                {:else if llmWriter.state === "loading"}
                    loading
                {:else}
                    <IconStop class="h-4 w-4" />
                {/if}
            </Button>
        </div>

        <!-- <Button
            builders={[builder]}
            variant="outline"
            size={isSuggestionAvailable ? "sm" : "icon"}
            class="-translate-y-5 absolute rounded-full backdrop-blur-md bg-opacity-50
            {isSuggestionAvailable ? '-translate-x-[74%]' : '-translate-x-1/2'}"
            onclickcapture={(e: MouseEvent) =>
                llmWriter.state === "active" ? onStopRewriteClick(e) : ""}>
            {#if llmWriter.state === "idle"}
                <div class="flex flex-row gap-2">
                    {#if isSuggestionAvailable}
                        <IconSuggestionsOverlay
                            class="h-4 w-4"
                            onclickcapture={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                            }} />
                        <Separator orientation="vertical" />
                    {/if}
                    <IconApp class="h-4 w-4" />
                </div>
            {:else if llmWriter.state === "loading"}
                loading
            {:else}
                <IconStop />
            {/if}
        </Button> -->
    </DropdownMenu.Trigger>

    <!-- Menu Content -->
    <DropdownMenu.Content
        el={menuElement}
        side="top"
        align="end"
        fitViewport={true}
        class="translate-y-5 -translate-x-[84%] bg-backgroud bg-opacity-90 backdrop-blur-2xl z-[9999999999]">
        <DropdownMenu.Group>
            <DropdownMenu.Item onclick={undoClick}>
                Context ...
            </DropdownMenu.Item>

            <DropdownMenu.Separator />

            <!-- <DropdownMenu.Item onclick={undoClick}>
                Longer
            </DropdownMenu.Item>

            <DropdownMenu.Item onclick={undoClick}>
                Shorter
            </DropdownMenu.Item>

            <DropdownMenuSeparator /> -->

            <DropdownMenu.Item onclick={undoClick}>
                Undo
                <DropdownMenu.Shortcut>⌘Z</DropdownMenu.Shortcut>
            </DropdownMenu.Item>

            <!-- <DropdownMenu.Item onclick={undoClick} class="gap-4">
                Rewrite ...
                <DropdownMenu.Shortcut>⎇ 2x⇧</DropdownMenu.Shortcut>
            </DropdownMenu.Item> -->

            <DropdownMenu.Item onclick={onQuickRewriteClick} class="gap-4">
                QuickWrite
                <DropdownMenu.Shortcut>2x⇧</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
</DropdownMenu.Root>

<style lang="sass">
    :global(html, body)
        @apply bg-transparent
    
    :global([role="menuitem"]) 
        @apply cursor-pointer
        // @apply flex place-content-between gap-5;

    .menuBtn
        @apply flex flex-row gap-0 z-10 -translate-y-5 absolute backdrop-blur-md bg-opacity-50 bg-background overflow-hidden border border-opacity-50
        @extend .bg-blurred

    .bg-blurred
        @apply bg-background bg-opacity-30 backdrop-blur-2xl


</style>
