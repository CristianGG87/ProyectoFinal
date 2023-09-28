import { useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
function Acordeon({ children }) {
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => {
        setShowForm(!showForm);
    };
    return (
        <div>
            <button className="acordeon" onClick={toggleForm}>
                <IconMenu2 className="menu-button" />
            </button>
            {showForm && children}
        </div>
    );
}
export default Acordeon;
