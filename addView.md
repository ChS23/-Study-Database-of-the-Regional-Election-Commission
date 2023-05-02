## 1. Представление для получения результатов поседних выборов, включая количество голосов, которое получил каждый кандидат, и процентное соотношение голосов
```
create view latest_election_results as
select
    c.full_name name,
    cte.number_of_votes votes,
    cte.number_of_votes / (
        select sum(number_of_votes)
        from candidates_to_elections
        where id_election = (
            select election_id
            from elections
            where election_date = (
                select max(election_date)
                from elections
                where election_date < curdate()
            )
        )
    ) * 100 percentage
from candidates c
join candidates_to_elections cte ON c.candidate_id = cte.id_candidate
join elections e ON cte.id_election = e.election_id
where e.election_date = (
    select MAX(election_date)
    from elections
    where election_date < CURDATE()
)
order by votes desc;
```
### Результат
| name | votes | percentage |
| :--- | :--- | :--- |
| Скворцов Тимофей Ярославович | 237 | 5.1769 |
| Иванова Кира Ильинична | 233 | 5.0896 |
| Калинина Ольга Романовна | 223 | 4.8711 |
 ...
| Максимова Вероника Константиновна | 35 | 0.7645 |
| Верещагина Алиса Ивановна | 34 | 0.7427 |
| Колпаков Андрей Сергеевич | 34 | 0.7427 |

## 2. Представление для получения списков избирателей на последних выборах с отметкой их посещения, группированное по участкам
```
create view last_election_voters_is_plot as
select
    p.number plot,
    v.full_name name,
    v.registration_address address,
    coalesce(vte.presence, 0) attendance
from plots p
left join voters v on p.plot_id = v.id_plot
left join voters_to_elections vte on v.voter_id = vte.id_voter
    and vte.id_election = (
        select election_id
        from elections
        where election_date = (
            select max(election_date)
            from elections
            where election_date < curdate()
        )
    )
order by plot, name;
```
### Результат
```
select name, address, attendance from last_election_voters_is_plot where plot = 393338
```
| name | address | attendance |
| :--- | :--- | :--- |
| Агафонова Александра Павловна | Камышин, улица Пионерская, дом 49, квартира 67 | 0 |
| Агафонова Ульяна Максимовна | Фролово, улица Первомайская, дом 99, квартира 24 | 0 |
| Аксенов Андрей Дмитриевич | Волгоград, улица Парковая, дом 75, квартира 53 | 0 |
...
| Шубин Демид Михайлович | Дубовка, улица Красноармейская, дом 98, квартира 28 | 0 |
| Шувалова Мария Васильевна | Камышин, улица Октябрьская, дом 56, квартира 27 | 0 |
| Яковлева Диана Алексеевна | Средняя Ахтуба, улица Победы, дом 29, квартира 111 | 0 |
