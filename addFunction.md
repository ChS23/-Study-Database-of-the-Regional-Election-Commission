## 1. Функция, которая отображает имя кандидата, который набрал максимальное количество голосов на определённых выборах
```
delimiter //
create function get_candidate_max_votes_in_election(election_id int)
returns varchar(50)
reads sql data
begin
    declare candidate varchar(50) default null;

    select c.full_name into candidate
    from candidates_to_elections cte
    inner join candidates c on cte.id_candidate = c.candidate_id
    where cte.id_election = election_id
    group by c.full_name, cte.number_of_votes
    order by cte.number_of_votes desc
    limit 1;

    if candidate is not null then return candidate; else return 'Выборы не найдены'; end if;
end //
delimiter ;
```

### Тестирование
```
set @election_id = 124;
select get_candidate_max_votes_in_election(@election_id) as result;
```
Результат
| result |
| :--- |
| Киреев Илья Артёмович |

```
set @election_id = 3453454;
select get_candidate_max_votes_in_election(@election_id) as result;
```
Результат
| full\_name |
| :--- |
| Выборы не найдены |
