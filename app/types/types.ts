export type Category = {
  name: string;
  id: string;
};

export type RepParams = {
  date: string;
  filterText: string;
  categoryId: string;
};

export type Journal = {
  title: string;
  content: string;
  categoryId: string;
  date: Date;
  category?: Category;
  id?: number;
};
