---
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
style: |
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
---

![bg left:40% 80%](/home/athan/Pictures/3nb.png)

# Foundations of Databases

SSgt Clark, Athan L

_Presented on 20251204_

---

## Outline

1. Introduction
2. Definitions
3. Example Databases
4. Relational Databases
    1. Create, Read, Update, Delete
5. Structured Query Language
    1. Indexes
    2. Relations
    3. Defaults and Constraints

---

## Outline

6. Advanced Concepts
    1. Events and Triggers
    2. Views and Joins
    3. Sub-Queries
    4. Stored Procedures
    5. Transactions and Atomicity
7. Security Implications
8. Conclusion

---

![bg left:40% 80%](/home/athan/Pictures/foundations.jpg)

## Introduction

> In a nutshell, a database management system is a software system that enables the creation, maintenance, and use of large amounts of data.

Involve **Diverse Concepts**: Storage Paradigms, Language Models, Precision, Concurrency, Ability to Scale



<!--

Note that it mostly involves stored data. The advent of filesystems (1970's / 80's) changed the paradigm for how database systems should operate.

Databases involve diverse concepts - logical paradigm, query language model, precision, support for concurrency and atomics

-->

---

## Definitions

- Database vs. Database Management System
- Query ~ _"Question"_ or _"Do This"_
- Key / Index ~ Unique Identifier - EDIPI, Item Instance Number
- String, Integer / Floating Point Number, Boolean
    - `"Johnny B."`, `1775` / `5.56`, `FALSE`
- Tuple, Array, Dictionary
    - `("one", 2, 3.15)`, `["Dan Daly", "Smedly Butler"]`, `{ edipi: 12345678, name: "Schmukatelli" }`

<!--

- Query is a means to interact with a database, executed by a DBMS
- Key / Index - uniquely identifies something, can be used to search (EDIPI)
- String (list of characters)
- Tuple (fixed set of different types of things), Array (dynamic set of the same type of thing)
- Table := array of tuples. Columns are different types of things, rows are entries in an array of those tuples

-->

---

## Definitions

- Table, Column, Row

| EDIPI | Name |
| :--- | :---- |
| 1553763807 | `"Clark SSgt Athan L"` |
| 5 | `"Henderson BGen Archibald"` |

| Payment Method | Time | Amount |
| :--- | :---- | ----: |
| VISA1234 | 00:00:00 | $5.00 |
| VISA1234 | 12:11:34 | $7.62 |

---

## Definitions

- Table, Column, Row
```js
[
  (1553763807, "Clark SSgt Athan L"),
  (5, "Henderson BGen Archibald")
]
```

---

## Example Databases

Types of Databases

- Key / Value
- Relational
- Unstructured
- Graph
- Time-Domain

---

## Example Databases - Key / Value

$$ k \hookrightarrow v $$
$$ k \hookrightarrow (v1, v2, v3) $$

> A Value or Tuple of Values **Uniquely Identified** by Some Key

<dl>
<dt>Implementations</dt>
<dd>Redis, Memcached, In-Memory (HashMap, BTree)</dd>
<dt>Features</dt>
<dd>Extremely Fast, Easy to Parallelize (Scalable)</dd>
<dt>Examples</dt>
<dd>Facebook Messanger, Session Cache</dd>
</dl>

<!-- Very High Performance, Scalable (clusters of DBs) -->

---

## Example Databases - Relational

```erd
[Person]
*name
+birth_place_id

[`Birth Place`]
*`birth city`

Person *--1 `Birth Place`
```

> A Table of Values & Keys **Referenced** By Other Tables

<dl>
<dt>Implementations</dt>
<dd>SQL-based; PostgreSQL, MySQL, MSSQL, OracleDB</dd>
<dt>Features</dt>
<dd>Still Pretty Fast, Forces Data Consistency</dd>
<dt>Examples</dt>
<dd>Blogs, Inventory Management Software, General Purpose</dd>
</dl>

<!-- Performant, demands data-consistency -->

---

### Example Databases - Unstructured

