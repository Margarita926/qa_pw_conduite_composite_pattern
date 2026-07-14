import {test} from '../../_fixtures/fixtures';

test(`Create new comment without body field`, async ({
  registeredUser,
  articlesApi,
  commentsApi,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;

  const response = await articlesApi.createArticle(
    article,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  const comment = {};

  const commentResponse = await commentsApi.createComment(
    (await response.json()).article.slug,
    comment,
    registeredUser.token,
  );

  await commentsApi.assertSuccessResponseCode(commentResponse);
});