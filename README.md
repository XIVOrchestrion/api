## API @ FadedCopy

**API is still under construction and subject to change**

This is a Mock API for FadedCopy, allowing easy management of Orchestrion Rolls and their respective guides.

The API structure is based on the fantastic work done for [Apkallu Falls](https://github.com/ApkalluFalls/api.apkallufalls.com), and collects relevant data from [XIVDB](https://github.com/xivdb/api) and [XIV-Datamining](https://github.com/viion/ffxiv-datamining).

**Note: Due to changes between v2 and v3 of XIVDB's API, an API Key is now required to update the library. You'll need to obtain an API key for XIVDB, and create a file called `xivdb-api-key.txt` and place it in the root folder in order to build out Library files**

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

## Library

In order to process Orchestrion data and provide extensive information on each file, FadedCopyAPI needs access to a variety of data from [XIVDB](https://api.xivdb.com). In order to speed up repeat processing, this information is cached and saved locally. This information will need to be populated in order to start completing Orchestrion data entries. To get started, run:

```
yarn start:libra
```

or, if you're using NPM

```
npm start:libra
```

### docs

This is home to all JSON data retrieved from XIVDB and XIV-Datamining. This data is used to maintain FadedCopy.

### filters

Scripts that can be used to alter fetched data, such as adding content guides and extra information.

### scripts

The core functionality of builing the API is kept within scripts.


**API is still under construction and subject to change**
