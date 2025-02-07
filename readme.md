<div align="center">
  <a href="./store/doc/doc/src/README.md">
    Documentation
  </a>
&nbsp;|&nbsp;
  <a href="./store/demo/">
    Examples
  </a>
</div>

<br />

You can quickly develop desktop applications using simple front-end languages, with a program size of less than 1M.

## Features

- No need to write in any language other than JavaScript; use JavaScript to call system APIs.
- Super lightweight, less than 1M.
- Super simple, develop and generate programs without installing complex development environments.
- System interfaces are ready to use out of the box. For example, read and write local files, execute system commands, run in the background, tray menus, etc.

## Contribution

If you want to participate in the development of this project, it's recommended to prepare the following environment:

- node v18.19.0
- vscode v1.94.2
- pnpm v9

Directory structure description:

<pre>
<a href="./store/">store/</a>
  <a href="./store/bin/">bin/</a> - Source code for binary programs that provide service calls.
  <a href="./store/demo/">demo/</a> - Some usage examples.
  <a href="./store/doc/">doc/</a> - Source code for project and usage documentation.
  <a href="./store/play/">play/</a> - Playground program.
  <a href="./store/sdk/">sdk/</a> - Source code for the JavaScript API.
</pre>

## Acknowledgments

- [LuaRT](https://github.com/samyeyo/LuaRT)
