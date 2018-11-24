import Router from 'koa-router';
import axios from 'axios';
import naverAPIInfo from '../naver-api-info';

const router = new Router();
router
  .get('/', async (ctx) => {
    await ctx.render('home', 'test data');
  })
  .get('naver-search-news', async (ctx) => {
    const { clientID, clientSecret } = naverAPIInfo;

    // const searchText = encodeURI(ctx.request.body.query);
    const searchText = encodeURI('네이버 가고 싶다');
    const apiURL = `https://openapi.naver.com/v1/search/news?query=${searchText}`;
    const options = {
      headers: {
        'X-Naver-Client-Id': clientID,
        'X-Naver-Client-Secret': clientSecret,
      },
    };

    const naverSearchResult = await axios.get(apiURL, options);
    console.log(naverSearchResult.data);
  });

export default router;
