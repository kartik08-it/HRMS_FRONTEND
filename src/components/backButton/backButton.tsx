import { useNavigate } from "react-router-dom";
import { BackIcon } from "../icons/icons";


interface BackButtonProps {
    label?: string;
}

const BackButton = ({ label }: BackButtonProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(-1)}
            role="button"
            className="flex items-center gap-2 text-gray-500 hover:text-black transition cursor-pointer mt-2 mb-2 select-none"
        >
            <BackIcon size={20} />
            {label && <span className="text-sm">{label}</span>}
        </div>
    );
};

export default BackButton;