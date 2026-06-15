# Contributing to RxRead AI

## Branch Strategy

* `main` → Production-ready code
* `develop` → Integration branch
* `feature/*` → New features
* `fix/*` → Bug fixes

Example:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/patient-dashboard
```

## Commit Messages

Use clear commit messages:

```text
feat: add OCR upload component
fix: resolve API timeout issue
docs: update README
refactor: simplify image processing logic
```

## Pull Requests

Before opening a PR:

* Sync with latest `develop`
* Test your changes locally
* Remove unused code
* Ensure no build errors

PR target:

```text
feature/* → develop
develop → main
```

## Code Standards

* Keep components focused and reusable.
* Use meaningful variable and function names.
* Avoid commented-out code.
* Follow existing project structure.
* Keep PRs small and focused.
