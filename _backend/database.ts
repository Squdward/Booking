import { IAuthor, IGoods, ITag, IToken, IUser } from "../@types/types";
import { mockAuthors, mockGoods, mockTags } from "./__mockData__/goods";

export class Database {
    private static readonly _database = {
      users: [] as IUser[],
      refreshTokens: [] as IToken[],
      goods: mockGoods as IGoods[],
      authors: mockAuthors as IAuthor[],
      tags: mockTags as ITag[],
    };
  
    static get<K extends keyof typeof Database['_database']>(name: K): typeof Database['_database'][K] {
      return this._database[name];
    }
  
    // static set<K extends keyof typeof Database['_database']>(name: K, value: typeof Database['_database'][K]): void {
    //   this._database[name] = value;
    // }
  
    static findOne<K extends keyof typeof Database['_database']>(name: K, func: (item: typeof Database['_database'][K][number]) => boolean): typeof Database['_database'][K][number] | undefined {
      return this._database[name].find(func);
    }
  
    static add<K extends keyof typeof Database['_database']>(name: K, value: typeof Database['_database'][K][number]): typeof Database['_database'][K][number] {
      this._database[name].push(value);
      
      // Возвращаем добавленный элемент
      return value;
    }
  
    static remove<K extends keyof typeof Database['_database']>(name: K, id: string): void {
      this._database[name] = this._database[name].filter((item: typeof Database['_database'][K][number]) => item.id !== id) as typeof Database['_database'][K];
    }
  
    static update<K extends keyof typeof Database['_database'], F extends keyof typeof Database['_database'][K][number]>(name: K, id: string | number, field: F, newData: Partial<typeof Database['_database'][K][number]>): void {
      const index = this._database[name].findIndex(item => item[field] === id);
      if (index !== -1) {
        this._database[name][index] = { ...this._database[name][index], ...newData };
      }
    }
  }
