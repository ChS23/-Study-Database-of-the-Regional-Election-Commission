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
