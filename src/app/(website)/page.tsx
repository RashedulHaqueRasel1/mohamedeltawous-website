import Banner from "@/features/Home/component/Banner";
// import HowItWorks from "@/features/Home/component/HowItWorks";
import MeetSecondSight from "@/features/Home/component/MeetSecondSight";
import StartExploring from "@/features/Home/component/StartExploring";
import Strategic from "@/features/Home/component/Strategic";
import StrategicDecisions from "@/features/Home/component/StrategicDecisions";
import SupportSection from "@/features/Home/component/SupportSection";
import TestimonialSection from "@/features/Home/component/Testimonials";
export default function page() {
  return (
    <div className="">
      <Banner />
      <Strategic />
      <MeetSecondSight />
      {/* <HowItWorks /> */}
      <TestimonialSection />
      <StrategicDecisions />
      <StartExploring />
      <SupportSection />
    </div>
  );
}
