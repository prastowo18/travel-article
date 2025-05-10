import _ from 'lodash';

import { useArticle } from '@/services/queries';

import { HeroSection } from './components/hero';
import { MyArticleSection } from './components/my-article';
import { LatestArticleSection } from './components/latest-article';

import type { ArticleType } from '@/type';

import { useAuthStore } from '@/stores/auth-store';

const LandingPage = () => {
  const { id, isAuthenticated } = useAuthStore();

  const articleQuery = useArticle({
    page: '1',
    pageSize: '50',
  });
  const { data, isLoading } = articleQuery;

  const sortData = () => {
    return data ? _.orderBy(data, ['createdAt'], ['desc']) : [];
  };
  const latestArticle: ArticleType[] = sortData().slice(0, 4);

  const myArticle = () => {
    if (isAuthenticated === null) {
      return [];
    } else {
      return !isLoading
        ? _.orderBy(
            _.filter(sortData(), (item) => item.user?.id === Number(id))
          )
        : [];
    }
  };

  return (
    <div className="">
      <HeroSection />
      <div className="pt-20 pb-20 bg-white lg:pt-32">
        <LatestArticleSection data={latestArticle} isLoading={isLoading} />
        <MyArticleSection data={myArticle()} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LandingPage;
