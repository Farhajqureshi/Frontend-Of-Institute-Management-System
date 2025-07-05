import { Outlet } from "react-router"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      <Header/>
      <main className="m-[300px]">
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  )
}

export default App