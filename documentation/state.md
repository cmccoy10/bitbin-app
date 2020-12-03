```js
{
    authentication: {
        token: token
    },
    users: {
        userId: {
            id,
            firstName,
            lastName,
            avatarUrl
        }
    },
    folders: {
        folderId: {
            id,
            name,
            pinned,
            isDefault,
            ownerId,
            sharedUsers: [ids]
            parentId,
            children: [ids]
        }
    },
    files: {
        fileId: {
            id,
            fileName,
            itemUrl,
            folderId,
            pinned
        }
    },
    deletedItems: {
        files: {
            fileId: {
                id,
                userId
            }
        },
        folders: {
            folderId: {
                id,
                userId
            }
        }
    }
}
```


Order of Migrations

Users - without bottom foreign keys
Folders
ParentFolders
SharedFolders
Files

Add 2 Columns for Users table after

Cascade on Delete for Folders
