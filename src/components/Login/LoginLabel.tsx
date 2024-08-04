import React from "react";

interface LoginLabelProps {
    id: string;
};

const LoginLabel: React.FC<LoginLabelProps> = ({ id }) => {
    return (
        <label htmlFor={id} className="absolute top-0.5 text-darkblue text-xl">   
            {id}
         </label>
         )
};

export default LoginLabel;
