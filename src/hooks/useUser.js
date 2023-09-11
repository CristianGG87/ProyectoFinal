import { useEffect, useState } from "react"

const useUser = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
            } catch (error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
            loadUser();
        }
    })

    return {user, loading, error}
}

export default useUser;