# microbios

> [live website](https://microbios.cyrilf.com/)

![microbios website](./src/assets/microbios.gif)

_Cyclic experiment running on the demo website_

Find more **experiments** on [the live demo version](https://microbios.cyrilf.com/) 💡

---

## DESCRIPTION 📖

**Microbios** provide a generic code that allows simulations of **cellular automata** experiments.  
The most famous one being the **Game of Life** (that you can find on the [live version](https://microbios.cyrilf.com/) or on the [experiments folder](https://github.com/cyrilf/microbios/tree/5bcf07ffca6d75c2462a3c8af5e05b2dbc402961/src/experiments)).

This is an open-source project, licensed under MIT.

Feel free to submit a PR to create more experiments.

## ROADMAP 🚀

- [ ] 🚒 Extract the simulation code 'engine' out of this vue project (to be an external dependency easily re-usable)
- [ ] 🖌 Extract the rendering logic to be able to draw onto canvas
- [ ] 📑 Write README documentation
- [ ] 🎆 Write more experiments

## THANKS 👌

Thanks to The Coding Train who inspired me with his [video on cellular automata](https://www.youtube.com/watch?v=DKGodqDs9sA).  
Thanks to [@sanojian](https://github.com/sanojian) who provided good code inspiration through his project [cellauto](https://github.com/sanojian/cellauto).  
Thanks to [@nemtsov](https://github.com/nemtsov) for the vue-game-of-life [inspiration](https://github.com/nemtsov/conways-game-of-life-vue)

---

![trippy](./src/assets/gol.gif)

_Game of Life experiment_

![fire](./src/assets/fire.gif)

_Forest Fire experiment_

---

Default README from Vue 3 : 05/03/2024

---

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
