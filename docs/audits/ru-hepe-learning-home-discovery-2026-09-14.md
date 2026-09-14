# RU HEPE Learning — Home Discovery Audit

Date: 14 September 2026
Status: PUBLIC-SAFE DISCOVERY ENHANCEMENT

## Purpose

Make the dedicated RU HEPE Learning course-ecosystem page discoverable from the public homepage without expanding the already dense primary navigation.

## Decision

- Keep the primary navigation unchanged.
- Feature RU HEPE Learning within the homepage's Selected Directions section.
- Use the verified `site.data.ru_hepe_learning.public_repository_count` value rather than hard-coding the repository count.
- Link the feature card to `/ru-hepe-learning/` using Jekyll `relative_url`.

## Public boundary

The homepage description presents RU HEPE Learning as a public teaching-and-learning ecosystem. It does not claim formal Ramkhamhaeng University organizational designation and does not expose private student work, grades, restricted HEPE records, credentials, or private repository information.
