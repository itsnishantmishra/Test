# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)








        {/* Background reveal: white to image, revealed from bottom */}
        <div className="absolute inset-0 max-w-full h-full pointer-events-none select-none z-0">
          {/* Background always */}
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`} />
          {/* Image revealed from bottom as you scroll */}
          <img
            src={kiranaShop}
            alt="Background"
            className="absolute left-0 bottom-0 w-full object-cover transition-all duration-500 md:mt-16"
            style={{
              height: `${bgReveal * 100}%`,
              opacity: bgReveal,
              filter: `blur(${10 - 10 * bgReveal}px) ${isDarkMode ? 'brightness(0.6) contrast(1.1)'  : ''}`,
              transition: "height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, filter 0.4s"
            }}
          />
        </div>
        <div
          className="relative z-10 transition-all duration-300"
          style={{
            transform: `scale(${sledgeScale}) translateY(${sledgeTranslate}px)`,
            transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)"
          }}
        >
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Sledge 
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 tracking-tight text-blue-400">
            Software Solutions
          </h1>
          <p className={`text-base md:text-xl mb-6 md:mb-10 max-w-2xl mx-auto px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A premium UI crafted with Eudoxus Sans for clarity, elegance, and modern appeal. Designed for forward-thinkers.
          </p>
          <button className={`px-6 md:px-8 py-2 md:py-3 text-base md:text-lg rounded-full transition-all ${
            isDarkMode 
              ? 'bg-white text-gray-900 hover:bg-gray-100' 
              : 'bg-black text-white hover:bg-gray-900'
          }`}>
            Explore Now
          </button>
        </div>