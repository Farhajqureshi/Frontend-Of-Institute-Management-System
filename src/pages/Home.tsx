import LendingPage from "../components/LendingPage"
import AboutPage from "./About"
import Contact from "./Contect"
import Courses from "./Courses"
import Gallery from "./Gallary"

const Home = () => {
    return (
        <main>
            <LendingPage></LendingPage>
            <AboutPage></AboutPage>
            <Courses></Courses>
            <Gallery></Gallery>
            <Contact></Contact>
        </main>
    )
}

export default Home