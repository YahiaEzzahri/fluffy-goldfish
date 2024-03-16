import { Link } from "react-router-dom"
import App from "./App"

const routes =  [
    {
      path: "/",
      element: <App></App>
    },
    {
      path: "/auth",
      children : [
        {
          path: "/auth/login",
          element: <div>Hello login! <Link to={"/exercice1"}>exo1</Link> </div>
        },
      ]
    },
    {
      path: "/exercice1",
      element: <App></App>
    }
  ]

export default routes