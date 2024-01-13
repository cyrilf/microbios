In `package.json`

Remove:

```
  "highlight.js": "11.8.0"
},
"resolutions": {
  "highlight.js": "11.8.0"
},
```

once [justcaliturner/simple-code-editor#45](https://github.com/justcaliturner/simple-code-editor/pull/45) is merged.

Also, remove in `Code.vue > <CodeEditor ...>`: `style="overflow-y: auto"` once [justcaliturner/simple-code-editor#32](https://github.com/justcaliturner/simple-code-editor/pull/32) is merged.
