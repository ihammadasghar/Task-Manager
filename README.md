# Task-Manager
Task management web app

### Developers Guideline
-  Always create new work in a new branch.
-  Create a PR and wait for review.
-  Follow TDD (Test First approach), so support your every work with tests where possible.
-  **Branch name** should start with "task-XX\", where XX is the task number. For example for task #15, branch name can be: `task-15\home-and-sign-screens`.
-  **Commit message** should start with "[task-XX] ", like: `[task-15] added home and sign screens`.

## Setup:
1. Clone the Repository
```
https://github.com/ihammadasghar/Task-Manager.git
```

2. Set environment variables ".env" file in the root
```
DANGEROUSLY_DISABLE_HOST_CHECK=true
REACT_APP_USERNAME="username"
REACT_APP_PASSWORD="password"
REACT_APP_ENV="DEV"
``` 
Note: The first setting is the only workable solution found for now for "Proxy Base URL in package.json with react-script 5.0.1". [Stackoverflow Link](https://stackoverflow.com/a/71215101)

3. Download all the dependencies:
```
cd t2office-react
npm install
```
**In case of "vulnerabilities" in npm install output**, reference to this Stackoverflow [link](https://stackoverflow.com/questions/67693423/npm-audit-fix-force-react-script-downgrade-automatically) we may do: `npm audit --production`.

4. Run the app:
```
npm start
```

5. Navigate to http://localhost:3000/ on your browser.