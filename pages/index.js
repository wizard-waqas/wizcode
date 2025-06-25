import GoalsSection from "../components/homepage/GoalsSection";
import SplashSection from "../components/homepage/SplashSection";
import AboutMeSection from "../components/homepage/AboutMeSection";
import FooterSection from "../components/homepage/FooterSection";

export default function Home() {
    return (
        <div className={"flex justify-center w-full"}>
            <div className={"flex flex-col items-center w-4/5"}>
                <SplashSection/>
                <GoalsSection/>
                <AboutMeSection/>
                <FooterSection/>
            </div>
        </div>
    )
}
