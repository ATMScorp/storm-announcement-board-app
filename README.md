# Aplikacja Marketplace Storm

## Opis działania aplikacji

Aplikacja "Storm" to kompleksowa platforma marketplace, która umożliwia użytkownikom tworzenie, przeglądanie, edytowanie oraz usuwanie ogłoszeń. Dodatkowo, użytkownicy mogą dodawać ogłoszenia do ulubionych i zarządzać nimi. Aplikacja jest zbudowana przy użyciu Angulara na froncie oraz Spring Boot na backendzie.

---

## Instrukcja instalacji

### Wymagania systemowe
- Node.js w najnowszej wersji
- Angular CLI w najnowszej wersji
- Java 22
- Maven

Sklonuj repozytorium:
   ```sh
   git clone git@github.com:kr5ture-edu/lp-awrsp-2nd-2023-2024-assessment-project-gr-0.git
   ```
   ```sh
   cd lp-awrsp-2nd-2023-2024-assessment-project-gr-0
   ```

### Instalacja backendu

Przejdź do pliku `StormApplicationRunner` i uruchom aplikację

### Instalacja frontendu

1. Zainstaluj zależności:
   ```sh
   npm install
2. Uruchom aplikację:
   ```sh
   ng serve

### Konfiguracja bazy danych
Upewnij się, że masz uruchomioną bazę danych MySQL i skonfiguruj plik `application.yml` w katalogu `Storm-Spring/src/main/resources`, aby zawierał poprawne dane dostępowe do bazy danych.

```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/storm_db # URL do bazy danych MySQL
    username: # Nazwa użytkownika do dostępu do bazy danych
    password: # Hasło do dostępu do bazy danych
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: update
      properties:
        hibernate:
          format_sql: false
```
