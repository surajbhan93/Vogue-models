interface Props {
    status: string;
}

export default function StatusBadge({ status }: Props) {
    const color = {
        active: "bg-green-500",
        pending: "bg-yellow-500",
        suspended: "bg-red-500",
        inactive: "bg-gray-500",
    }[status] || "bg-blue-500";

    return (
        <span className={`${color} text-white px-3 py-1 rounded-full text-xs`}>
            {status}
        </span>
    );
}