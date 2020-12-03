# Bitbin Data Schema

## Users

| attribute name | data type    | details               |
| -------------- | ------------ | --------------------- |
| id             | integer      | primary key, not null |
| firstName      | varchar(50)  | not null              |
| lastName       | varchar(50)  | not null              |
| email          | varchar(255) | not null, unique      |
| hashedPassword | varchar      | not null, (binary)    |
| avatarUrl      | varchar      |                       |

## SharedFolders

| attribute name | data type    | details               |
| -------------- | ------------ | --------------------- |
| id             | integer      | primary key, not null |
| userId         | integer      | not null              |
| folderId       | integer      | not null              |

## Folders

| attribute name | data type    | details               |
| -------------- | ------------ | --------------------- |
| id             | integer      | primary key, not null |
| name           | varchar(50)  | not null              |
| pinned         | boolean      | not null              |
| ownerId        | integer      | not null              |
| isDefault      | boolean      | not null              |

## ParentFolders

| attribute name | data type    | details               |
| -------------- | ------------ | --------------------- |
| id             | integer      | primary key, not null |
| parentId       | integer      | not null              |
| childId        | integer      | nullable              |

## Files

| attribute name | data type    | details               |
| -------------- | ------------ | --------------------- |
| id             | integer      | primary key, not null |
| fileName       | varchar      | not null              |
| itemUrl        | varchar      | not null              |
| folderId       | integer      | not null              |
| pinned         | boolean      | not null              |

## DeletedItems

| attribute name | data type    | details               |
| -------------- | ------------ | --------------------- |
| id             | integer      | primary key, not null |
| userId         | integer      | not null              |
| fileId         | integer      | nullable              |
| folderId       | integer      | nullable              |
