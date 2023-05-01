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

## 2. Функция для форматирования даты в нужном формате 01.02.3000 -> 3000-02-01
```
delimiter //
create function dateFormat(stringDate varchar(10))
returns date
deterministic
begin
    if not regexp_like(stringDate, '^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$')
        then signal sqlstate '45000' set message_text = 'Строка неверного формата';
    end if;

    return str_to_date(stringDate, '%d.%m.%Y');
end//
```

### Тестирование
```
set @stringDate = '01.01.2033';
select dateFormat(@stringDate) as date;
```
| date |
| :--- |
| 2033-01-01 |

```
set @stringDate = '01.01.233';
select dateFormat(@stringDate) as date;
```
| [45000][1644] Строка неверного формата |
| :--- |

## 3. Функция для вычисления общего количество голосовавших
```
delimiter //
create function getCountVotersElection(electionId int)
returns integer
reads sql data
begin
    declare countVoters integer default null;

    select sum(cte.number_of_votes) into countVoters
    from candidates_to_elections cte
    where id_election = electionId;

    if countVoters is null
        then signal sqlstate '45000' set message_text = 'Выборов с таким id не найдено';
    else
        return countVoters;
    end if;
end //
```
### Тестирование
```
set @electionId = 124;
select getCountVotersElection(@electionId) voters;
```
| voters |
| :--- |
| 4469 |
```
set @electionId = 23343;
select getCountVotersElection(@electionId) voters;
```
| [45000][1644] Выборов с таким id не найдено |
| :--- |

## 4. Функция для проверки участия кандидата в определённых выборах
```
delimiter //
create function isCandidateInElection(candidateId int, electionId int)
returns bool
reads sql data
begin
    if (select count(*) from candidates_to_elections where id_candidate = candidateId and id_election = electionId) > 0
        then return true;
    else
        return false;
    end if;
end //
```
### Тестирование
```
set @candidateId = 130;
set @electionId = 124;
select isCandidateInElection(@candidateId, @electionId) isCandidateInElection;
```
| isCandidateInElection |
| :--- |
| 1 |

```
set @candidateId = 124;
set @electionId = 124;
select isCandidateInElection(@candidateId, @electionId) isCandidateInElection;
```
| isCandidateInElection |
| :--- |
| 0 |


## 5. Функция для поиска выборов
```
delimiter //
create function searchElectionsByName(name varchar(250))
returns varchar(250)
reads sql data
begin
    declare string varchar(250) default null;
    select name_of_the_election into string
    from elections
    where name_of_the_election like concat('%', name, '%') or name_of_the_election like concat(name, '%') or name_of_the_election like concat('%', name)
    limit 1;

    if string is not null
        then return string;
    else signal sqlstate '45000' set message_text = '404 - не найдено';
    end if;
end //
```
### Тестирование
```
set @name = 'Мда';
select searchElectionsByName(@name) name;
delimiter ;
```
| [45000][1644] 404 - не найдено |
| :--- |
```
set @name = 'Котовск';
select searchElectionsByName(@name) name;
```
| name |
| :--- |
| Досрочные выборы депутатов Котовского района |
