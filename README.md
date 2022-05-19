#  🎓 NCD.L2.sample--thanks dapp
This repository contains a complete frontend applications (Vue.js, React) to work with 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks" target="_blank">NCD.L1.sample--thanks smart contract</a> targeting the NEAR platform:
1. Vue.Js (main branch)
2. React (react branch)

The goal of this repository is to make it as easy as possible to get started writing frontend with Vue.js, React and Angular for AssemblyScript contracts built to work with NEAR Protocol.

## ⚠️ Warning
Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspiration purposes only. NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.

## Usage
Owner view

![image](https://user-images.githubusercontent.com/38455192/169348821-a191c98b-c1ab-4580-811c-d91baaf21db4.png)

<a href="" target="_blank">UI walkthrough</a>

You can use this app with contract ids which were deployed by the creators of this repo or you can use it with your own deployed contract ids.
If you are using not yours contract ids some functions of the thanks/registry contracts will not work because they are set to work only if owner called this  functions.

<a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks/blob/66dc6fb42a62317f8ff31c9c9ab96a995f3edd78/src/thanks/assembly/index.ts#L57" target="_blank">Example of such  function:</a>
```
  summarize(): Contract {
    this.assert_owner()
    return this
  }

```

To deploy sample--thanks to your account visit <a href="https://github.com/Learn-NEAR/NCD.L1.sample--thanks/tree/registry" target="_blank">this repo (smart contract deployment instructions are inside):</a> 

Also you can watch this video <a href="https://www.loom.com/share/15692f40800a4686ad47af71e9368a3d" target="_blank">video. </a> 

[![image](https://user-images.githubusercontent.com/38455192/169353150-81bf6d02-1a9e-428b-88eb-23f3c2c14328.png)]https://www.loom.com/share/15692f40800a4686ad47af71e9368a3d

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
