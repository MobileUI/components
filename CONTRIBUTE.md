# Contributing to MobileUI Components


First off, thanks for taking the time to contribute! :+1: We do our best to accept all PRs that can improve this project! :tada:

The following is a set of guidelines for contributing to MobileUI Components and its packages, which are hosted in the [MobileUI](https://github.com/MobileUI) organization here at Github. These are mostly guidelines to help you guys get started and not rules. Use your best judgement, and feel free to propose changes to our project through a pull request. :smile:

## What should I know before contributing?

MobileUI is an open source project created thinking of making your hybrid applications faster and smaller. It helps a lot since you're not required to install the whole package, you only install what you need to get started in building your application. :tada:

Certainly, you will love using it in [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) and [Apache Cordova Apps](https://cordova.apache.org). You can use only the components you want in your projects created with [PhoneGap](https://phonegap.com/), [Ionic Framework](https://ionicframework.com/), [Onsen UI](https://onsen.io/), [Framework7](http://framework7.io/) and others focused on creating web apps. 

A rich variety of UI components specially designed for mobile apps. MobileUI provides tabs, side menu, stack navigation and tons of other components such as lists and forms. Some of the existing components are displayed differently on Android and iOS, with automatic styling that will change the appearance of the app based on the platform.

To know more --- check out the official [documentation](https://mobileui.github.io/#getting-started)

## Getting Started

---

### Process of creating a new component

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

### Re-generating MobileUI documentation

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

