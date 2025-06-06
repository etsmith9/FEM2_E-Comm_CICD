Please find a description of the assignment I based this project on below. Essentially, I created a e-commerce platform integrated with react and implemented a CI/CD pipeline to maximize functionality.
The link to my website is https://fem-2-e-comm-cicd-esgwa108d-emilysmiths-projects.vercel.app/.

Implementing CI/CD Pipeline for React E-Commerce App
The e-commerce project, developed in Module 12, requires a streamlined Continuous Integration and Continuous Deployment (CI/CD) pipeline for optimal performance. This pipeline should automate the process of building, testing, and deploying the application to Vercel, a cloud platform. Key components include setting up a robust CI/CD workflow using GitHub Actions and implementing unit tests for application reliability. 



Implementing Test-Driven Development (TDD) in React:
Unit Testing:
Write at least two unit tests (separate components)
Test component rendering, state changes, and user interactions.
Ensure tests are focused, independent, and deterministic.

Integration Testing:
Conduct an integration test to ensure the Cart gets updated when adding a product 
Simulate user interactions and assert resulting changes using React Testing Library.

Implement a Continuous Integration (CI) flow of build and test in GitHub Actions:
Create a main.yml file within the .github/workflows directory to define the CI workflow.
Configure the workflow to automatically trigger code pushes to the main branch.
Use GitHub Actions to build the project and run unit tests using Jest.
Ensure that the workflow fails if any tests fail, preventing the deployment of faulty code.

Implement a Continuous Deployment (CD) flow in GitHub Actions with deployment to Vercel:
Extend the existing GitHub Actions workflow to include a deployment stage.
Define deployment jobs to deploy the application to Vercel.
Ensure that the deployment only occurs after the CI tests have passed successfully.
Submission
With that, your project should be deployed and hosted via Vercel!  Submit the updated GitHub link with a README.md that includes a link to your live E-commerce application!