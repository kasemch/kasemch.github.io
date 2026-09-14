# Post-Release Wave 02 — Live Public Verification

Date: 2026-09-14

## Purpose
Close the remaining verification gap between successful Jekyll build artifacts and the deployed GitHub Pages site.

## Implementation
A read-only GitHub Actions workflow checks the public site on a daily schedule and can also be run manually. It performs HTTP GET checks against core public routes, verifies selected page markers, downloads the public Static AI academic index, validates that the index is non-empty, and confirms that key destinations remain represented.

## Boundaries
- No backend is added to the website.
- No write access to the public site is required.
- No secret, token, private Drive identifier, student information, or restricted evidence is used.
- The workflow checks public HTTP output only.
- A smoke-check failure is a deployment/availability signal; it does not automatically modify website content.

## Core coverage
Home, About, Teaching, Research, Research Status, Publications, Curriculum & Quality, Innovation, Professional Development, Evidence Explorer, Knowledge Map, RU HEPE Learning, and CV.

## Marker coverage
- Home: `AI Academic Assistant`
- Evidence Explorer: `Evidence Explorer`
- Knowledge Map: `Academic Knowledge Map`
- Professional Development: `Professional Development`
- Static AI index includes Research Status, Evidence Explorer, Knowledge Map, and Professional Development destinations.

## Gate
Merge only after the repository Jekyll build passes and the workflow syntax is accepted by GitHub Actions.
