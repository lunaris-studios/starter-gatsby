<center>

## 🔳 `mirror-gatsby-base`
### A mirror template, for a mirror template (we need to go deeper)

[![LICENSE](https://img.shields.io/github/license/lunaris-studios/mirror-gatsby-base.svg)](https://github.com/lunaris-studios/mirror-gatsby-base/blob/master/LICENSE)
[![Releases](https://img.shields.io/github/release-pre/lunaris-studios/mirror-gatsby-base.svg)](https://github.com/lunaris-studios/mirror-gatsby-base/releases)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

</center>

<!-- ----------------------------------------------------------------- -->

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

<!-- ----------------------------------------------------------------- -->

<a name="features"></a>
## Features
- **Contribution**, **Maintenance**, and **Release** documentation
- **Apache Software License 2.0**, **MIT**, or **GNU GPL v3**.0 license options
- Automatic CI and release provisioning via **Github Actions** and [**semantic-release**](https://github.com/semantic-release/semantic-release)
- Scoped dependency setup via, [**Nix**](https://nixos.org/), [**Niv**](https://github.com/nmattia/niv), [**Lorri**](https://github.com/target/lorri), and [**direnv**](https://github.com/direnv/direnv)


<!-- ----------------------------------------------------------------- -->

<a name="installation"></a>
## Installation

```shell
mirror download lunaris-studios/mirror-gatsby-base template  
```

<!-- ----------------------------------------------------------------- -->

<a name="usage"></a>
## Usage

```shell
mirror use <output-directory>
```

<!-- ----------------------------------------------------------------- -->

<a name="contributing"></a>
## Contributing

`mirror-gatsby-base` is an open source project and we are very happy to accept community contributions. Please refer to [Contributing to mirror-gatsby-base](./CONTRIBUTING.md) for more details.

de_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gatsbyjs/gatsby-starter-default)

<!-- AUTO-GENERATED-CONTENT:END -->
