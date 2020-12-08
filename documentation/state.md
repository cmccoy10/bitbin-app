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
            avatarUrl,
            trashBinId,
            personalFolderId
        },
        currentUser: id
    },

    folders: {
        folderId: {
            id,
            name,
            pinned,
            ownerId,
            sharedUsers: [ {userId:id, userName: name} ],
            parentId,
            previousParentId
        }
    },

    currentFolder: id,

    breadcrumbs: [ {folderId: id, folderName: name} ],

    files: {
        fileId: {
            id,
            fileName,
            itemUrl,
            folderId,
            pinned,
            previousFolderId,
        }
    },
}
```
