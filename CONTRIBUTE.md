Contribute
==========

We do our best to accept all PRs that can improve this project!

Thanks for all your contributions!

## Process create a new component

1) In the project's root dir, create a folder named after the component you will create, for example `list` or `chart-bar`.

2) Create a file named `component.json` inside the folder. The content of the `component.json` file should follow this structure:

```JSON
{
  "name":"chart-bar",
  "author": "fabiorogeriosj",
  "dependencies": [
    "base"
  ]
}
```

3) Test and document your component in an HTML file inside your component's folder.

> Include usage examples and all the options that your component accept so other people can use the component correctly!

4) Open a Pull Request against the `master` branch

5) Wait for review and discussion.

> If we don't respond within a few days, send a message in the PR thread! =)

6) Your code will be merged if accepted!

## Re-generate MobileUI documentation

1) Fork and clone (your fork) [components repo]() and [mobileui.github.io repo]() inside the same parent folder.

```
__ parent/
  |_ components/
  |_ mobileui.github.io/
```

2) With your terminal, inside the **components** project, execute the `generate_docs.js` with node:

```bash
node generate_docs.js
```

3) Then, new files should be generated at **mobileui.github.io** folder. Now it's simple: add and commit these files to your fork project.

4) At GitHub, open the PR from your fork of **mobileui.github.io** to our repository with this commit with the new generated files.

5) We'll check and, if everything is ok, accept your merge!

