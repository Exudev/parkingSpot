import { useState } from "react"

interface User {
  id: string;
  Email: string;
  Password: string;
  UserType: string;
}
export const User = () => {
  const [user, setUser] = useState();
  return (
    <div>
      <h3> User: useState</h3>

      <button className="btn">

      </button>
    </div>
  )
}
