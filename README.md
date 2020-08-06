<center>

## 🔰 `starter-gatsby`

### A simple starter to get up and developing quickly with Gatsby

[![LICENSE](https://img.shields.io/github/license/lunaris-studios/starter-gatsby.svg)](https://github.com/lunaris-studios/starter-gatsby/blob/master/LICENSE)
[![Releases](https://img.shields.io/github/release-pre/lunaris-studios/starter-gatsby.svg)](https://github.com/lunaris-studios/starter-gatsby/releases)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

</center>

<!-- ----------------------------------------------------------------- -->

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

<!-- ----------------------------------------------------------------- -->

## Features

- Release provisioning via **Github Actions** and [**semantic-release**](https://github.com/semantic-release/semantic-release)
- [**Lighthouse CI**](https://github.com/GoogleChrome/lighthouse-ci) via **Github Actions**
- Pre-commit hook formatting via [**Husky**](https://github.com/typicode/husky) and [**lint-staged**](https://github.com/okonet/lint-staged)
- Dependency setup and injection via, [**Nix**](https://nixos.org/), [**Niv**](https://github.com/nmattia/niv), [**Lorri**](https://github.com/target/lorri), and [**direnv**](https://github.com/direnv/direnv)
- Automatically generate **Typescript** types for **Gatsby** **GraphQL** queries via [**graphql-code-generator**](https://github.com/dotansimha/graphql-code-generator)
- Testing via [**Jest**](https://jestjs.io/) and [**@testing-library**](https://testing-library.com/)

<!-- ----------------------------------------------------------------- -->

## Installation

```shell
gatsby new <output-directory> https://github.com/lunaris-studios/starter-gatsby
```

<!-- ----------------------------------------------------------------- -->

## Usage

```shell
cd <output-directory>
make help
```

<!-- ----------------------------------------------------------------- -->

## Contributing

`starter-gatsby` is an open source project and we are very happy to accept community contributions. Please refer to [Contributing to starter-gatsby](./CONTRIBUTING.md) for more details.
