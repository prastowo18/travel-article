import { HeroSection } from './components/hero';
import { LatestArticleSection } from './components/latest-article';
import { MyArticleSection } from './components/my-article';

const LandingPage = () => {
  // const { isAuthenticated } = useAuthStore();

  return (
    <div className="">
      <HeroSection />
      <div className="pt-20 pb-20 bg-white lg:pt-32">
        <LatestArticleSection />
        <MyArticleSection />
      </div>
    </div>
  );
};

export default LandingPage;
