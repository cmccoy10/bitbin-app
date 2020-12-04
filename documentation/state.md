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
        },
        currentUser: id
    },
    folders: {
        folderId: {
            id,
            name,
            pinned,
            isTrashBin,
            isRoot,
            ownerId,
            sharedUsers: [ids]
            parentId,
            children: [ids],
            previousParentId
        }
    },
    files: {
        fileId: {
            id,
            fileName,
            itemUrl,
            folderId,
            pinned,
            previousFolderId
        }
    },
    trashBin: {
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
