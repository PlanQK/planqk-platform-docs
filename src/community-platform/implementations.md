# Implementations
 
Implementations are hosted as Git repositories, which means that version control and collaboration are core elements of PlanQK.
In a nutshell, an implementation (also known as a repo or repository) is a place where code and assets can be stored to back up your work, share it with the community, and work in a team.

In these pages, you will go over the basics of getting started with Git and interacting with implementations on the PlanQK.

## Getting started
A step by step guide to your first implementation.

### 1. Create an implementation
On the [Implementations](https://platform.planqk.de/implementations) page, click on the **Create Implementation** button.
And enter a name for your implementation.

### 2. Clone the repository locally
To clone the repository, copy the URL of the repository from the implementation page.

The PlanQK Git Server supports HTTPS with basic authentication.
You can authenticate by providing your personal access token in the Git URL.
For example, `https://planqk:<your-access-token>@git.platform.planqk.de/...`.

For the sake of this example, let's assume the URL is `https://planqk:plqk_123@git.platform.planqk.de/fd0a7648-6b0d-462c-aed2-26c46b439e1d/my-first-impl.git`.

```bash
git clone https://planqk:plqk_123@git.platform.planqk.de/fd0a7648-6b0d-462c-aed2-26c46b439e1d/my-first-impl.git
cd my-first-impl
```
> You can clone any repository that you have at least 'Viewer' permissions for.

### 3. Add a README
Add a README to your repository to provide information about your implementation.

```bash
touch README.md
git add README.md
git commit -m "add README"
```

### 4. Push your changes

Push your code to the repository using the following commands:
```bash
git push --set-upstream origin main
```

After refreshing the page, you will see the README file in the repository.



## Create a service

## Settings
1. Manage members

### Share with the Community
1. Add a README
2. Add a LICENSE

## Working with Git

You can also upload existing files from your computer using the instructions below.

Git global setup
git config --global user.name "Felix Mustermann"
git config --global user.email "felix@anaqor.de"
Create a new repository
git clone https://planqk:plqk_hXsDzbWIPpgHdSVVtYkygHx7xoOcxXLBpxHHl1K6eC@git.34.90.225.20.nip.io/fd0a7648-6b0d-462c-aed2-26c46b439e1d/my-supe-cool-impl.git
cd my-supe-cool-impl
git switch --create main
touch README.md
git add README.md
git commit -m "add README"
git push --set-upstream origin main
Push an existing folder
cd existing_folder
git init --initial-branch=main
git remote add origin https://planqk:plqk_hXsDzbWIPpgHdSVVtYkygHx7xoOcxXLBpxHHl1K6eC@git.34.90.225.20.nip.io/fd0a7648-6b0d-462c-aed2-26c46b439e1d/my-supe-cool-impl.git
git add .
git commit -m "Initial commit"
git push --set-upstream origin main
Push an existing Git repository
cd existing_repo
git remote rename origin old-origin
git remote add origin https://planqk:plqk_hXsDzbWIPpgHdSVVtYkygHx7xoOcxXLBpxHHl1K6eC@git.34.90.225.20.nip.io/fd0a7648-6b0d-462c-aed2-26c46b439e1d/my-supe-cool-impl.git
git push --set-upstream origin --all
git push --set-upstream origin --tags


