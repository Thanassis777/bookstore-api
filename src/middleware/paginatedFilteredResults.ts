import Book from '../models/Book';

function paginatedFilteredResults(model: typeof Book) {
   return async (req: any, res: any, next: any) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;

      const startIndex = (page - 1) * limit;
      const results: any = {};
      let query = null;

      const key = Object.keys(req.query)[0];
      const val = req.query[key!];
      const regexTest = new RegExp(val);

      if (key === 'title') query = { title: { $regex: regexTest, $options: 'i' } };
      if (key === 'publisher') query = { publisher: { $regex: regexTest, $options: 'i' } };
      if (key === 'rating') query = { rating: val };
      if (key === 'category') query = { category: val };
      if (key === 'author') query = { authors: { $elemMatch: { $regex: regexTest, $options: 'i' } } };

      try {
         results.results = await model.find(query!).limit(limit).skip(startIndex).exec();
         const counts = await model.find(query!).exec();
         res.paginatedResults = results;
         results.totalCount = counts.length;

         next();
      } catch (e: any) {
         res.status(500).json({ message: e.message });
      }
   };
}
export default paginatedFilteredResults;
