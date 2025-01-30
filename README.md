# DT210G - Moment 3

## Personlig bloggplattform

Detta är en personlig bloggplattform som presenterar blogginlägg från flera olika användare.

## Teknik

Applikationen är av typen SPA och är skapad med React och TypeScript. Den använder WordPress som Back-End för att autentisera användare via JWT tokens, samt all hantering kring blogginlägg (Läsa, Skapa, Redigera, Radera).

## State management

I applikationen används ett paket som heter zustand för att hantera "state" eller "store". Detta används egentligen bara för att hålla koll på om en användare är inloggad samt vilken användare det i så fall är.