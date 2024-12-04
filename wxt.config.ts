import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
    srcDir: "src",
    extensionApi: "chrome",
    modules: ["@wxt-dev/module-svelte"],
    alias: {
        $lib: "./src/lib",
    },
    manifest: {
        permissions: [
            "storage",
            "aiLanguageModelOriginTrial",
            // "activeTab",
            // "host_permissions",
        ],
        // google hackathon key https://discord.com/channels/1009525727504384150/1282759403040149524/1310963363626618910
        key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvf0O/bR3JULoj6dOpG7sDif4BNVgootUIfSybh2a7jX47BglfZFNH/aRUgDjNtcTBPinXdGbljMVIudQ7w6LiwVq9b1Ht6ZXFVtHTKOsDWtVh/rVKE/AGue9eQ7xCncHFl4zLJUaDRUIRqe5zvjHtaMr8p92I3c/6k43LmTUp1QHz0NooDJRYKRPLS77YVDX8hZc2yopIH5NIY25Ned3wxZ/NWV70GZkYqFRN+UzvMS8bJUEY23L1AMSX7YQjMThY0BCZ/MBLo8UBLs8vN11EphMpLxnBhF2Zwwj2sCPR0jn0ev8HYCtKmGx8nzOl79oK24RFIsW8YWFB2fd28fBLwIDAQAB",
        trial_tokens: [
            "Aozzz6KfHYqh8q5x+Khse27nSp8YM7Tftv6XZhNO7lgYcP5uQxxBEpMfRhiFbYJV+yJl1fDNzvtao7FswtZGIgQAAAB4eyJvcmlnaW4iOiJjaHJvbWUtZXh0ZW5zaW9uOi8vYWhpaWZrb2RnbWlmcGNnbmRja3BwaW1lY25wa3BkbGwiLCJmZWF0dXJlIjoiQUlQcm9tcHRBUElGb3JFeHRlbnNpb24iLCJleHBpcnkiOjE3NjA0ODYzOTl9",
        ],
    },
})
