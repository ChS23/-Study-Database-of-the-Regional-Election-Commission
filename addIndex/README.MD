# Добавление индексов в БД

## Добавление индекса в таблицу elections по столбцу election_date

Пример запроса: SELECT * FROM elections WHERE election_date >= CURDATE();
### До добавления индекса:
EXPLAIN PLAN:
| id | select\_type | table | partitions | type | possible\_keys | key | key\_len | ref | rows | filtered | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | SIMPLE | elections | null | ALL | null | null | null | null | 310 | 33.33 | Using where |

DIAGRAM EXPLAIN PLAN ANALYSE:

<img src="https://user-images.githubusercontent.com/131903787/235005299-98ab30b9-00bf-4bda-bef4-4e69562477b5.png" alt="explain plan analyse" style="width:30%">


PROFILING:
| Query\_ID | Duration | Query |
| :--- | :--- | :--- |
| 28 | 0.00006925 | /\* ApplicationName=DataGrip 2023.1.1 \*/ SET SQL\_SELECT\_LIMIT=DEFAULT |

### После добавления индекса
Код добавления индекса: 
```
create index elections_election_date_index
    on elections (election_date desc);
```
EXPLAIN PLAN:
| id | select\_type | table | partitions | type | possible\_keys | key | key\_len | ref | rows | filtered | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | SIMPLE | elections | null | range | elections\_election\_date\_index | elections\_election\_date\_index | 3 | null | 42 | 100 | Using index condition |


DIAGRAM EXPLAIN PLAN ANALYSE:

<img src="https://user-images.githubusercontent.com/131903787/235006630-1909be31-4e3c-4ebf-b9b5-a38727b513d1.png" alt="explain plan analyse" style="width:30%">


PROFILING:
| Query\_ID | Duration | Query |
| :--- | :--- | :--- |
| 67 | 0.00005025 | /\* ApplicationName=DataGrip 2023.1.1 \*/ SET SQL\_SELECT\_LIMIT=DEFAULT |


## Добавление индекса в таблицу candidates по столбцу birthday

Пример запроса: 

SELECT c.candidate_id, c.full_name, c.id_party, c.birthday, pp.name_party FROM candidates c join political_party pp on c.id_party = pp.party_id
where c.birthday >= '1980-01-01' and c.birthday <= '1990-01-01';

### До добавления индекса:
EXPLAIN PLAN:
| id | select\_type | table | partitions | type | possible\_keys | key | key\_len | ref | rows | filtered | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | SIMPLE | c | null | ALL | id\_party | null | null | null | 604 | 11.11 | Using where |
| 1 | SIMPLE | pp | null | eq\_ref | PRIMARY | PRIMARY | 4 | elections.c.id\_party | 1 | 100 | null |

DIAGRAM EXPLAIN PLAN ANALYSE:

<img src="https://user-images.githubusercontent.com/131903787/235008349-0d2dc600-59a8-4708-9b23-42baa131383a.png" alt="explain plan analyse" style="width:30%">


PROFILING:
| Query\_ID | Duration | Query |
| :--- | :--- | :--- |
| 377 | 0.000077 | /\* ApplicationName=DataGrip 2023.1.1 \*/ SET SQL\_SELECT\_LIMIT=DEFAULT |

### После добавления индекса
Код добавления индекса: 
```
create index candidates_birthday_index
    on candidates (birthday);
```
EXPLAIN PLAN:
| id | select\_type | table | partitions | type | possible\_keys | key | key\_len | ref | rows | filtered | Extra |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | SIMPLE | pp | null | ALL | PRIMARY | null | null | null | 9 | 100 | null |
| 1 | SIMPLE | c | null | ref | id\_party,candidates\_birthday\_index | id\_party | 5 | elections.pp.party\_id | 60 | 18.54 | Using where |

DIAGRAM EXPLAIN PLAN ANALYSE:

<img src="https://user-images.githubusercontent.com/131903787/235009777-171569b4-054a-4d0d-8182-081f30274351.png" alt="explain plan analyse" style="width:30%">

PROFILING:
| Query\_ID | Duration | Query |
| :--- | :--- | :--- |
| 1110 | 0.00007 | /\* ApplicationName=DataGrip 2023.1.1 \*/ SET SQL\_SELECT\_LIMIT=DEFAULT |
