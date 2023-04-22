# Тема курсовой работы: База данных областной избирательной комиссии
Репозиторий "База данных областной избирательной комиссии" содержит код и файлы проекта, разработанного в рамках курсовой работы.

Проект включает в себя разработанную базу данных и веб-приложение для управления ею. База данных создана для областной избирательной комиссии и содержит информацию о избирателях, кандидатах, участках и результатах голосования (подробнее на схеме ниже).

Backend реализован на языке программирования [C#](https://dotnet.microsoft.com/en-us/languages/csharp) с использованием [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) и [MySqlConnector](https://mysqlconnector.net/) для взаимодействия с БД. Клиентская часть реализована на [React.JS](https://react.dev/) с использованием [MobX](https://mobx.js.org/README.html) для управления состоянием приложения, [TailwindCSS](https://tailwindcss.com/) для стилизации пользовательского интерфейса и [Vite](https://vite-docs-ru.vercel.app/), как инструмент сборки.

## Код
### [Backend](App/Backend/ElectionBack/ElectionBack)
### [Frontend](App/Client/ElectionClient)

## TODO
### Backend
-[X] Реализовать связь с таблицей Candidates
-[X] Реализовать связь с таблицей Elections
  -[ ] Изменить схему возвращаемого формата ElectionsTable
-[X] Реализовать аналитические запросы

## Приложение
ER-диаграмма               | Реляционная схема
:-------------------------:|:-------------------------:
![er](https://user-images.githubusercontent.com/63536056/233777829-98685fc0-6b44-48d3-aba5-1a2929353ff5.png)|![relational_schema](https://user-images.githubusercontent.com/63536056/233777865-eba06628-5db3-4936-ba36-9ecec6dc43b1.png)

Реляционная схема сгенерированная в DataGrip
:---------------------------------------------:
![image](https://user-images.githubusercontent.com/63536056/233778047-d79873e9-dd8d-474d-b0a6-2e52ec1c964b.png)

Дизайн приложения
:---------------------------------------------:
![Frame 1](https://user-images.githubusercontent.com/63536056/229291617-7175c379-7a77-4542-adc6-fc505d74a7f0.jpg)
![Frame 2](https://user-images.githubusercontent.com/63536056/229291625-9581ed89-079e-4129-be35-5e619b0ab9de.jpg)
![Frame 3](https://user-images.githubusercontent.com/63536056/229291641-92121be2-ec5c-4ae5-a70c-e3baa7add310.jpg)
