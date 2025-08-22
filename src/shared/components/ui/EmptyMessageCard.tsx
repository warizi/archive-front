import { Card, CardContent, CardDescription } from "./card";

interface EmptyMessageCardProps {
  className?: string;
  message?: string;
}

function EmptyMessageCard({
  className,
  message
}: EmptyMessageCardProps) {
  return (
    <Card className={className}>
      <CardContent>
        <CardDescription className="flex justify-center items-center text-xs">
          {message}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default EmptyMessageCard;
