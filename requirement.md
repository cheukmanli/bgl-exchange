## BGL Frontend Engineering Interview
The technical interview is of two parts, a take home task with several degrees of freedom and an on-site pairing during which we will deploy your application into our development cloud environment.
Please submit your source code from the first part as a zip or tarball via email to talent@bgl.hk, Ed Manley ed.manley@bgl.hk. Enjoy!
### Take home task
We'd like you to familiarize yourself with a small, but foundational part of our tech stack. This task should not take a lot of time but ensures that we're on the same page when you onboard and we have the basics covered on which we will be building upon during your first weeks.
This task can be completed in Javascript or Typescript. We recommend Typescript as it provides additional static analysis and typechecking.
Create a static React application. You are free to use [create react app](https://github.com/facebook/create-react-app) or any build tooling of your liking.
Application requirements:
- fetch bitcoin exchange rates for multiple currencies (e.g. BTCUSD, BTCEUR etc. - the more currencies the better) from any publicly available API, once per minute
- store the exchange rates in application state in a sensible structure of your choice
- create a view to show the history for a given currency
- create a view to show the average price for all currencies for a given time frame
- create a view to show the latest price for all currencies
- wrap everything in a coherent UI following common UX standards
- Displayed data should be updated in realtime.
- Show a visual indicator if an exchange rate has increased or decreased.
We recommend you to use an existing UI framework such as [material-ui](https://material-ui.com/).
All functionality should be sufficiently tested. We recommend using [jest](https://jestjs.io/docs/en/getting-started)
Upload your project to github and publish the app somewhere public on the internet.
Please also outline the basic steps in a `README.md` file and describe your design decisions.
### On-site Development
After you've submitted your source code and link to the app and we deem it to be of sufficient quality, we will invite you for a pairing session in which we will develop your app further by adding new features. We will work together for 30-60 minutes to sketch out and implement new capabilities to the app. We're interested in your questions and feedback during this session and it should be a fun and interesting experience for you.
