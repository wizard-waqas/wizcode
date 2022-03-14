import GoalsSection from "../components/GoalsSection";
import Navbar from "../components/Navbar";
import SplashSection from "../components/SplashSection";

export default function Home() {
    return (
        <div>
            <Navbar/>
            <SplashSection/>
            <GoalsSection/>
        </div>
    )
}
