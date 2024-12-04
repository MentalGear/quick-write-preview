import "../../app.css"
import PopUp from "./PopUp.svelte"

import { mount } from "svelte"

// const app = new App({
//   target: document.getElementById('app')!,
// });

const app = mount(PopUp, {
    target: document.body, // or your target element
    props: {
        // Your props here
    },
})

export default app
