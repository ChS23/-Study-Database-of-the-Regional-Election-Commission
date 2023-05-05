## 1. Сохранять последние 10 удалённых выборов.
```
create trigger backup_elections
after delete on elections.elections
for each row
begin
    declare backup_count int;
    select count(elections_backup.backup_id) into backup_count from elections.elections_backup;
    if backup_count >= 10 then
        delete from elections_backup order by backup_at limit 1;
    end if;
    insert into elections_backup (election_id, name_of_the_election, election_date, number_of_deputy_mandates, id_public_legal_entitie, backup_at)
    select OLD.election_id, OLD.name_of_the_election, OLD.election_date, OLD.number_of_deputy_mandates, OLD.id_public_legal_entitie, current_timestamp;
end;
```
Тестирование:
```
delete from elections where election_id = 123;
```
Состояние таблицы elections_backup
| election\_id | name\_of\_the\_election | election\_date | number\_of\_deputy\_mandates | id\_public\_legal\_entitie | backup\_at | backup\_id |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 123 | Выборы депутатов Фроловского района | 2022-12-16 | 14 | 20069 | 2023-05-05 15:41:22 | 1 |
