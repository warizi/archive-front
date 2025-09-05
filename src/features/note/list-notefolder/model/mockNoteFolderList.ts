import type { NoteFolderWithIdPresent } from "@/entities/note";

export const MOCK_NOTE_FOLDER_LIST: NoteFolderWithIdPresent[] = [
  {
    id: 1,
    parentId: null,
    name: "Folder 1",
    description: "This is folder 1",
    path: "root",
    depth: 0,
    sortOrder: 1,
    child: []
  },
  {
    id: 2,
    parentId: null,
    name: "Folder 2",
    description: "This is folder 2",
    path: "root",
    depth: 0,
    sortOrder: 2,
    child: [
      {
        id: 3,
        parentId: 2,
        name: "Folder 3",
        description: "This is folder 3",
        path: "root/Folder 2",
        depth: 1,
        sortOrder: 3,
        child: [
          {
            id: 8,
            parentId: 3,
            name: "Folder 8",
            description: "This is folder 8",
            path: "root/Folder 2/Folder 3",
            depth: 2,
            sortOrder: 4,
            child: []
          },
        ]
      },
      {
        id: 4,
        parentId: 2,
        name: "Folder 4",
        description: "This is folder 4",
        path: "root/Folder 2",
        depth: 1,
        sortOrder: 4,
        child: []
      },
    ]
  },
  {
    id: 5,
    parentId: null,
    name: "Folder 5",
    description: "This is folder 5",
    path: "root",
    depth: 0,
    sortOrder: 5,
    child: [
      {
        id: 6,
        parentId: 5,
        name: "Folder 6",
        description: "This is folder 6",
        path: "root/Folder 5",
        depth: 1,
        sortOrder: 6,
        child: [
          {
            id: 7,
            parentId: 6,
            name: "Folder 7",
            description: "This is folder 7",
            path: "root/Folder 5/Folder 6",
            depth: 2,
            sortOrder: 7,
            child: []
          },
        ]
      },
    ]
  },
]

export const MOCK_FLAT_FOLDER_LIST: NoteFolderWithIdPresent[] = [
  { id: 1, parentId: null, name: "Folder 1", description: "This is folder 1", path: "root", depth: 0, sortOrder: 1, child: [] },
  { id: 2, parentId: null, name: "Folder 2", description: "This is folder 2", path: "root", depth: 0, sortOrder: 2, child: [] },
  { id: 3, parentId: 2,    name: "Folder 3", description: "This is folder 3", path: "root/Folder 2", depth: 1, sortOrder: 3, child: [] },
  { id: 4, parentId: 2,    name: "Folder 4", description: "This is folder 4", path: "root/Folder 2", depth: 1, sortOrder: 4, child: [] },
  { id: 5, parentId: null, name: "Folder 5", description: "This is folder 5", path: "root", depth: 0, sortOrder: 5, child: [] },
  { id: 6, parentId: 5,    name: "Folder 6", description: "This is folder 6", path: "root/Folder 5", depth: 1, sortOrder: 6, child: [] },
  { id: 7, parentId: 6,    name: "Folder 7", description: "This is folder 7", path: "root/Folder 5/Folder 6", depth: 2, sortOrder: 7, child: [] },
]