import GoalsSection from "../components/homepage/GoalsSection";
import SplashSection from "../components/homepage/SplashSection";
import AboutMeSection from "../components/homepage/AboutMeSection";
import FooterSection from "../components/homepage/FooterSection";

export default function Home() {
    return (
        <div>
            <SplashSection/>
            <GoalsSection/>
            <AboutMeSection/>
            <FooterSection/>
        </div>
    )
}
