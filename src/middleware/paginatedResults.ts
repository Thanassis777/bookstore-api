import Book from '../models/Book';

function paginatedResults(model: typeof Book) {
   return async (req: any, res: any, next: any) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results: any = {};

      if (endIndex < (await model.countDocuments().exec())) {
         results.next = {
            page: page + 1,
            limit: limit,
         };
      }

      if (startIndex > 0) {
         results.previous = {
            page: page - 1,
            limit: limit,
         };
      }
      try {
         results.totalCount = await model.countDocuments().exec();
         results.results = await model.find().limit(limit).skip(startIndex).exec();
         res.paginatedResults = results;
         next();
      } catch (e: any) {
         res.status(500).json({ message: e.message });
      }
   };
}
export default paginatedResults;
