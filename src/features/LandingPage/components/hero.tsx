import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/stores/auth-store';
import { SheetAddArticle } from '@/components/sheet-add-article';

export const HeroSection = () => {
  const { isAuthenticated } = useAuthStore();
  const [addArticleOpen, setAddArticleOpen] = useState(false);

  return (
    <div className="px-5 lg:px-7">
      <div className="flex flex-col pt-10 lg:items-center lg:flex-row sm:pt-20">
        <div className="font-albertSans">
          <h1 className="font-light tracking-tight text-7xl lg:text-8xl">
            Your Adventures{' '}
            <span className="block lg:mt-2">Deserve an Audience</span>
          </h1>
        </div>
        <div className="flex-1 mt-5 lg:mt-0">
          <div className="font-light lg:w-3/4 float-end font-albertSans">
            <p className="">
              Every journey leaves more than just footprints — it leaves behind
              stories, emotions, and unforgettable moments. TrailScript is where
              your adventures come to life, turning memories into meaningful
              stories to share with a world full of explorers.{' '}
              <span>{!isAuthenticated && 'New here?'}</span>
            </p>

            {isAuthenticated ? (
              <Button
                onClick={() => setAddArticleOpen(true)}
                className="px-6 mt-5 font-light tracking-wide text-white rounded-full bg-primary_2"
              >
                Begin Your Story
              </Button>
            ) : (
              <Button variant="link" className="p-0 italic" asChild>
                <Link to="/register">Join the adventure — Register Now!</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="py-20">
        <div
          className="w-full h-[400px] rounded-xl"
          style={{
            backgroundImage: "url('/hero-img2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <SheetAddArticle
        action="add"
        open={addArticleOpen}
        onOpenChange={setAddArticleOpen}
      />
    </div>
  );
};
