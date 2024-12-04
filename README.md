# QuickWrite

### Video Showcase

**Click the Screenshot to play the demo video**

_Example of using on BlueSky_

[![Quickook at QuickWrite](https://i.vimeocdn.com/video/1957490725-41db7f53e7e4dc5eabce65ea78a3876dfec813b64835bc0180c19a8a8351b100-d_2400)](https://vimeo.com/1035881817)

---

### **Motivation**

By focusing on a narrow, stable scope with an excellent execution, this use-case ensures high output confidence and enables top-tier design and engineering.

This approach has a strong source > verifier > consumer alignment.

    The source is the user’s input or intent.
    The verifier is the user, who reviews and validates the AI-generated suggestions.
    The consumer is also the user, who incorporates the refined output into their writing.

The expert-human-in-the-loop nature of this system minimizes the risk of errors or hallucinations (a known issue even in larger models) being published and ensures that the LLM generation acts as an augmentation of the user’s knowledge, not a replacement.

The above approach stands in contrast to other use-cases, like semantic search, chatbots, etc, where the source is foreign, there is no verifier and the consumer is the often domain-foreign user.

---

### **Tech Stack**

The stack includes **Google Gemini**, **Svelte**, WXT and **Shadcn-Svelte** to deliver a sleek and responsive user experience.

---

### **Challenges Overcome**

#### **1. Seamless Integration**
The primary challenge was creating a natural, unobtrusive user interface that fits effortlessly into existing workflows. It needed to be easily discoverable while also being non-intrusive. Technically, it should also maintain the integrity of native features, like undo/redo functionality. The result? A system that feels intuitive and enhances the user experience without disrupting it.

#### **2. Adaptive Suggestion Playground**
Designing the "suggestion playground" required finding a balance between structured guidance and creative freedom. The environment had to feel open-ended for experimentation, yet purposeful, offering clear navigation paths and contextual support. Striking this balance was essential to invite exploration without overwhelming users.

#### **3. Intelligent Error Handling**
Building robust mechanisms for managing LLM errors, this included anticipating potential failure points, delivering meaningful feedback, and ensuring smooth recovery from unexpected responses. Adaptive strategies were key to maintaining a seamless and user-friendly experience.

---

### **Accomplishments**

- Developed a functional **Proof of Concept**.
- Crafted an intuitive and user-friendly **UI** that lays the foundation for future development.

---

### **Lessons Learned**
- It was impressive what a small in-browser model can do - and all private and without the cloud.
- Subscribing to newsletters and hackathon updates earlier would have given more time for preparation and refinement.

---

### **What’s Next for QuickWriteAI**

- **Bug Fixes and Testing:** Fix bugs, glitches and expand testing to ensure stability and usability.
- **Smart Retries:** If a llm generation fails, re-try a few more times behind the scenes before showing an error to the user.
- **Enhanced Context Features:** Introducing page- and domain-wide preset contexts, customizable profiles, and even automatic context detection to streamline the user experience.

---

### Install
1. Chrome Canary, go to extensions and activate "Developer Mode"

2. Load the extension package (you find it in this codebase __.output/quick-write-0.0.0-chrome.zip__)

3. Go to "chrome://flags"
    a. search for "built-in AI". Activate all 4 APIs.
    b. Search for "Enables optimization guide on device" and set to "Enabled BypassPerfRequirement"
   
4. Relaunch Browser

5. A new UI Quick Write indicator is available in the right top corner of textfields

# Problem / Fix
pnpm dev / wxt dev does not work.
Instead :
Launch Canary normally, than load the extension unpacked into it.

# WXT + Svelte

This template should help get you started developing with Svelte in WXT.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).
