import type { NoteFolderWithIdPresent } from "@/entities/note";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";

interface NoteFolderBreadcrumbProps {
  currentFolder: NoteFolderWithIdPresent | null;
  folderList: NoteFolderWithIdPresent[];
  setCurrentFolder: (folder: NoteFolderWithIdPresent | null) => void;
}
function NoteFolderBreadcrumb({
  currentFolder,
  folderList,
  setCurrentFolder
}: NoteFolderBreadcrumbProps) {
  const path = findFolderPath(folderList, currentFolder);
  const { rootFolder, eclipsePath, prevLastPath, lastPath } = eclipsePathList(path);
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="cursor-pointer" onClick={() => setCurrentFolder(rootFolder)}>
            <span>{rootFolder.name}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {
          eclipsePath.length > 0 && (
            <BreadcrumbSeparator />
          )
        }
        {eclipsePath.length > 0 && (
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BreadcrumbEllipsis className="size-4" />
                <span className="sr-only">토글 메뉴</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {
                  eclipsePath.map(folder =>(
                    <DropdownMenuItem key={folder.id} onClick={() => setCurrentFolder(folder)}>
                      <span>{folder.name}</span>
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
        {
          prevLastPath && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="cursor-pointer" onClick={() => setCurrentFolder(prevLastPath)}>
                  <span>{prevLastPath.name}</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )
        }
        {
          lastPath && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="cursor-pointer" onClick={() => setCurrentFolder(lastPath)}>
                  <span>{lastPath.name}</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )
        }
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NoteFolderBreadcrumb;

function findFolderPath(folderList: NoteFolderWithIdPresent[], targetFolder: NoteFolderWithIdPresent | null): NoteFolderWithIdPresent[] {
  if (!targetFolder) return [];

  const path: NoteFolderWithIdPresent[] = [];
  let currentFolder: NoteFolderWithIdPresent | null = targetFolder;

  while (currentFolder) {
    path.unshift(currentFolder);
    currentFolder = folderList.find(folder => folder.id === currentFolder?.parentId) || null;
  }

  return path;
}

type EclipsePathListResult = {
  rootFolder: NoteFolderWithIdPresent;
  eclipsePath: NoteFolderWithIdPresent[];
  prevLastPath: NoteFolderWithIdPresent | null;
  lastPath: NoteFolderWithIdPresent | null;
}

function eclipsePathList(path: NoteFolderWithIdPresent[]): EclipsePathListResult {
  if (path.length === 1) {
    return {
      rootFolder: path[0],
      eclipsePath: [],
      prevLastPath: null,
      lastPath: null
    }
  }
  if (path.length <= 3) {
    return {
      rootFolder: path[0],
      eclipsePath: [],
      prevLastPath: path.length === 3 ? path[path.length - 2] : null,
      lastPath: path.length <= 3 ? path[path.length - 1] : null
    };
  } else {
    return {
      rootFolder: path[0],
      eclipsePath: path.slice(1, path.length - 2),
      prevLastPath: path[path.length - 2],
      lastPath: path[path.length - 1]
    };
  }
}