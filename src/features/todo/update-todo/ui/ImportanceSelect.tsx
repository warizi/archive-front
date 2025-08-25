import { IMPORTANCE } from "@/entities/todo";
import { Badge } from "@/shared/components/ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

interface ImportanceSelectProps {
  selectedImportance: string | undefined;
  onImportanceChange: (importance?: string) => void;
}

function ImportanceSelect({ selectedImportance, onImportanceChange }: ImportanceSelectProps) {

  const handleOnImportanceChange = (value: string) => {
    onImportanceChange(value);
  };

  return (
    <Select value={selectedImportance || ""} onValueChange={handleOnImportanceChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="중요도를 선택하세요."/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>중요도</SelectLabel>
          {selectedImportance && (
            <SelectItem
              value={undefined}
            >
              선택 안함
            </SelectItem>
          )}
          <SelectItem value={IMPORTANCE.low} >
            <Badge className="bg-emerald-300 px-3">낮음</Badge>
          </SelectItem>
          <SelectItem value={IMPORTANCE.medium}>
            <Badge className="bg-yellow-300 px-3">보통</Badge>
          </SelectItem>
          <SelectItem value={IMPORTANCE.high}>
            <Badge className="bg-red-300 px-3">높음</Badge>
          </SelectItem>
        </SelectGroup>
    </SelectContent>
  </Select>
)};

export default ImportanceSelect;