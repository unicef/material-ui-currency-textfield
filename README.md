# Material-ui currency textfield

## Development

In order to extend the components, clone the project and install dependencies.

```bash
$ git clone https://github.com/unicef/unicef-material-ui.git
$ npm install
```

The following commands are available: 

### `npm start`

Builds the app automatically for production to the `dist` folder, everytime you make changes in the code.

```
npm start
```

This build we are utilizing in example project, so each time we make some changes in the app. it builds the app to `dist` folder. so that we can see changes in the example project.

Now open new tab in bash and run this commands:

 ```
 cd example 
 npm install (only if it is firt time)
 npm start
 ```
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

It will reload automatically upon edits. Lint errors are also displayed on the console.

### `npm run build`

Builds the app for production to the `dist` folder.

It bundles application in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run styleguide`
Generates the documentation the development mode.
Open [http://localhost:6060](http://localhost:6060) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

We use [styleguidelist](https://react-styleguidist.js.org/) for documenting our custom components.


### `npm run styleguide:build`
Builds the styleguide for production to the `styleguide` folder.<br>
It correctly bundles React-styleguide in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

