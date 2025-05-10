// store/useMyStore.ts
import { create } from 'zustand';

type Article = {
  document_id: string;
  title: string;
  description: string;
  cover_image_url: string;
  category: string;
};

type ArticleStore = {
  article: Article | null;
  setArticle: (user: Article) => void;
  clearArticle: () => void;
};

const useArticleStore = create<ArticleStore>((set) => ({
  article: null,
  setArticle: (article) => set({ article }),
  clearArticle: () => set({ article: null }),
}));

export default useArticleStore;