```js
[
  { serial: "1234", nomen: "TRC-209", color: "Green" },
  { serial: 2TKA1234, nomen: "Warfighting Laptop", weight: 1 },
]
```

> Collections of Data Blobs

<dl>
<dt>Implementations</dt>
<dd>MongoDB, Cassandra, DynamoDB</dd>
<dt>Features</dt>
<dd>Scalable, Flexible for Growing Projects</dd>
<dt>Examples</dt>
<dd>Startups, When Final Requirements Aren't Certain</dd>
</dl>

<!-- 

Losing some performance, Flexible, But still Scalable - only as fast as how much hardware you throw at it

Useful for startups - not sure what final requirements are

-->

---

### Example Databases - Graph

```dot
digraph D {
  rankdir=LR
  A -> B
  A -> C
  C -> B
  C -> D
  D -> A
  D -> B
  B -> B
}
```

> Nodes and Edges

<dl>
<dt>Implementations</dt>
<dd>Neo4J, SurrealDB</dd>
<dt>Features</dt>
<dd>Scalable, Flexible for Growing Projects, Queries that Follow Edges</dd>
<dt>Examples</dt>
<dd>"People you Might Know", Ancestry</dd>
</dl>

<!--

Useful for complicated relationships between entities - "List everyone's second cousin from this list of people"

-->

---

## Example Databases - Time-Domain

$$ \mathrm{🕑\enspace} \hookrightarrow (v1, v2, v3, v4) $$
$$ \mathbb{R} \hookrightarrow (v1, v2, v3, v4) $$

> Optimized for Time-Based Queries

<dl>
<dt>Implementations</dt>
<dd>TimescaleDB, ElasticSearch</dd>
<dt>Features</dt>
<dd>Depends on Underlying Implementation</dd>
<dt>Examples</dt>
<dd>Stock Tickers, Log / Event Queues</dd>
</dl>

<!--

Stock tickers, log / event queues

-->

---

## Our Focus - Relational Databases

- Widely Used
- Flexible
- Definite
- Fast

Most Popular Query Language:
**S**tructured **Q**uery **L**anguage (SQL)

---

## Thinking about Data

- Creating Data
- Reading Data
- Updating Data
- Deleting Data

_"CRUD"_

---

## Thinking about Data - In SQL

- Creating Data := `INSERT`
- Reading Data := `SELECT`
- Updating Data := `UPDATE`
- Deleting Data := `DELETE`

_"CRUD"_

---

## Thinking about Data - In SQL

- Creating Data := `INSERT`
- Reading Data := `SELECT`
- Updating Data := `UPDATE`
- Deleting Data := `DELETE`

_"CRUD"_

> Only applies to an existing Table - SQL also permits creating tables, modifying tables, dropping them, etc.

---

# LIVE EXAMPLE

---

## SQL

- Storage, Modification, Retreival
    - Create, Read, Update, Delete
- Organization, Relationships, Laws
    - Table Design, Indexes / Foreign Keys, Constraints, Defaults

<!--

We saw how storage, modification, and retrieval work in SQL by using those statements - note that
they only make sense in context of a specific table.

SQL also permits creation, modification, and deletion of tables as well. Also, the ability to make tables
have "constraints" - uniqueness requirements, conditions, stuff like that. Also default values. Lastly,
the concept of a "foreign key" - meaning that a value can actually reference a key in another table.

-->

---

## SQL - Table Design

| Name | Rank | Favorite Color |
| :--- | :--- | :--- |
| Chesty Puller | MajGen | Green |
| Opha May Johnson | Sgt | |
| Carlos Hathcock | GySgt | Red |

---

## SQL - Table Design - Add Column

| Name | Rank | Favorite Color | Gender |
| :--- | :--- | :--- | :--- |
| Chesty Puller | MajGen | Green | M |
| Opha May Johnson | Sgt | | F |
| Carlos Hathcock | GySgt | Red | M |

Constraints: Gender = _**Not Null**_

---

## SQL - Table Design - Modify Column

