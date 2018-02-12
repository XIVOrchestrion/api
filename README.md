## API @ FadedCopy

**API is still under construction and subject to change**

This is a Mock API for FadedCopy, allowing easy management of Orchestrion Rolls and their respective guides.

The API structure is based on the fantastic work done for [Apkallu Falls](https://github.com/ApkalluFalls/api.apkallufalls.com), and collects relevant data from [XIVDB](https://github.com/xivdb/api) and [XIV-Datamining](https://github.com/viion/ffxiv-datamining).

## Setup

You'll need Node version 8 or higher installed in order to run the scripts - this is due to using an ES6 structure for all scripts.

```
git clone git@github.com:XIVOrchestrion/api.git
cd api
npm install
```

Tip: If available, [Yarn](https://yarnpkg.com/lang/en/) can be used instead! Once installed, run `yarn` after cloning to setup.

## Structure

This repository has 3 core directories:

### docs

This is home to all JSON data retrieved from XIVDB and XIV-Datamining. This data is used to maintain FadedCopy.

### filters

Scripts that can be used to alter fetched data, such as adding content guides and extra information.

### scripts

The core functionality of builing the API is kept within scripts.


**API is still under construction and subject to change**