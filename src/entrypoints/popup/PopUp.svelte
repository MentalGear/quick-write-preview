<script lang="ts">
    import { uiState } from "$lib/appState.svelte"
    import Button from "$lib/shadcn-components/ui/button/button.svelte"
    import { ModeWatcher } from "mode-watcher"
</script>

<ModeWatcher />

<main
    class="min-w-[200px] flex flex-col place-content-center text-center px-4 py-10 gap-4">
    <h1 class="text-xl font-bold underline">QuickWrite</h1>
    <p class="">Write less, get more.</p>

    <Button onclick={() => (uiState.extensionActive = !uiState.extensionActive)}
        >{uiState.extensionActive ? "Pause" : "Activate"}</Button>
</main>

<style lang="postcss">
    .logo {
        height: 5em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #54bc4ae0);
    }
</style>