| Name | Rank | Favorite Color | Gender |
| :--- | :--- | :--- | :--- |
| Chesty Puller | MajGen | Green | M |
| Opha May Johnson | Sgt | Blue | F |
| Carlos Hathcock | GySgt | Red | M |

Favorite Color Default = _**Blue**_

---

## SQL - Table Design - Drop Column

| Name | Rank | Gender |
| :--- | :--- | :--- |
| Chesty Puller | MajGen | M |
| Opha May Johnson | Sgt | F |
| Carlos Hathcock | GySgt | M |

---

## SQL - Indexes

| EDIPI | Name | Rank | Gender |
| :--- | :--- | :--- | :--- |
| 1775 | Chesty Puller | MajGen | M |
| 1918 | Opha May Johnson | Sgt | F |
| 762 | Carlos Hathcock | GySgt | M |

Indexes *Must* be Unique

---

## SQL - Foreign Keys

<div class="columns">
<div>
Marines:

<small>

| EDIPI | Name | Rank | Gender |
| :--- | :--- | :--- | :--- |
| 1775 | Chesty Puller | MajGen | M |
| 1918 | Opha May Johnson | Sgt | F |
| 762 | Carlos Hathcock | GySgt | M |

</small>
</div>
<div>
Awards:

<small>

| EDIPI | Award |
| :--- | :--- |
| 1775 | Navy Cross |
| 1775 | Navy Cross |
| 1775 | Navy Cross |
| 1775 | Navy Cross |
| 1775 | Navy Cross |

</small>
</div>
</div>

"Awards EDIPI" is a Foreign Key to "Marines EDIPI"

---

# LIVE EXAMPLE

---

## SQL - Defaults

- Default MCCU Size is "M/M"
- Default Time that Leave Request Was Submitted is "Now"
- Default Instance Number or Service Request Number is "The Next One" (increment)

---

## SQL - Constraints

- Uniqueness Constraints (without being an index)
- Boundary Constraints
  - all Marines' heights must be greater than 0
- General Purpose and Programmable
  - I can't create a service request at 02 Urgent if its operational status is "Operational - Minor"

---

## Advanced Concepts

1. Events and Triggers
2. Views and Joins
3. Sub-Queries
4. Stored Procedures
5. Transactions and Atomicity

---

## Events and Triggers

> You can make a query run when something happens to a table

- Prevent a deletion of a row if some criteria is met
- Modify rows in another table if a row is created
- Destroy the entire database if my payroll hasn't been updated in 1 month (logic bomb)

---

## Views and Joins

> The ability to create partial view of a table or combine data from different tables

- Much higher performance than running multiple queries (important for large datasets like GCSS-MC)
- Useful for making code coherent

---

## Sub-Queries

> Use the results of another query without having to execute it first

_"Select all Marines who have done their height and weight this semi-annual period"_
- one table for all Marines, another table for recorded HT/WT scores

---

## Stored Procedures

> SQL is not a "Turing Complete" programming language

SQL Can't create arbitrary programs that run forever on its own, but some people are crazy and want that ability in a database

Examples: PL/SQL (Oracle), T-SQL (Microsoft), PL/pgSQL (PostgreSQL)

<dl>
<dt>Pros</dt>
<dd>Do anything inside your database</dd>
<dt>Cons</dt>
<dd>Hard to Debug, No Version-Control</dd>

---

## Transactions and Atomicity

> Ability to run Multiple Queries at the same time that affect the same dataset without corruption

Multiple Queries running at the same time can cause a race condition

Atomic Transactions fix this, where conflicting datasets are locked if they're being modified

---

## Security Implications

- How passwords are stored
- Actually deleting important rows of data with no backup method
- Session tokens are often stored in a session table - enables session hijacking

<!---

People that create computer programs actually just kinda do it - sure they get inspected most of the time by
other people, but they can be dumb.

-->

---

## Conclusion

> Databases are designed to retain, access, and manipulate large amounts of data quickly and preserve them indefinitely.

SQL is a decent solution to those problems, and is very popular. You'll likely see it sometime in your professional career.

---

# Questions / Comments
