import Typography from "@/app/_components/typography/typography"
import { Card, CardContent } from "@/app/_components/ui/card"

interface RoleCardProps {
    text: string;
    value: string
}

const RoleCard: React.FC<RoleCardProps> = ({ text, value }) => {
    return <Card className="rounded-2xl w-full bg-[#F1F5F7]">
        <CardContent className="flex justify-between h-[77px] items-center p-6">
            <Typography className="text-[#5C698A] font-medium">
                {text}
            </Typography>
            <Typography className="text-[#141923] text-2xl">
                {value}
            </Typography>
        </CardContent>
    </Card>
}

export default RoleCard;